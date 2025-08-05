import './flightList.css';

export default function FlightList({ flights, onSelect }) {
  return (
    <ul className="flight-list">
      {flights.map((flight, index) => (
        <li className="flight-card" key={index}>
          {/* Сегмент туда */}
          <div className="flight-details">
            <div className="segment-label">
              Туда
              <div className="airlines">
                {Object.values(flight.to.airlines).map((airline, i) => (
                  <span className="airline" key={i}>{airline}</span>
                ))}
              </div>
            </div>


            <div className="flight-segment">
              <div className="flight-time">
                <h3>{flight.to.departure_time.slice(0, 5)}</h3>
                <p>{flight.to.departure_date}</p>
                <p>
                  {Object.values(flight.to.flight[0].departure_city)[0]}, {Object.values(flight.to.flight[0].departure)[0]} ({Object.keys(flight.to.flight[0].departure)[0]})
                </p>
              </div>

              <div className="segment-info">
                <span>{Math.floor(flight.to.total_duration / 60)}ч {flight.to.total_duration % 60}м</span>
                <span className="transfer">{flight.to.flight.length - 1} пересадка</span>
              </div>

              <div className="flight-time">
                <h3>{flight.to.arrival_time.slice(0, 5)}</h3>
                <p>{flight.to.arrival_date}</p>
                <p>
                  {Object.values(flight.to.flight.at(-1).arrival_city)[0]}, {Object.values(flight.to.flight.at(-1).arrival)[0]} ({Object.keys(flight.to.flight.at(-1).arrival)[0]})
                </p>
              </div>
            </div>

            {/* Сегмент обратно */}
            <div className="segment-label">
              Обратно
              <div className="airlines">
                {Object.values(flight.back.airlines).map((airline, i) => (
                  <span className="airline" key={i}>{airline}</span>
                ))}
              </div>
            </div>
            <div className="flight-segment">
              <div className="flight-time">
                <h3>{flight.back.departure_time.slice(0, 5)}</h3>
                <p>{flight.back.departure_date}</p>
                <p>
                  {Object.values(flight.back.flight[0].departure_city)[0]}, {Object.values(flight.back.flight[0].departure)[0]} ({Object.keys(flight.back.flight[0].departure)[0]})
                </p>
              </div>

              <div className="segment-info">
                <span>{Math.floor(flight.back.total_duration / 60)}ч {flight.back.total_duration % 60}м</span>
                <span className="transfer">{flight.back.flight.length - 1} пересадка</span>
              </div>

              <div className="flight-time">
                <h3>{flight.back.arrival_time.slice(0, 5)}</h3>
                <p>{flight.back.arrival_date}</p>
                <p>
                  {Object.values(flight.back.flight.at(-1).arrival_city)[0]}, {Object.values(flight.back.flight.at(-1).arrival)[0]} ({Object.keys(flight.back.flight.at(-1).arrival)[0]})
                </p>
              </div>
            </div>
          </div>

          {/* Блок цены и кнопки */}
          <div className="flight-price">
            <h2>{flight.price.toLocaleString('ru-RU')} ₽</h2>
            <button onClick={() => onSelect(flight)}>Купить за 1382 ₽</button>
            <p className="per-passenger">*Бронь на одного пассажира</p>
            {/* <button className="details-link">Детали перелета ▾</button> */}
          </div>
        </li>
      ))}
    </ul>

  );
}
