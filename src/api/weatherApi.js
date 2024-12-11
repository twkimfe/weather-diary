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

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );
    const data = await response.json();
    console.log(data);
    return {
      temp: data.main.temp,
      weather:
        weatherKorean[data.weather[0].main] || data.weather[0].description,
      icon: data.weather[0].icon,
      originalWeather: data.weather[0].main,
      cityName: data.name, // 도시 이름 추가
    };
  } catch (error) {
    console.error("날씨 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};
