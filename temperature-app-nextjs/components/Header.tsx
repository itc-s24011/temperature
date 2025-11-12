// components/Header.tsx
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>🌡️ 世界の気温</h1>
      </div>
    </header>
  );
};

export default Header;