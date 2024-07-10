// app/components/Header.tsx

'use client';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <h1 className={styles.logo}>Искорка</h1>
      </Link>
      <nav className={styles.nav}>
        <Link href="/ticket" className={styles.navLink}>
          Билеты
        </Link>
        <Link href="/profile" className={styles.navLink}>
          Личный кабинет
        </Link>
      </nav>
    </header>
  );
}
