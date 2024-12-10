// src/components/WeatherDisplay/WeatherDisplay.jsx
import { useState, useEffect } from "react";
import { getCurrentWeather } from "../../api/weatherApi";
import { getCurrentLocation } from "../../utils/locationUtils";

// Mock 데이터 추가
const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-11-19").getTime(),
    weather: 1,
    content: "1번 일기 내용",
    location: {
      lat: 40.7128, // 뉴욕
      lon: -74.006,
    },
  },
  {
    id: 2,
    createdDate: new Date("2024-12-09").getTime(),
    weather: 2,
    content: "2번 일기 내용",
    location: {
      lat: 39.9042, // 베이징
      lon: 116.4074,
    },
  },
  {
    id: 3,
    createdDate: new Date("2025-01-08").getTime(),
    weather: 4,
    content: "3번 일기 내용",
    location: {
      lat: 35.6762, // 도쿄
      lon: 139.6503,
    },
  },
  {
    id: 4,
    createdDate: new Date("2024-12-02").getTime(),
    weather: 3,
    content: "4번 일기 내용",
    location: {
      lat: 31.2304, // 상하이
      lon: 121.4737,
    },
  },
];

const WeatherDisplay = ({ locationData }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = locationData || (await getCurrentLocation());
        const weather = await getCurrentWeather(location.lat, location.lon);
        setWeatherData(weather);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [locationData]);

  if (loading) return <div>날씨 정보를 불러오는 중...</div>;
  if (error) return <div>날씨 정보를 불러오는데 실패했습니다</div>;

  return (
    <div className="weather-display">
      <div className="weather-icon">
        {weatherData?.icon && (
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather icon"
          />
        )}
      </div>
      <div className="weather-info">
        <div className="description">{weatherData?.weather}</div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
