// src/hooks/useDiary.jsx
import { useContext, useState, useEffect, useRef } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState(null);
  const nav = useNavigate();
  const deleteOperationRef = useRef(false);

  // 삭제 작업 상태 설정 함수
  const setDeleteOperation = (value) => {
    deleteOperationRef.current = value;
  };

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      // 삭제 작업이 아닌 경우에만 알림창 표시
      if (!deleteOperationRef.current) {
        window.alert("존재하지 않는 페이지입니다.");
      }
      nav("/", { replace: true });
      return;
    }

    // weather 데이터 구조 확인 및 보정
    const processedItem = {
      ...currentDiaryItem,
      weather: {
        ...currentDiaryItem.weather,
        location: currentDiaryItem.weather?.location || {
          lat: null,
          lon: null,
        },
      },
    };
    console.log("Original Item:", currentDiaryItem);
    console.log("Processed Item:", processedItem);

    setCurDiaryItem(processedItem);
  }, [id, data, nav]);

  return { curDiaryItem, setDeleteOperation };
};

export default useDiary;
