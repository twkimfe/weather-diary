// src/components/WeatherDisplay/WeatherDisplay.jsx
import { useEffect } from "react";
import { useWeather } from "../../hooks/useWeather";

const WeatherDisplay = ({
  locationData,
  onWeatherUpdate,
  savedWeather,
  useSavedWeather = false,
  // New: useSavedWeather = false (실시간 날씨)
  // Home/ Diary / Edit: useSavedWeather = true (저장된 날씨)
}) => {
  const { weatherData, error, loading, getWeatherWithLocation } =
    useWeather(locationData);

  useEffect(() => {
    let isSubscribed = true;

    const initWeather = async () => {
      if (useSavedWeather && savedWeather) {
        if (isSubscribed && onWeatherUpdate) {
          onWeatherUpdate(savedWeather);
        }
        return;
      }

      if (!useSavedWeather) {
        try {
          const data = await getWeatherWithLocation();
          if (isSubscribed && data && onWeatherUpdate) {
            onWeatherUpdate(data);
          }
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      }
    };

    initWeather();
    return () => {
      isSubscribed = false;
    };
  }, [useSavedWeather, savedWeather, getWeatherWithLocation, onWeatherUpdate]);

  if (loading) {
    return (
      <div className="weather-display loading">날씨 정보를 불러오는 중...</div>
    );
  }

  if (error) {
    return (
      <div className="weather-display error">
        날씨 정보를 불러오는데 실패했습니다
      </div>
    );
  }

  const displayData = useSavedWeather ? savedWeather : weatherData;

  if (!displayData) {
    return (
      <div className="weather-display no-data">날씨 정보를 불러오는 중...</div>
    );
  }

  return (
    <div className="weather-display">
      <div className="weather-icon">
        {displayData.icon && (
          <img
            src={`http://openweathermap.org/img/wn/${displayData.icon}@2x.png`}
            alt="날씨 아이콘"
          />
        )}
      </div>
      <div className="weather-info">
        <div className="city-name">
          {displayData.cityName || "알 수 없는 위치"}
        </div>
        <div className="temperature">
          {displayData.temp ? `${Math.round(displayData.temp)}°C` : ""}
        </div>
        <div className="description">{displayData.weather || ""}</div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
