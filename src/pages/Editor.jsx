// src/pages/Editor.jsx

import { useCallback, useState, useRef } from "react";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { getStringedDate } from "../utils/get-stringed-date";
import "./Editor.css";

const Editor = ({ initData, onSubmit, showWeatherInfo = false }) => {
  const nav = useNavigate();
  const weatherDataRef = useRef(null);

  // timestamp를 Date 객체로 변환하거나 현재 날짜 사용
  const initialDate = initData?.createdDate
    ? new Date(Number(initData.createdDate))
    : new Date();

  const [formData, setFormData] = useState({
    createdDate: initData?.createdDate
      ? new Date(Number(initData.createdDate))
      : new Date(),
    content: initData?.content || "",
    diary: initData?.diary || "",
  });

  const handleWeatherUpdate = useCallback(
    (weatherData) => {
      // 수정 모드가 아닐 때만 날씨 데이터 업데이트
      if (!initData) {
        weatherDataRef.current = weatherData;
      }
    },
    [initData]
  );

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "createdDate"
          ? new Date(value + "T00:00:00") // 날짜 문자열을 Date 객체로 변환
          : value,
    }));
  }, []);

  const onSubmitButtonClick = useCallback(() => {
    // Date 객체를 timestamp로 변환
    const timestamp =
      formData.createdDate instanceof Date
        ? formData.createdDate.getTime()
        : new Date(formData.createdDate).getTime();

    const submissionData = {
      ...formData,
      createdDate: timestamp,
      weather: initData?.weather || weatherDataRef.current,
    };

    if (!submissionData.weather) {
      alert("날씨 정보가 필요합니다.");
      return;
    }

    onSubmit(submissionData);
  }, [formData, initData, onSubmit]);

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(formData.createdDate)}
          type="date"
        />
      </section>
      <section className="weather_section">
        <h4>오늘의 날씨</h4>
        <WeatherDisplay
          locationData={initData?.weather?.location}
          onWeatherUpdate={handleWeatherUpdate}
          isEditMode={!!initData}
          savedWeather={initData?.weather}
        />
        {showWeatherInfo && <p className="info">날씨는 수정이 안되요.</p>}
      </section>
      <section className="content_section">
        <h4>일기 제목</h4>
        <textarea
          name="content"
          value={formData.content}
          onChange={onChangeInput}
          placeholder="제목을 입력해주세요."
        />
      </section>
      <section className="diary_section">
        <h4>일기 내용</h4>
        <textarea
          name="diary"
          value={formData.diary}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text="취소하기" />
        <Button onClick={onSubmitButtonClick} text="저장하기" type="POSITIVE" />
      </section>
    </div>
  );
};
export default Editor;
