import Button from "../Button/Button";
import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";
import { getWeatherImage } from "../../utils/weatherIcon";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";

const DiaryItem = ({ id, weather, createdDate, content, location }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div onClick={() => nav(`/diary/${id}`)} className="weather_section">
        <WeatherDisplay locationData={location} />
      </div>
      <div onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;