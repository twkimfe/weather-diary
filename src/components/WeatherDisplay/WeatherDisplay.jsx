import { useState, useEffect, useCallback } from "react";
import { getCurrentWeather } from "../../api/weatherApi";
import { getCurrentLocation } from "../../utils/locationUtils";

const WeatherDisplay = ({ locationData }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);

  const fetchWeather = useCallback(async (location) => {
    try {
      setLoading(true);
      const weather = await getCurrentWeather(
        location.latitude || location.lat,
        location.longitude || location.lon
      );

      setWeatherData({
        ...weather,
        locationData: {
          lat: location.latitude || location.lat,
          lon: location.longitude || location.lon,
        },
      });
      setError(null);
    } catch (err) {
      console.error("날씨 정보를 가져오는데 실패했습니다:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 제거

  useEffect(() => {
    const getWeatherData = async () => {
      // 이미 로딩 중이면 스킵
      if (loading) return;

      // 현재 위치 정보 획득
      const currentLocation =
        locationData?.lat || locationData?.latitude
          ? locationData
          : await getCurrentLocation().catch((error) => {
              console.error("위치 정보를 가져올 수 없습니다:", error);
              setError(error.message);
              return null;
            });

      if (!currentLocation) return;

      // 위치가 변경되었는지 확인
      const newLat = currentLocation.latitude || currentLocation.lat;
      const newLon = currentLocation.longitude || currentLocation.lon;

      if (lastLocation?.lat === newLat && lastLocation?.lon === newLon) {
        return;
      }

      setLastLocation({ lat: newLat, lon: newLon });
      await fetchWeather(currentLocation);
    };

    getWeatherData();
  }, [locationData, fetchWeather, lastLocation]);

  // 로딩 상태와 에러 상태는 early return으로 처리
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

  // 날씨 데이터가 없는 경우도 처리
  if (!weatherData) {
    return (
      <div className="weather-display no-data">날씨 정보를 불러오는 중...</div>
    );
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
