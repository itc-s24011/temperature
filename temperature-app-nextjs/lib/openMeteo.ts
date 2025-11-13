// lib/openMeteo.ts
interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherData {
  currentTemperature: number;
  feelsLike: number;
  high: number;
  low: number;
  humidity: number;
  pressure: number;
  sunrise: string;
  sunset: string;
}

interface ForecastDay {
  date: string;
  high: number;
  low: number;
  precipitation: number;
}

// 都市の座標マッピング
const CITY_COORDINATES: Record<string, Coordinates> = {
  '東京': { lat: 35.6762, lon: 139.6503 },
  'ニューヨーク': { lat: 40.7128, lon: -74.0060 },
  'ロンドン': { lat: 51.5074, lon: -0.1278 },
  'シドニー': { lat: -33.8688, lon: 151.2093 },
  'パリ': { lat: 48.8566, lon: 2.3522 },
  'ベルリン': { lat: 52.5200, lon: 13.4050 },
  'モスクワ': { lat: 55.7558, lon: 37.6173 },
  'ドバイ': { lat: 25.2048, lon: 55.2708 },
  '北京': { lat: 39.9042, lon: 116.4074 },
  'ソウル': { lat: 37.5665, lon: 126.9780 },
  'シンガポール': { lat: 1.3521, lon: 103.8198 },
  'バンコク': { lat: 13.7563, lon: 100.5018 },
};

/**
 * Open-Meteoから現在の天気を取得
 */
export async function getCurrentWeatherFromOpenMeteo(city: string): Promise<WeatherData | null> {
  const coords = CITY_COORDINATES[city];
  
  if (!coords) {
    console.error(`Coordinates not found for city: ${city}`);
    return null;
  }

  try {
    // 天気データを取得
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const weatherResponse = await fetch(weatherUrl, { 
      next: { revalidate: 600 } // 10分キャッシュ
    });
    
    if (!weatherResponse.ok) {
      throw new Error(`Open-Meteo API error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    // 日の出・日の入り時刻を取得（別API）
    const sunUrl = `https://api.sunrise-sunset.org/json?lat=${coords.lat}&lng=${coords.lon}&formatted=0`;
    
    const sunResponse = await fetch(sunUrl, { 
      next: { revalidate: 86400 } // 24時間キャッシュ
    });
    
    if (!sunResponse.ok) {
      throw new Error(`Sunrise-Sunset API error: ${sunResponse.status}`);
    }

    const sunData = await sunResponse.json();

    // タイムゾーンを取得
    const timezone = getTimezoneForCity(city);

    return {
      currentTemperature: Math.round(weatherData.current.temperature_2m),
      feelsLike: Math.round(weatherData.current.apparent_temperature),
      high: Math.round(weatherData.daily.temperature_2m_max[0]),
      low: Math.round(weatherData.daily.temperature_2m_min[0]),
      humidity: Math.round(weatherData.current.relative_humidity_2m),
      pressure: Math.round(weatherData.current.pressure_msl),
      sunrise: new Date(sunData.results.sunrise).toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: timezone
      }),
      sunset: new Date(sunData.results.sunset).toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: timezone
      }),
    };
  } catch (error) {
    console.error('Failed to fetch weather data from Open-Meteo:', error);
    return null;
  }
}

/**
 * 週間天気予報を取得
 */
export async function getWeatherForecastFromOpenMeteo(city: string): Promise<ForecastDay[]> {
  const coords = CITY_COORDINATES[city];
  
  if (!coords) {
    console.error(`Coordinates not found for city: ${city}`);
    return [];
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;
    
    const response = await fetch(url, { 
      next: { revalidate: 3600 } // 1時間キャッシュ
    });
    
    if (!response.ok) {
      throw new Error(`Open-Meteo forecast API error: ${response.status}`);
    }

    const data = await response.json();

    // 7日分のデータを作成
    return data.daily.time.map((date: string, index: number) => ({
      date: new Date(date).toLocaleDateString('ja-JP', { weekday: 'short' }),
      high: Math.round(data.daily.temperature_2m_max[index]),
      low: Math.round(data.daily.temperature_2m_min[index]),
      precipitation: Math.round(data.daily.precipitation_probability_max[index] || 0),
    }));
  } catch (error) {
    console.error('Failed to fetch forecast data from Open-Meteo:', error);
    return [];
  }
}

/**
 * 都市のタイムゾーンを取得
 */
function getTimezoneForCity(city: string): string {
  const timezones: Record<string, string> = {
    '東京': 'Asia/Tokyo',
    'ニューヨーク': 'America/New_York',
    'ロンドン': 'Europe/London',
    'シドニー': 'Australia/Sydney',
    'パリ': 'Europe/Paris',
    'ベルリン': 'Europe/Berlin',
    'モスクワ': 'Europe/Moscow',
    'ドバイ': 'Asia/Dubai',
    '北京': 'Asia/Shanghai',
    'ソウル': 'Asia/Seoul',
    'シンガポール': 'Asia/Singapore',
    'バンコク': 'Asia/Bangkok',
  };
  
  return timezones[city] || 'UTC';
}

/**
 * タイムゾーン表示名を取得
 */
export function getTimezoneDisplay(city: string): string {
  const displays: Record<string, string> = {
    '東京': 'JST (UTC+9)',
    'ニューヨーク': 'EST (UTC-5)',
    'ロンドン': 'GMT (UTC+0)',
    'シドニー': 'AEDT (UTC+11)',
    'パリ': 'CET (UTC+1)',
    'ベルリン': 'CET (UTC+1)',
    'モスクワ': 'MSK (UTC+3)',
    'ドバイ': 'GST (UTC+4)',
    '北京': 'CST (UTC+8)',
    'ソウル': 'KST (UTC+9)',
    'シンガポール': 'SGT (UTC+8)',
    'バンコク': 'ICT (UTC+7)',
  };
  
  return displays[city] || 'UTC';
}

/**
 * 新しい都市の座標を追加する関数（オプション）
 */
export function addCity(city: string, lat: number, lon: number) {
  CITY_COORDINATES[city] = { lat, lon };
}