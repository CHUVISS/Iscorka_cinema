// app/profile/page.tsx

'use client';

import { useState, useEffect } from 'react';
import styles from './styles/Profile.module.css';

interface Ticket {
  id: number;
  movie: string;
  showtime: string;
  seat: string;
}

interface UserProfile {
  fullName: string;
  tickets: Ticket[];
}

const mockUserProfile: UserProfile = {
  fullName: 'Чувилов Александр Александрович',
  tickets: [
    { id: 1, movie: 'Звездные войны: Эпизод IV - Новая надежда', showtime: '2024-07-10 18:00', seat: 'A1' },
    { id: 2, movie: 'Властелин колец: Братство Кольца', showtime: '2024-07-11 15:00', seat: 'B3' },
    // Добавьте больше билетов по мере необходимости
  ],
};

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Загрузить профиль пользователя (здесь используется mock-данные)
    setUserProfile(mockUserProfile);
  }, []);

  if (!userProfile) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль пользователя</h1>
      <p className={styles.fullName}>{userProfile.fullName}</p>
      <h2 className={styles.subtitle}>Билеты</h2>
      <ul className={styles.ticketList}>
        {userProfile.tickets.map(ticket => (
          <li key={ticket.id} className={styles.ticket}>
            <p>Фильм: {ticket.movie}</p>
            <p>Время: {ticket.showtime}</p>
            <p>Место: {ticket.seat}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
