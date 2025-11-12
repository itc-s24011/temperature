// lib/dataTransformer.ts

// フラット構造の型定義
export interface TemperatureDataFlat {
  id: string;
  city: string;
  country: string;
  currentTemperature: number;
  feelsLike: number;
  high: number;
  low: number;
  humidity: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  timezone: string;
  weeklyData: DailyData[];
  updatedAt: string;
}

// カスタムフィールド構造の型定義
export interface TemperatureDataNested {
  id: string;
  city: string;
  country: string;
  temperatureDetails: {
    currentTemperature: number;
    feelsLike: number;
    high: number;
    low: number;
  };
  humidity: number;
  pressure: number;
  sunData: {
    sunrise: string;
    sunset: string;
    timezone: string;
  };
  weeklyData: DailyData[];
  updatedAt: string;
}

export interface DailyData {
  date: string;
  high: number;
  low: number;
  precipitation: number;
}

/**
 * カスタムフィールド構造をフラット構造に変換
 */
export function flattenTemperatureData(data: TemperatureDataNested): TemperatureDataFlat {
  return {
    id: data.id,
    city: data.city,
    country: data.country,
    currentTemperature: data.temperatureDetails.currentTemperature,
    feelsLike: data.temperatureDetails.feelsLike,
    high: data.temperatureDetails.high,
    low: data.temperatureDetails.low,
    humidity: data.humidity,
    pressure: data.pressure,
    sunrise: data.sunData.sunrise,
    sunset: data.sunData.sunset,
    timezone: data.sunData.timezone,
    weeklyData: data.weeklyData,
    updatedAt: data.updatedAt,
  };
}

/**
 * フラット構造をカスタムフィールド構造に変換
 */
export function nestTemperatureData(data: TemperatureDataFlat): TemperatureDataNested {
  return {
    id: data.id,
    city: data.city,
    country: data.country,
    temperatureDetails: {
      currentTemperature: data.currentTemperature,
      feelsLike: data.feelsLike,
      high: data.high,
      low: data.low,
    },
    humidity: data.humidity,
    pressure: data.pressure,
    sunData: {
      sunrise: data.sunrise,
      sunset: data.sunset,
      timezone: data.timezone,
    },
    weeklyData: data.weeklyData,
    updatedAt: data.updatedAt,
  };
}