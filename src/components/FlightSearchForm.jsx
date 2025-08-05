import { useState, useEffect, useRef } from 'react';
import './flightSearchForm.css';
import planeIcon from '/src/assets/icons/plane.svg'

export default function FlightSearchForm({ onSearch }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromCode, setFromCode] = useState('');
  const [toCode, setToCode] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateBack, setDateBack] = useState('');
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [cabinClass, setCabinClass] = useState('ECONOMY');

  // Функция для получения подсказок аэропортов
  const fetchAirportSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://api.airsurfer.co/api/v1/airports?airport=${encodeURIComponent(query)}`);
      const json = await response.json();
      if (json.status === 'OK') {
        console.log(json.data)
        setSuggestions(json.data);
      }
    } catch {
      setSuggestions([]);
    }
  };

  // Обработчики ввода для "откуда"
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAirportSuggestions(from, setSuggestionsFrom);
    }, 300);
    return () => clearTimeout(timer);
  }, [from]);

  // Обработчики ввода для "куда"
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAirportSuggestions(to, setSuggestionsTo);
    }, 300);
    return () => clearTimeout(timer);
  }, [to]);

  // Выбор из подсказок
  const handleSelectFrom = (airport) => {
    const inputContent = `${airport.city}, ${airport.name}, ${airport.code}`;
    setFrom(inputContent);
    setFromCode(airport.code);
    setSuggestionsFrom([]);
  };

  const handleSelectTo = (airport) => {
    const inputContent = `${airport.city}, ${airport.name}, ${airport.code}`;
    setTo(inputContent);
    setToCode(airport.code);
    setSuggestionsTo([]);
  };

  const handlePassengerChange = (type, value) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, value)
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      from: fromCode,
      to: toCode,
      dateStart,
      dateBack: dateBack || null,
      passengers,
      cabinClass
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Закрытие по клику вне блока
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          type="text"
          placeholder="Откуда"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
          autoComplete="off"
        />
        {suggestionsFrom.length > 0 && (
          <ul className="suggestions">
            {suggestionsFrom.slice(0, 10).map((airport) => (
              <li
                className="suggestions-item"
                key={airport.code}
                onClick={() => handleSelectFrom(airport)}
              >
                <div>
                  {airport.type === 'airport' && (
                    <img src={planeIcon} alt="plane" style={{ marginRight: 6 }} />
                  )}
                  {airport.name}, {airport.code}
                </div>
                {airport.type === 'city' && <p>{airport.country}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Куда"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          autoComplete="off"
        />
        {suggestionsTo.length > 0 && (
          <ul className="suggestions">
            {suggestionsTo.slice(0, 10).map((airport) => (
              <li
                className="suggestions-item"
                key={airport.code}
                onClick={() => handleSelectTo(airport)}
              >
                <div>
                  {airport.type === 'airport' && (
                    <img src={planeIcon} alt="plane" style={{ marginRight: 6 }} />
                  )}
                  {airport.name}, {airport.code}
                </div>
                {airport.type === 'city' && <p>{airport.country}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <input
          type="date"
          placeholder="Дата туда"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="date"
          placeholder="Дата обратно (необязательно)"
          value={dateBack}
          onChange={(e) => setDateBack(e.target.value)}
        />
      </div>

      {/* Пассажиры и класс обслуживания */}
      <div className="passengers" ref={containerRef}>
        <input
          type="text"
          readOnly
          value={`${totalPassengers} пасс, ${cabinClass === 'ECONOMY' ? 'эконом' : 'бизнес'}`}
          onClick={() => setIsOpen(true)}
        />

        {isOpen && (
          <div className="passengers-class-container">
            <div className="passengers-selector">
              {/* Взрослые */}
              <div className="passenger-type">
                <label>Взрослые (12+)</label>
                <div className="passenger-controls">
                  <button type="button" onClick={() => handlePassengerChange('adults', passengers.adults - 1)}>-</button>
                  <span>{passengers.adults}</span>
                  <button type="button" onClick={() => handlePassengerChange('adults', passengers.adults + 1)}>+</button>
                </div>
              </div>

              {/* Дети */}
              <div className="passenger-type">
                <label>Дети (2-12)</label>
                <div className="passenger-controls">
                  <button type="button" onClick={() => handlePassengerChange('children', passengers.children - 1)}>-</button>
                  <span>{passengers.children}</span>
                  <button type="button" onClick={() => handlePassengerChange('children', passengers.children + 1)}>+</button>
                </div>
              </div>

              {/* Младенцы */}
              <div className="passenger-type">
                <label>Младенцы (0-2)</label>
                <div className="passenger-controls">
                  <button type="button" onClick={() => handlePassengerChange('infants', passengers.infants - 1)}>-</button>
                  <span>{passengers.infants}</span>
                  <button type="button" onClick={() => handlePassengerChange('infants', passengers.infants + 1)}>+</button>
                </div>
              </div>

              {/* Класс обслуживания */}
              <div className="class-selector">
                <input
                  type="radio"
                  id="economy"
                  name="cabinClass"
                  value="ECONOMY"
                  checked={cabinClass === 'ECONOMY'}
                  onChange={() => setCabinClass('ECONOMY')}
                  className="hidden-radio"
                />
                <label htmlFor="economy" className={`class-option ${cabinClass === 'ECONOMY' ? 'active' : ''}`}>
                  Эконом
                </label>

                <input
                  type="radio"
                  id="business"
                  name="cabinClass"
                  value="BUSINESS"
                  checked={cabinClass === 'BUSINESS'}
                  onChange={() => setCabinClass('BUSINESS')}
                  className="hidden-radio"
                />
                <label htmlFor="business" className={`class-option ${cabinClass === 'BUSINESS' ? 'active' : ''}`}>
                  Бизнес
                </label>
              </div>
            </div>
          </div>
        )}
      </div>


      <div className="search-form__button">
        <button type="submit">Найти рейсы</button>
      </div>
    </form>
  );
}