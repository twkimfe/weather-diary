import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Viewer from "./Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../utils/get-stringed-date";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);
  console.log(curDiaryItem);

  if (!curDiaryItem) {
    return <div>데이터 로딩 중..!</div>;
  }

  const { createdDate, weather, content, diary } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 일기`}
        leftChild={<Button onClick={() => nav(-1)} text={"<"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer weather={weather} content={content} diary={diary} />
    </div>
  );
};

export default Diary;
