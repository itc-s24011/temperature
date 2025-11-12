// components/LoadingSpinner.tsx
import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
      <p>読み込み中...</p>
    </div>
  );
};

export default LoadingSpinner;