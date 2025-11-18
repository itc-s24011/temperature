// components/TemperatureDetail.tsx
import React from 'react';
import { TemperatureData } from '@/types/temperature';
import { SunriseIcon, SunsetIcon, HumidityIcon, PressureIcon, ThermometerIcon } from './IconComponents';
import styles from './TemperatureDetail.module.css';

interface TemperatureDetailProps {
  data: TemperatureData;
}

const getTemperatureColor = (temp: number): string => {
  if (temp >= 30) return styles.red;
  if (temp >= 20) return styles.orange;
  if (temp >= 10) return styles.green;
  if (temp >= 0) return styles.blue;
  return styles.purple;
};

const TemperatureDetail: React.FC<TemperatureDetailProps> = ({ data }) => {
  // データを取得（nullチェック付き）
  const currentTemperature = data.currentTemperature ?? 0;
  const feelsLike = data.feelsLike ?? 0;
  const high = data.high ?? 0;
  const low = data.low ?? 0;
  
  const sunrise = data.sunrise ?? '---';
  const sunset = data.sunset ?? '---';
  const timezone = data.timezone ?? '---';
  
  const tempColor = getTemperatureColor(currentTemperature);

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        <div className={styles.topBar}></div>
        <div className={styles.header}>
          <h1 className={styles.city}>{data.city}</h1>
          <p className={styles.country}>{data.country}</p>
          <div className={`${styles.currentTemp} ${tempColor}`}>
            {Math.round(currentTemperature)}°
          </div>
          <p className={styles.feelsLike}>
            体感温度: {Math.round(feelsLike)}°C
          </p>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <ThermometerIcon />
            <div>
              <p className={styles.label}>最高 / 最低</p>
              <p className={styles.value}>
                {Math.round(high)}° / {Math.round(low)}°
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <HumidityIcon />
            <div>
              <p className={styles.label}>湿度</p>
              <p className={styles.value}>{data.humidity}%</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <PressureIcon />
            <div>
              <p className={styles.label}>気圧</p>
              <p className={styles.value}>{data.pressure} hPa</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <SunriseIcon />
            <div>
              <p className={styles.label}>日の出</p>
              <p className={styles.value}>{sunrise}</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <SunsetIcon />
            <div>
              <p className={styles.label}>日の入り</p>
              <p className={styles.value}>{sunset}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.weeklySection}>
        <h2 className={styles.weeklyTitle}>📅 週間予報</h2>
        <div className={styles.weeklyGrid}>
          {data.weeklyData?.map((day, index) => (
            <div key={index} className={styles.dayCard}>
              <div className={styles.dayDate}>{day.date}</div>
              <div className={styles.dayTemps}>
                <span className={styles.dayHigh}>{Math.round(day.high)}°</span>
                <span className={styles.daySeparator}>/</span>
                <span className={styles.dayLow}>{Math.round(day.low)}°</span>
              </div>
              <div className={styles.dayPrecip}>
                💧 {day.precipitation}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.timezone}>
        <p>🌍 タイムゾーン: {timezone}</p>
      </div>
    </div>
  );
};

export default TemperatureDetail;