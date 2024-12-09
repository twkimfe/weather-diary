import Button from "./Button";
import "./DiaryItem.css";

const DiaryItem = () => {
  return (
    <div className="DiaryItem">
      <div className="weather_section">
        <img src={""} />
      </div>
      <div className="info_section">
        <div className="created_date">{new Date().toLocaleDateString()}</div>
        <div className="content">일기 내용</div>
      </div>
      <div className="button_section">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
