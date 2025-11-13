// lib/microcms.ts
import { createClient } from 'microcms-js-sdk';
import { TemperatureData, MicroCMSTemperatureItem } from '@/types/temperature';
import { 
  getCurrentWeatherFromOpenMeteo, 
  getWeatherForecastFromOpenMeteo, 
  getTimezoneDisplay 
} from './openMeteo';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getTemperatureList = async (): Promise<TemperatureData[]> => {
  try {
    const response = await client.get({
      endpoint: 'temperature',
    });
    
    const contents = response.contents || [];
    
    if (!Array.isArray(contents)) {
      console.error('Contents is not an array:', contents);
      return [];
    }
    
    const updatedData = await Promise.all(
      contents.map(async (item: MicroCMSTemperatureItem) => {
        if (!item?.city) {
          console.warn('City field is missing:', item);
          return null;
        }

        const weatherData = await getCurrentWeatherFromOpenMeteo(item.city);
        const forecastData = await getWeatherForecastFromOpenMeteo(item.city);
        
        return {
          id: item.id || '',
          city: item.city || '',
          country: item.country || '',
          currentTemperature: weatherData?.currentTemperature ?? 0,
          feelsLike: weatherData?.feelsLike ?? 0,
          high: weatherData?.high ?? 0,
          low: weatherData?.low ?? 0,
          humidity: weatherData?.humidity ?? 0,
          pressure: weatherData?.pressure ?? 0,
          sunrise: weatherData?.sunrise ?? '---',
          sunset: weatherData?.sunset ?? '---',
          timezone: getTimezoneDisplay(item.city),
          weeklyData: forecastData.length > 0 ? forecastData : [],
          updatedAt: item.updatedAt || new Date().toISOString(),
        };
      })
    );
    
    return updatedData.filter((item): item is TemperatureData => item !== null);
  } catch (error) {
    console.error('Failed to fetch temperature list:', error);
    return [];
  }
};

export const getTemperatureDetail = async (
  contentId: string
): Promise<TemperatureData> => {
  try {
    const response = await client.get({
      endpoint: 'temperature',
      contentId,
    });
    
    if (!response?.city) {
      throw new Error('City field is missing in microCMS response');
    }
    
    const weatherData = await getCurrentWeatherFromOpenMeteo(response.city);
    const forecastData = await getWeatherForecastFromOpenMeteo(response.city);
    
    return {
      id: response.id || '',
      city: response.city || '',
      country: response.country || '',
      currentTemperature: weatherData?.currentTemperature ?? 0,
      feelsLike: weatherData?.feelsLike ?? 0,
      high: weatherData?.high ?? 0,
      low: weatherData?.low ?? 0,
      humidity: weatherData?.humidity ?? 0,
      pressure: weatherData?.pressure ?? 0,
      sunrise: weatherData?.sunrise ?? '---',
      sunset: weatherData?.sunset ?? '---',
      timezone: getTimezoneDisplay(response.city),
      weeklyData: forecastData.length > 0 ? forecastData : [],
      updatedAt: response.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to fetch temperature detail:', error);
    throw error;
  }
};