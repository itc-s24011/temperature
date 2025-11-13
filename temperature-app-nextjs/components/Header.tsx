// components/Header.tsx（更新版）
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const now = new Date().toLocaleString('ja-JP', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.logo}>🌡️ 世界の気温</h1>
          <p className={styles.subtitle}>リアルタイムで世界中の気温情報をチェック</p>
        </div>
        <div className={styles.update}>
          <span className={styles.badge}>🔄 リアルタイム</span>
          <p className={styles.time}>更新: {now}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;