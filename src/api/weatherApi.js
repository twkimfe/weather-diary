// src/api/weatherApi.js
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherKorean = {
  Clear: "맑음",
  Clouds: "흐림",
  Rain: "비",
  Snow: "눈",
  Thunderstorm: "천둥번개",
  Drizzle: "이슬비",
  Mist: "옅은 안개",
  Fog: "안개",
  Haze: "실안개",
  Dust: "먼지",
  Sand: "모래먼지",
  Ash: "화산재",
  Squall: "돌풍",
  Tornado: "토네이도",
};

const weatherCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5분

export const getCurrentWeather = async (lat, lon) => {
  // 위도, 경도 값 검증 추가
  if (!lat || !lon) {
    throw new Error("위도와 경도 값이 필요합니다");
  }

  const cacheKey = `${lat},${lon}`;
  const cached = weatherCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );
    const data = await response.json();

    // API 응답 상태 확인 추가
    if (response.status !== 200) {
      throw new Error(`날씨 API 오류: ${data.message}`);
    }
    const weatherData = {
      temp: data.main.temp,
      weather:
        weatherKorean[data.weather[0].main] || data.weather[0].description,
      icon: data.weather[0].icon,
      originalWeather: data.weather[0].main,
      cityName: data.name,
    };

    // 캐시 저장
    weatherCache.set(cacheKey, {
      data: weatherData,
      timestamp: Date.now(),
    });

    console.log(data);
    console.log("API Response:", response); // 응답 데이터 구조 확인

    return weatherData;
  } catch (error) {
    console.error("날씨 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};
