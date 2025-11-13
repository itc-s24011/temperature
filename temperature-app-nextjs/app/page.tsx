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
        <div className={styles.hero}>
          <h1 className={styles.title}>🌡️ 世界の気温</h1>
          <p className={styles.subtitle}>リアルタイムで世界中の気温情報をチェック</p>
        </div>

        {temperatureList.length > 0 && (
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{temperatureList.length}</span>
              <span className={styles.statLabel}>都市</span>
            </div>
          </div>
        )}

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