import "./Editor.css";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import Button from "../components/Button/Button";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentWeather } from "../api/weatherApi";
import { getCurrentLocation } from "../utils/locationUtils";
import { getStringedDate } from "../utils/get-stringed-date";

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    weather: {
      cityName: "",
      temp: 0,
      weather: "",
      icon: "",
      location: {
        lat: null,
        lon: null,
      },
    },
    content: "",
    diary: "",
  });

  241215;

  const [error, setError] = useState(null); // 에러 상태 추가
  const fetchWeather = useCallback(async () => {
    try {
      // initData가 있으면 저장된 위치 정보 사용
      let locationData;
      if (initData?.weather?.location) {
        locationData = initData.weather.location;
      } else {
        // 현재 위치 정보 가져오기 시도
        try {
          locationData = await getCurrentLocation();
        } catch (locationError) {
          setError(locationError.message);

          console.log("위치 정보를 가져올 수 없습니다");
          return;
        }
      }

      // 위치 정보 검증
      if (!locationData || !locationData.lat || !locationData.lon) {
        throw new Error("유효하지 않은 위치 정보입니다");
      }

      const weatherData = await getCurrentWeather(
        locationData.lat,
        locationData.lon
      );

      setInput((prev) => ({
        ...prev,
        weather: {
          cityName: weatherData.cityName,
          temp: weatherData.temp,
          weather: weatherData.weather,
          icon: weatherData.icon,
          location: {
            lat: locationData.lat,
            lon: locationData.lon,
          },
        },
      }));

      // 날씨 정보를 성공적으로 가져왔으면 에러 상태 초기화
      setError(null);
    } catch (error) {
      console.error("날씨 정보 가져오기 실패:", error);
      setError(
        "날씨 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }, [initData]);

  // 컴포넌트 마운트 시 날씨 정보 가져오기
  useEffect(() => {
    if (!initData) {
      // 새 일기 작성 시에만 현재 날씨 가져오기
      fetchWeather();
    }
  }, [fetchWeather, initData]);

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="weather_section">
        <h4>오늘의 날씨</h4>
        <div className="weather">
          {error ? (
            <div className="weather-error">{error}</div>
          ) : (
            <WeatherDisplay
              locationData={
                initData?.weather?.location || input.weather.location
              }
            />
          )}
        </div>
        <p className="info">날씨는 수정이 안되요.</p>
      </section>
      <section className="content_section">
        <h4>일기 제목</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="제목을 입력해주세요."
        />
      </section>
      <section className="diary_section">
        <h4>일기 내용</h4>
        <textarea
          name="diary"
          value={input.diary}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onSubmitButtonClick}
          text={"저장하기"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
