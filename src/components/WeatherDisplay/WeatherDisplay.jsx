import { useState, useEffect, useCallback } from "react";
import { getCurrentWeather } from "../../api/weatherApi";
import { getCurrentLocation } from "../../utils/locationUtils";

const WeatherDisplay = ({ locationData }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetchWeather 함수를 useCallback으로 메모이제이션
  const fetchWeather = useCallback(async () => {
    try {
      // 이미 날씨 데이터가 있고 locationData가 변경되지 않았다면 스킵
      if (weatherData && locationData === weatherData.locationData) {
        return;
      }

      let location = null;
      try {
        if (locationData && locationData.lat && locationData.lon) {
          location = locationData;
        } else {
          location = await getCurrentLocation();
        }

        const weather = await getCurrentWeather(
          location.latitude || location.lat,
          location.longitude || location.lon
        );

        setWeatherData({
          ...weather,
          locationData: location,
        });
        setError(null);
      } catch (locationError) {
        setError(locationError.message);
        console.log("위치 정보를 가져올 수 없습니다");
        return;
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [locationData]);
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

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
        <div className="temperature">
          {weatherData?.temp ? `${Math.round(weatherData.temp)}°C` : ""}
        </div>
        <div className="description">{weatherData?.weather || ""}</div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
