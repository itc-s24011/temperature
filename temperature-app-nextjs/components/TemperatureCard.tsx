// components/TemperatureCard.tsx
import Link from 'next/link';
import { TemperatureData } from '@/types/temperature';
import styles from './TemperatureCard.module.css';

interface TemperatureCardProps {
  data: TemperatureData;
}

const getTemperatureColor = (temp: number): string => {
  if (temp >= 30) return styles.red;
  if (temp >= 20) return styles.orange;
  if (temp >= 10) return styles.green;
  if (temp >= 0) return styles.blue;
  return styles.purple;
};

const TemperatureCard: React.FC<TemperatureCardProps> = ({ data }) => {
  const tempColor = getTemperatureColor(data.currentTemperature);

  return (
    <Link href={`/temperature/${data.id}`} className={styles.card}>
      <div className={styles.topBar}></div>
      
      <div className={styles.content}>
        <h3 className={styles.city}>{data.city}</h3>
        <p className={styles.country}>{data.country}</p>
        <div className={`${styles.temperature} ${tempColor}`}>
          {Math.round(data.currentTemperature)}°
        </div>
        <p className={styles.range}>
          H: {Math.round(data.high)}° / L: {Math.round(data.low)}°
        </p>
      </div>
    </Link>
  );
};

export default TemperatureCard;