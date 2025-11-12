// app/page.tsx
import { getTemperatureList } from '@/lib/microcms';
import TemperatureCard from '@/components/TemperatureCard';
import Header from '@/components/Header';
import styles from './page.module.css';

export const revalidate = 60;

export default async function HomePage() {
  const temperatureList = await getTemperatureList();

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.title}>🌡️ 世界の気温</h1>
        <div className={styles.grid}>
          {temperatureList.map((temperature) => (
            <TemperatureCard key={temperature.id} data={temperature} />
          ))}
        </div>
        {temperatureList.length === 0 && (
          <div className={styles.empty}>
            <p>気温情報がありません</p>
            <p>microCMSに気温データを追加してください</p>
          </div>
        )}
      </main>
    </>
  );
}