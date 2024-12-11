import "./Editor.css";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import Button from "../components/Button/Button";

const Editor = () => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input type="date" defaultValue={today} />
      </section>
      <section className="weather_section">
        <h4>오늘의 날씨</h4>
        <div className="weather">
          <WeatherDisplay />
        </div>
      </section>
      <section className="content_section">
        <h4>일기 제목</h4>
        <textarea placeholder="제목을 입력해주세요" />
      </section>
      <section className="diary_section">
        <h4>일기 내용</h4>
        <textarea placeholder="오늘은 어땠나요?" />
      </section>
      <section className="button_section">
        <Button text={"취소하기"} type={"NEGATIVE"} />
        <Button text={"저장하기"} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
