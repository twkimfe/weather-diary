// src/hooks/useWeather.js
import { useState, useCallback } from "react";
import { getCurrentWeather } from "../api/weatherApi";
import { getCurrentLocation } from "../utils/locationUtils";

export const useWeather = (initialLocation = null) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(async (location) => {
    if (!location?.lat && !location?.latitude) return;

    try {
      setLoading(true);
      const weather = await getCurrentWeather(
        location.latitude || location.lat,
        location.longitude || location.lon
      );

      const newWeatherData = {
        ...weather,
        location: {
          lat: location.latitude || location.lat,
          lon: location.longitude || location.lon,
        },
      };

      setWeatherData(newWeatherData);
      setError(null);
      return newWeatherData;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  const getWeatherWithLocation = useCallback(async () => {
    try {
      const location = initialLocation || (await getCurrentLocation());
      return await fetchWeather(location);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [initialLocation, fetchWeather]);

  console.log("Hook State:", weatherData); // 훅의 상태 변화 추적

  return {
    weatherData,
    error,
    loading,
    fetchWeather,
    getWeatherWithLocation,
  };
};
