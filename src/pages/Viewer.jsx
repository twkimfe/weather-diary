import "./Viewer.css";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";

const Viewer = ({ weather, content, diary }) => {
  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 날씨</h4>
        <div className="weather">
          <WeatherDisplay />
        </div>
      </section>
      <section className="content_section">
        <h4>일기 제목</h4>
        <div className="content-wrapper">
          <h3>{content}</h3>
        </div>
        <h4>일기 내용</h4>
        <div className="content-wrapper">
          <p>{diary}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
