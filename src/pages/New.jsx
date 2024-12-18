import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Editor from "./Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(input.createdDate, input.weather, input.content, input.diary);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav(-1)} text={"<"} />}
      />
      <Editor onSubmit={onSubmit} showWeatherInfo={false} />
    </div>
  );
};

export default New;
