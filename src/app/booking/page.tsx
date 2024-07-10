// app/booking/Booking.tsx

'use client';
import { useSearchParams } from 'next/navigation';
import styles from './styles/Booking.module.css';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Пример данных о фильмах
const filmsDatabase = {
  1: { title: 'Головоломка 2' },
  2: { title: 'Майор Гром: Игра' },
  3: { title: 'Плохие парни до конца'},
  4: { title: 'Самая большая луна'},
  5: { title: 'Челюсти. Кровавый риф'},
  6: { title: 'Три богатыря. Ни дня без подвига'},
  7: { title: 'Гарфилд в кино'},
  8: { title: 'Непослушники'},
};

// Пример данных о местах в зале
const seatData = [];
const numRows = 10;
const numSeatsPerRow = 10;

for (let row = 1; row <= numRows; row++) {
  for (let seat = 1; seat <= numSeatsPerRow; seat++) {
    const seatNumber = String.fromCharCode(64 + row) + seat;
    seatData.push({ id: `${row}${seat}`, number: seatNumber, booked: Math.random() < 0.2 });
  }
}

const TicketInfo = ({ selectedSeats, ticketPrice = 350, onCheckout }) => {
  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div className={styles.ticketInfo}>
      <h3>Информация о билетах</h3>
      <p>Количество билетов: {selectedSeats.length}</p>
      <p>Выбранные места: {selectedSeats.join(', ')}</p>
      <p>Общая стоимость: {totalPrice}₽</p>
      <button className={styles.checkoutButton} onClick={onCheckout}>
        Оформить заказ
      </button>
    </div>
  );
};

export default function Booking() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get('movieId');
  const time = searchParams.get('time');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [movieTitle, setMovieTitle] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // Загрузка названия фильма по ID
  useEffect(() => {
    if (movieId) {
      const title = filmsDatabase[parseInt(movieId)]?.title || 'Фильм не найден';
      setMovieTitle(title);
    }
  }, [movieId]);

  // Функция для обработки выбора места с анимацией
  const handleSeatSelection = (seatNumber: string) => {
    const seat = seatData.find(seat => seat.number === seatNumber);
    if (!seat || seat.booked) {
      return; // Если место забронировано или не найдено, ничего не делаем
    }
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter(num => num !== seatNumber); // Убираем место из выбранных
      } else {
        return [...prevSelectedSeats, seatNumber]; // Добавляем место в выбранные
      }
    });
  };

  const handleCheckout = () => {
    // Открываем модальное окно для подтверждения заказа
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmOrder = () => {
    // Здесь будет логика завершения заказа
    console.log('Заказ подтверждён для мест:', selectedSeats);
    closeModal();
    // Можно добавить перенаправление на страницу успеха или очистить выбранные места
    setSelectedSeats([]);
  };

  useEffect(() => {
    console.log('Selected seats:', selectedSeats);
  }, [selectedSeats]);

  return (
    <div className={styles.container}>
      <h1>::</h1>
      <h1 className={styles.title}>Выбор мест</h1>
      <p className={styles.text}>Название фильма: {movieTitle}</p>
      <p className={styles.text}>Время сеанса: {time}</p>
      <div className={styles.seatMap}>
        <h2 className={styles.subtitle}>Схема зала</h2>
        <p className={styles.scene}>Сцена</p>
        <p>.</p>
        <div className={styles.seats}>
          <table className={styles.seatTable}>
            <tbody>
              {Array.from(Array(numRows).keys()).map(row => (
                <tr key={row}>
                  {Array.from(Array(numSeatsPerRow).keys()).map(seat => {
                    const seatIndex = row * numSeatsPerRow + seat;
                    const seatInfo = seatData[seatIndex];
                    return (
                      <td key={seatIndex}>
                        <button
                          className={`${styles.seat} ${seatInfo.booked ? styles.booked : ''} ${selectedSeats.includes(seatInfo.number) ? styles.selected : ''}`}
                          onClick={() => handleSeatSelection(seatInfo.number)}
                          disabled={seatInfo.booked}
                        >
                          {seatInfo.number}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedSeats.length > 0 && (
        <TicketInfo selectedSeats={selectedSeats} onCheckout={handleCheckout} />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Подтверждение заказа"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Подтверждение заказа</h2>
        <p>Вы выбрали места: {selectedSeats.join(', ')}</p>
        <p>Общая стоимость: {selectedSeats.length * 350}₽</p>
        <div className={styles.modalButtons}>
          <button className={styles.modalButtonAgree} onClick={confirmOrder}>Подтвердить</button>
          <button className={styles.modalButtonCancel} onClick={closeModal}>Отмена</button>
        </div>
      </Modal>
    </div>
  );
}
