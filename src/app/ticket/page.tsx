// app/page.tsx

import Head from 'next/head';
import styles from './styles/Ticket.module.css'; // Исправлен импорт стилей

interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  showtimes: string[];
}

async function fetchMovies(): Promise<Movie[]> {
  // Здесь вы можете сделать запрос к API для получения данных о фильмах.
  // Пример с фейковыми данными:
  return [
    {
      id: 1,
      title: 'Головоломка 2',
      description: 'семейная комедия',
      posterUrl: '/insideout.jpg',
      showtimes: ['10:00', '12:00', '15:00', '18:00'],
    },
    {
      id: 2,
      title: 'Майор Гром: Игра',
      description: 'приключения, боевик',
      posterUrl: '/major.jpg',
      showtimes: ['13:00', '16:00', '19:00'],
    },
    {
      id: 3,
      title: 'Плохие парни до конца',
      description: ' боевик, комедия',
      posterUrl: '/bad_boys.jpg',
      showtimes: ['14:00', '17:00', '20:00'],
    },
    {
      id: 4,
      title: 'Самая большая луна',
      description: 'фэнтези, приключения',
      posterUrl: '/big_moon.jpg',
      showtimes: ['15:30', '18:30', '21:30', '22:00'],
    },
    {
      id: 5,
      title: 'Челюсти. Кровавый риф',
      description: 'триллер',
      posterUrl: '/jow.jpg',
      showtimes: ['21:30', '22:30', '0:45'],
    },
    {
      id: 6,
      title: 'Три богатыря. Ни дня без подвига',
      description: 'мультфильм, приключения',
      posterUrl: '/three.jpg',
      showtimes: ['9:30', '14:45'],
    },
    {
      id: 7,
      title: 'Гарфилд в кино',
      description: 'мультфильм, комедия',
      posterUrl: '/garfield.jpg',
      showtimes: ['9:30', '14:45'],
    },
    {
      id: 8,
      title: 'Непослушники',
      description: 'комедия',
      posterUrl: '/neposlishniki.jpg',
      showtimes: ['11:30', '13:55', '18:50', '20:05'],
    },
  ];
}

export default async function Home() {
  const movies = await fetchMovies();
  const shouldStack = movies.length; // Определяем, нужно ли отображать карточки в столбец

  return (
    <div className={styles.container}>
      <Head>
        <title>Кинотеатр Искорка</title>
        <meta name="description" content="Добро пожаловать в кинотеатр Искорка! Смотрите новинки кино у нас." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={`${styles.grid} ${shouldStack ? styles.stacked : ''}`}>
          {movies.map(movie => (
            <div key={movie.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={movie.posterUrl} alt={movie.title} className={styles.posterImage} />
              </div>
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <h3>Расписание сеансов:</h3>
              <div>
                {movie.showtimes.map((time, index) => (
                  <a
                    key={index}
                    href={`/booking?movieId=${movie.id}&time=${time}`}
                    className={styles['showtime-button']}
                  >
                    {time}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
