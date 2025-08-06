import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './flightFilter.css'

const FlightFilter = ({ flights, onFilter }) => {
  const [transfers, setTransfers] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [timeFilters, setTimeFilters] = useState({
    departureFrom: [0, 1440],
    arrivalTo: [0, 1440],
    departureBack: [0, 1440],
    arrivalBack: [0, 1440]
  });

  const getUniqueAirlines = (flights) => {
    const airlineNames = new Set();

    flights.forEach(flight => {
      const segments = [...(flight.to?.flight || []), ...(flight.back?.flight || [])];

      segments.forEach(segment => {
        const airlineObj = segment.airline;
        if (airlineObj && typeof airlineObj === 'object') {
          const name = Object.values(airlineObj)[0]; // берём первое значение
          if (name) {
            airlineNames.add(name);
          }
        }
      });
    });

    return Array.from(airlineNames);
  };

  const uniqueAirlines = getUniqueAirlines(flights);

  const toggleTransfer = (label) => {
    setTransfers(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const toggleAirline = (airline) => {
    setAirlines(prev =>
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  const handleTimeChange = (key, value) => {
    setTimeFilters(prev => ({ ...prev, [key]: value }));
  };

  const timeToMins = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  useEffect(() => {
    const filtered = flights.filter(f => {
      const depFrom = timeToMins(f.to.flight[0].departure_time);
      const arrTo = timeToMins(f.to.flight[f.to.flight.length - 1].arrival_time);

      const depBack = f.back ? timeToMins(f.back.flight[0].departure_time) : null;
      const arrBack = f.back ? timeToMins(f.back.flight[f.back.flight.length - 1].arrival_time) : null;

      return (
        (transfers.length === 0 ||
          (transfers.includes('1') && f.to.flight.length === 1) ||
          (transfers.includes('2+') && f.to.flight.length >= 2)) &&
        (airlines.length === 0 || airlines.includes(Object.values(f.to.airlines)[0])) &&
        depFrom >= timeFilters.departureFrom[0] && depFrom <= timeFilters.departureFrom[1] &&
        arrTo >= timeFilters.arrivalTo[0] && arrTo <= timeFilters.arrivalTo[1] &&
        (!f.back || (
          depBack >= timeFilters.departureBack[0] && depBack <= timeFilters.departureBack[1] &&
          arrBack >= timeFilters.arrivalBack[0] && arrBack <= timeFilters.arrivalBack[1]
        ))
      );
    });

    onFilter(filtered);
  }, [transfers, airlines, timeFilters, flights, onFilter]);

  const renderSlider = (label, key) => {
    const formatTime = (val) => {
      const h = Math.floor(val / 60);
      const m = val % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    return (
      <div className="time-slider" style={{ marginBottom: 20 }}>
        <span>{label}</span>
        <Slider
          range
          min={0}
          max={1440}
          step={15}
          value={timeFilters[key]}
          onChange={(val) => handleTimeChange(key, val)}
          tipFormatter={formatTime}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 4 }}>
          <span>{formatTime(timeFilters[key][0])}</span>
          <span>{formatTime(timeFilters[key][1])}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="filters">
      <div className='filters-checkbox'>
        <h4>Пересадки</h4>
        <label>
          <input type="checkbox" onChange={() => toggleTransfer('1')} />    1 пересадка
        </label>
        <label>
          <input type="checkbox" onChange={() => toggleTransfer('2+')} />   2 и более
        </label>
      </div>

      <div>
        <h4>Авиакомпании</h4>
        {uniqueAirlines.map(airline => (
          <label key={airline}>
            <input type="checkbox" onChange={() => toggleAirline(airline)} /> {airline}
          </label>
        ))}
      </div>

      <div>
        <h4>Вылет и прибытие</h4>
        <p>Туда:</p>
        {renderSlider('Вылет', 'departureFrom')}
        {renderSlider('Прибытие', 'arrivalTo')}
        <p>Обратно:</p>
        {renderSlider('Вылет', 'departureBack')}
        {renderSlider('Прибытие', 'arrivalBack')}
      </div>

      <button onClick={() => {
        setTransfers([]);
        setAirlines([]);
        setTimeFilters({
          departureFrom: [0, 1440],
          arrivalTo: [0, 1440],
          departureBack: [0, 1440],
          arrivalBack: [0, 1440]
        });
      }}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default FlightFilter;
