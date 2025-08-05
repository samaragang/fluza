import { useState } from 'react';

export default function BookingForm({ flight, onBook }) {
  const [name, setName] = useState('');
  console.log(flight)
  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({ name, flight });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Бронирование рейса</h2>
{/* 
      <p>{flight.from} → {flight.to} | {flight.date} | ${flight.price}</p>
      <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Подтвердить</button> */}
    </form>
  );
}
