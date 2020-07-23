import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      <span className={styles.logo}>INKE-DESIGN</span>
      <br />
      <span className={styles.copyright}>@ ICE - STARK</span>
    </p>
  );
}
