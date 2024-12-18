// src/hooks/useWeather.js
import { useState, useCallback, useRef } from "react";
import { getCurrentWeather } from "../api/weatherApi";
import { getCurrentLocation } from "../utils/locationUtils";

export const useWeather = (initialLocation = null) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef(new Map());
  const cacheTimeoutRef = useRef(5 * 60 * 1000); // 5분

  const fetchWeather = useCallback(async (location) => {
    if (!location?.lat && !location?.latitude) return null;

    const cacheKey = `${location.latitude || location.lat},${
      location.longitude || location.lon
    }`;
    const cached = cacheRef.current.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < cacheTimeoutRef.current) {
      setWeatherData(cached.data);
      return cached.data;
    }

    try {
      setLoading(true);
      const weather = await getCurrentWeather(
        location.latitude || location.lat,
        location.longitude || location.lon
      );

      const weatherWithLocation = {
        ...weather,
        location: {
          lat: location.latitude || location.lat,
          lon: location.longitude || location.lon,
        },
      };

      cacheRef.current.set(cacheKey, {
        data: weatherWithLocation,
        timestamp: Date.now(),
      });

      setWeatherData(weatherWithLocation);
      setError(null);
      return weatherWithLocation;
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

  return {
    weatherData,
    error,
    loading,
    fetchWeather,
    getWeatherWithLocation,
  };
};
