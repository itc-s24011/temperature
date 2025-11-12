// lib/microcms.ts
import { createClient } from 'microcms-js-sdk';
import { TemperatureData } from '@/types/temperature';

// 環境変数のチェック
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
    return response.contents;
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
    return response;
  } catch (error) {
    console.error('Failed to fetch temperature detail:', error);
    throw error;
  }
};