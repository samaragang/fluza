import { useState } from 'react';
import FlightSearchForm from './components/FlightSearchForm';
import FlightList from './components/FlightList';
import BookingForm from './components/BookingForm';
import Header from './components/Header';
import './App.css';

// [
//   {
//     "price": 98121,
//     "currency": "RUB",
//     "to": {
//       "airlines": {
//         "FZ": "Flydubai"
//       },
//       "departure_date": "25.09.2025",
//       "departure_time": "01:05:00",
//       "departure_timestamp": 1758762300,
//       "arrival_date": "25.09.2025",
//       "arrival_time": "14:30:00",
//       "arrival_timestamp": 1758810600,
//       "total_duration": 805,
//       "flight": [
//         {
//           "aircraft": "Boeing 737-800 (winglets)",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "DXB": "Дубай"
//           },
//           "arrival_city": {
//             "DXB": "Дубай"
//           },
//           "arrival_country": {
//             "AE": "ОАЭ"
//           },
//           "arrival_date": "25.09.2025",
//           "arrival_time": "07:45:00",
//           "arrival_timestamp": 1758786300,
//           "departure": {
//             "VKO": "Внуково"
//           },
//           "departure_city": {
//             "MOW": "Москва"
//           },
//           "departure_country": {
//             "RU": "Россия"
//           },
//           "departure_date": "25.09.2025",
//           "departure_time": "01:05:00",
//           "departure_timestamp": 1758762300,
//           "flight_number": "988",
//           "duration": 340,
//           "service_class": "ECONOMY"
//         },
//         {
//           "aircraft": "Boeing 737 Max 8",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "AYT": "Анталья"
//           },
//           "arrival_city": {
//             "AYT": "Анталья"
//           },
//           "arrival_country": {
//             "TR": "Турция"
//           },
//           "arrival_date": "25.09.2025",
//           "arrival_time": "14:30:00",
//           "arrival_timestamp": 1758810600,
//           "departure": {
//             "DXB": "Дубай"
//           },
//           "departure_city": {
//             "DXB": "Дубай"
//           },
//           "departure_country": {
//             "AE": "ОАЭ"
//           },
//           "departure_date": "25.09.2025",
//           "departure_time": "10:55:00",
//           "departure_timestamp": 1758797700,
//           "flight_number": "759",
//           "duration": 275,
//           "service_class": "ECONOMY"
//         }
//       ],
//       "token": null,
//       "price": {
//         "value": 98121,
//         "currency": "RUB",
//         "symbol": "₽"
//       }
//     },
//     "back": {
//       "airlines": {
//         "FZ": "Flydubai"
//       },
//       "departure_date": "28.09.2025",
//       "departure_time": "15:30:00",
//       "departure_timestamp": 1759073400,
//       "arrival_date": "29.09.2025",
//       "arrival_time": "23:15:00",
//       "arrival_timestamp": 1759187700,
//       "total_duration": 1905,
//       "flight": [
//         {
//           "aircraft": "Boeing 737-800 (winglets)",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "DXB": "Дубай"
//           },
//           "arrival_city": {
//             "DXB": "Дубай"
//           },
//           "arrival_country": {
//             "AE": "ОАЭ"
//           },
//           "arrival_date": "28.09.2025",
//           "arrival_time": "21:00:00",
//           "arrival_timestamp": 1759093200,
//           "departure": {
//             "AYT": "Анталья"
//           },
//           "departure_city": {
//             "AYT": "Анталья"
//           },
//           "departure_country": {
//             "TR": "Турция"
//           },
//           "departure_date": "28.09.2025",
//           "departure_time": "15:30:00",
//           "departure_timestamp": 1759073400,
//           "flight_number": "760",
//           "duration": 270,
//           "service_class": "ECONOMY"
//         },
//         {
//           "aircraft": "Boeing 737-800 (winglets)",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "VKO": "Внуково"
//           },
//           "arrival_city": {
//             "MOW": "Москва"
//           },
//           "arrival_country": {
//             "RU": "Россия"
//           },
//           "arrival_date": "29.09.2025",
//           "arrival_time": "23:15:00",
//           "arrival_timestamp": 1759187700,
//           "departure": {
//             "DXB": "Дубай"
//           },
//           "departure_city": {
//             "DXB": "Дубай"
//           },
//           "departure_country": {
//             "AE": "ОАЭ"
//           },
//           "departure_date": "29.09.2025",
//           "departure_time": "18:30:00",
//           "departure_timestamp": 1759170600,
//           "flight_number": "951",
//           "duration": 345,
//           "service_class": "ECONOMY"
//         }
//       ],
//       "token": null,
//       "price": {
//         "value": 98121,
//         "currency": "RUB",
//         "symbol": "₽"
//       }
//     }
//   },
//   {
//     "price": 98121,
//     "currency": "RUB",
//     "to": {
//       "airlines": {
//         "FZ": "Flydubai"
//       },
//       "departure_date": "25.09.2025",
//       "departure_time": "02:00:00",
//       "departure_timestamp": 1758765600,
//       "arrival_date": "25.09.2025",
//       "arrival_time": "14:30:00",
//       "arrival_timestamp": 1758810600,
//       "total_duration": 750,
//       "flight": [
//         {
//           "aircraft": "Boeing 737 Max 8",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "DXB": "Дубай"
//           },
//           "arrival_city": {
//             "DXB": "Дубай"
//           },
//           "arrival_country": {
//             "AE": "ОАЭ"
//           },
//           "arrival_date": "25.09.2025",
//           "arrival_time": "08:40:00",
//           "arrival_timestamp": 1758789600,
//           "departure": {
//             "VKO": "Внуково"
//           },
//           "departure_city": {
//             "MOW": "Москва"
//           },
//           "departure_country": {
//             "RU": "Россия"
//           },
//           "departure_date": "25.09.2025",
//           "departure_time": "02:00:00",
//           "departure_timestamp": 1758765600,
//           "flight_number": "966",
//           "duration": 340,
//           "service_class": "ECONOMY"
//         },
//         {
//           "aircraft": "Boeing 737 Max 8",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "AYT": "Анталья"
//           },
//           "arrival_city": {
//             "AYT": "Анталья"
//           },
//           "arrival_country": {
//             "TR": "Турция"
//           },
//           "arrival_date": "25.09.2025",
//           "arrival_time": "14:30:00",
//           "arrival_timestamp": 1758810600,
//           "departure": {
//             "DXB": "Дубай"
//           },
//           "departure_city": {
//             "DXB": "Дубай"
//           },
//           "departure_country": {
//             "AE": "ОАЭ"
//           },
//           "departure_date": "25.09.2025",
//           "departure_time": "10:55:00",
//           "departure_timestamp": 1758797700,
//           "flight_number": "759",
//           "duration": 275,
//           "service_class": "ECONOMY"
//         }
//       ],
//       "token": null,
//       "price": {
//         "value": 98121,
//         "currency": "RUB",
//         "symbol": "₽"
//       }
//     },
//     "back": {
//       "airlines": {
//         "FZ": "Flydubai"
//       },
//       "departure_date": "28.09.2025",
//       "departure_time": "15:30:00",
//       "departure_timestamp": 1759073400,
//       "arrival_date": "29.09.2025",
//       "arrival_time": "23:15:00",
//       "arrival_timestamp": 1759187700,
//       "total_duration": 1905,
//       "flight": [
//         {
//           "aircraft": "Boeing 737-800 (winglets)",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "DXB": "Дубай"
//           },
//           "arrival_city": {
//             "DXB": "Дубай"
//           },
//           "arrival_country": {
//             "AE": "ОАЭ"
//           },
//           "arrival_date": "28.09.2025",
//           "arrival_time": "21:00:00",
//           "arrival_timestamp": 1759093200,
//           "departure": {
//             "AYT": "Анталья"
//           },
//           "departure_city": {
//             "AYT": "Анталья"
//           },
//           "departure_country": {
//             "TR": "Турция"
//           },
//           "departure_date": "28.09.2025",
//           "departure_time": "15:30:00",
//           "departure_timestamp": 1759073400,
//           "flight_number": "760",
//           "duration": 270,
//           "service_class": "ECONOMY"
//         },
//         {
//           "aircraft": "Boeing 737-800 (winglets)",
//           "airline": {
//             "FZ": "Flydubai"
//           },
//           "arrival": {
//             "VKO": "Внуково"
//           },
//           "arrival_city": {
//             "MOW": "Москва"
//           },
//           "arrival_country": {
//             "RU": "Россия"
//           },
//           "arrival_date": "29.09.2025",
//           "arrival_time": "23:15:00",
//           "arrival_timestamp": 1759187700,
//           "departure": {
//             "DXB": "Дубай"
//           },
//           "departure_city": {
//             "DXB": "Дубай"
//           },
//           "departure_country": {
//             "AE": "ОАЭ"
//           },
//           "departure_date": "29.09.2025",
//           "departure_time": "18:30:00",
//           "departure_timestamp": 1759170600,
//           "flight_number": "951",
//           "duration": 345,
//           "service_class": "ECONOMY"
//         }
//       ],
//       "token": null,
//       "price": {
//         "value": 98121,
//         "currency": "RUB",
//         "symbol": "₽"
//       }
//     }
//   }
// ]


function App() {
  const [flights, setFlights] = useState([

  ]);

  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [booking, setBooking] = useState(null);

  const handleSearch = async (params) => {
    setLoading(true);
    // Форматируем даты из 'YYYY-MM-DD' в 'DD.MM.YYYY'
    const formatDate = (dateStr) => {
      if (!dateStr) return 'null';
      const [year, month, day] = dateStr.split('-');
      return `${day}.${month}.${year}`;
    };

    const queryParams = new URLSearchParams({
      airport_from: params.from,
      airport_to: params.to,
      // date_start: params.dateStart,
      // date_back: params.dateBack,
      date_start: formatDate(params.dateStart),
      date_back: params.dateBack ? formatDate(params.dateBack) : 'null',
      adults: params.passengers.adults,
      children: params.passengers.children,
      babies: params.passengers.infants,
      service_class: params.cabinClass,
    });

    try {
      const response = await fetch(`https://api.airsurfer.co/api/v1/flights?${queryParams}`);
      const json = await response.json();

      if (json.status !== 'OK') {
        console.error('Ошибка от API:', json.message);
        setFlights([]);
        return;
      }

      const rawFlights = json.data.flights;

      setFlights(rawFlights);
      setSelectedFlight(null);
      setBooking(null);
    } catch (error) {
      console.error('Ошибка при запросе к API:', error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFlight = (flight) => setSelectedFlight(flight);

  const handleBooking = (data) => setBooking(data);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="intro">
          <h3>Уже 10 000+ путешественников оформили и продлили визу с помощью сервиса!</h3>
          <h1>Бронирование авиабилетов</h1>
        </div>

        {!selectedFlight && !booking && (
          <>
            <FlightSearchForm onSearch={handleSearch} />
            {loading && <div className="loader-bar"><div className="loader-progress" /></div>}
            {!loading && flights.length > 0 && <FlightList flights={flights} onSelect={handleSelectFlight} />}

            {flights.length > 0 && <FlightList flights={flights} onSelect={handleSelectFlight} />}
          </>
        )}

        {selectedFlight && !booking && (
          <BookingForm flight={selectedFlight} onBook={handleBooking} />
        )}

        {booking && (
          <div>
            <h2>Бронирование подтверждено!</h2>
            <p>Спасибо, {booking.name}!</p>
            <p>Вы забронировали рейс: {booking.flight.from} → {booking.flight.to} на {booking.flight.date}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
