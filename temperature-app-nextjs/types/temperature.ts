// types/temperature.ts
export interface DailyData {
  date: string;
  high: number;
  low: number;
  precipitation: number;
}

export interface TemperatureDetails {
  currentTemperature: number;
  feelsLike: number;
  high: number;
  low: number;
}

export interface SunData {
  sunrise: string;
  sunset: string;
  timezone: string;
}

export interface TemperatureData {
  id: string;
  city: string;
  country: string;
  temperatureDetails: TemperatureDetails;
  humidity: number;
  pressure: number;
  sunData: SunData;
  weeklyData: DailyData[];
  updatedAt: string;
}