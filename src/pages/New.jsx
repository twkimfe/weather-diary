import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Editor from "./Editor";

const New = () => {
  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} />}
      />
      <Editor />
    </div>
  );
};

export default New;
