import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Editor from "./Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const { curDiaryItem, setDeleteOperation } = useDiary(params.id);

  const onClickDelete = async () => {
    if (window.confirm("일기를 삭제합니다. 삭제하면 복구가 안 됩니다.")) {
      setDeleteOperation(true); // 삭제 작업 시작
      const success = await onDelete(params.id);
      if (success) {
        nav("/", { replace: true });
      }
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      // input.createdDate가 Date 객체가 아닐 경우를 대비한 안전한 처리
      const timestamp =
        input.createdDate instanceof Date
          ? input.createdDate.getTime()
          : Number(input.createdDate);

      onUpdate(params.id, timestamp, input.weather, input.content, input.diary);
      nav("/", { replace: true });
    }
  };
  console.log("Edit initData:", curDiaryItem);

  // 로딩 상태 처리
  if (!curDiaryItem) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div>
      <Header
        title={"일기 수정"}
        leftChild={
          <>
            <Button onClick={() => nav(-1)} text={"<"} />
            <Button onClick={() => nav("/")} useIcon={true} />
          </>
        }
        rightChild={
          <Button onClick={onClickDelete} text={"삭제"} type={"NEGATIVE"} />
        }
      />
      <Editor
        initData={curDiaryItem}
        onSubmit={onSubmit}
        showWeatherInfo={true}
        useSavedWeather={true}
      />
    </div>
  );
};

export default Edit;
