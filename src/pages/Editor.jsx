import "./Editor.css";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import Button from "../components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getStringedDate = (targetDate) => {
  // 날짜 -> YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ onSubmit }) => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date().toISOString().split("T")[0];
  const [input, setInput] = useState({
    createdDate: new Date(),
    weather: 3,
    content: "",
    diary: "",
  });
  const nav = useNavigate();

  const onChangeInput = (e) => {
    console.log(e.target.name);
    // 어떤 요소에 입력이 들어온 건지 확인
    console.log(e.target.value);
    // 입력 값이 무엇인지 확인

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
          defaultValue={today}
        />
      </section>
      <section className="weather_section">
        <h4>오늘의 날씨</h4>
        <div className="weather">
          <WeatherDisplay />
        </div>
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
