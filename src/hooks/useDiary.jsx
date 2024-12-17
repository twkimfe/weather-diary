import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (data.length >= 0) {
      const currentDiaryItem = data.find(
        (item) => String(item.id) === String(id)
      );

      if (!currentDiaryItem) {
        window.alert("존재하지 않는 페이지입니다.");
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
      setCurDiaryItem(processedItem);
    }
  }, [id, data, nav]);

  return curDiaryItem;
};

export default useDiary;
