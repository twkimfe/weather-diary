import { useState, useEffect } from "react";
import { getCurrentWeather } from "../../api/weatherApi";
import { getCurrentLocation } from "../../utils/locationUtils";

const WeatherDisplay = ({ locationData }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = locationData || (await getCurrentLocation());
        const weather = await getCurrentWeather(
          location.latitude || location.lat,
          location.longitude || location.lon
        );

        setWeatherData(weather);
      } catch (err) {
        console.error("Weather fetch error:", err);
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
            alt="날씨 아이콘"
          />
        )}
      </div>
      <div className="weather-info">
        <div className="city-name">
          {weatherData?.cityName || "알 수 없는 위치"}
        </div>
        <div className="temperature">{Math.round(weatherData?.temp)}°C</div>
        <div className="description">{weatherData?.weather}</div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
