// src/utils/weatherIcon.js
export const getWeatherImage = (weather) => {
  switch (weather) {
    case "Clear":
      return "http://openweathermap.org/img/wn/01d@2x.png";
    case "Clouds":
      return "http://openweathermap.org/img/wn/02d@2x.png";
    case "Rain":
      return "http://openweathermap.org/img/wn/10d@2x.png";
    case "Snow":
      return "http://openweathermap.org/img/wn/13d@2x.png";
    case "Thunderstorm":
      return "http://openweathermap.org/img/wn/11d@2x.png";
    default:
      return "http://openweathermap.org/img/wn/50d@2x.png"; // Mist, Haze 등
  }
};
