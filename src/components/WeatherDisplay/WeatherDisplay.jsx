// src/components/WeatherDisplay/WeatherDisplay.jsx

import { useEffect } from "react";
import { useWeather } from "../../hooks/useWeather";

const WeatherDisplay = ({ locationData, onWeatherUpdate, isEditMode }) => {
  console.log("WeatherDisplay props:", { locationData, isEditMode });

  const { weatherData, error, loading, getWeatherWithLocation } =
    useWeather(locationData);

  useEffect(() => {
    let isSubscribed = true; // 비동기 작업 취소를 위한 flag

    const initWeather = async () => {
      // Edit 모드이고 locationData가 있는 경우
      if (isEditMode && locationData) {
        if (!locationData.cityName || !locationData.temp) {
          console.error("Invalid location data in edit mode:", locationData);
          return;
        }

        const existingWeatherData = {
          cityName: locationData.cityName,
          temp: locationData.temp,
          weather: locationData.weather,
          icon: locationData.icon,
          location: {
            lat: locationData.location?.lat || locationData.lat || 0,
            lon: locationData.location?.lon || locationData.lon || 0,
          },
        };

        if (isSubscribed && onWeatherUpdate) {
          onWeatherUpdate(existingWeatherData);
        }
        return;
      }

      // New 모드이거나 locationData가 없는 경우
      if (!isEditMode) {
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

    // Cleanup function
    return () => {
      isSubscribed = false;
    };
  }, [isEditMode, locationData]); // 의존성 배열 최소화

  if (loading) {
    return (
      <div className="weather-display loading">날씨 정보를 불러오는 중...</div>
    );
  }

  if (error) {
    console.error("Weather display error:", error);
    return (
      <div className="weather-display error">
        날씨 정보를 불러오는데 실패했습니다
      </div>
    );
  }

  if (!weatherData && !isEditMode) {
    return (
      <div className="weather-display no-data">날씨 정보를 불러오는 중...</div>
    );
  }

  if (!weatherData && isEditMode && !locationData) {
    return null;
  }

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
