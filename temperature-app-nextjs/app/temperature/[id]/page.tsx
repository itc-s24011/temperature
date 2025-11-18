// app/temperature/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTemperatureDetail, getTemperatureList } from '@/lib/microcms';
import TemperatureDetail from '@/components/TemperatureDetail';
import Header from '@/components/Header';
import styles from './page.module.css';

export const revalidate = 60;

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const temperatureList = await getTemperatureList();
    return temperatureList.map((temperature) => ({
      id: temperature.id,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const temperature = await getTemperatureDetail(params.id);
    const currentTemp = temperature.currentTemperature ?? 0;
    return {
      title: `${temperature.city}, ${temperature.country} - 気温情報`,
      description: `${temperature.city}の現在の気温は${Math.round(currentTemp)}°Cです。`,
    };
  } catch {
    return {
      title: '気温情報が見つかりません',
    };
  }
}

export default async function TemperatureDetailPage({ params }: PageProps) {
  let temperature;
  
  try {
    temperature = await getTemperatureDetail(params.id);
  } catch (error) {
    console.error('Temperature fetch error:', error);
    notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Link href="/" className={styles.backButton}>
          <span className={styles.arrow}>←</span>
          <span>一覧に戻る</span>
        </Link>
        <TemperatureDetail data={temperature} />
      </main>
    </>
  );
}