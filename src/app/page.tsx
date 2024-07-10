// app/page.tsx

import Head from 'next/head';
import styles from './styles/Home.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Кинотеатр Искорка</title>
        <meta name="description" content="Добро пожаловать в кинотеатр Искорка! Смотрите новинки кино у нас." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Добро пожаловать в Искорку!</h1>
        <div className={styles.sparkle}></div>
        <p className={styles.description}>Искорка - это новый кинотеатр доступный каждому!</p>
      </main>
    </div>
  );
}
