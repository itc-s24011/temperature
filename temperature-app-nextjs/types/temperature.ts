// types/temperature.ts
export interface DailyData {
  date: string;
  high: number;
  low: number;
  precipitation: number;
}

export interface MicroCMSTemperatureItem {
  id: string;
  city: string;
  country?: string;
  updatedAt?: string;
}

export interface TemperatureData {
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