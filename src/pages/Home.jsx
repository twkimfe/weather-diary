import { useState, useContext, useEffect, useCallback } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import DiaryList from "../components/DiaryList/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [originalMonth] = useState(new Date());
  // 초기 월 저장
  const [monthlyData, setMonthlyData] = useState([]); // 월별 데이터 상태 추가
  usePageTitle("날씨 일기장");

  // useEffect로 data 변경 감지 및 monthlyData 업데이트
  useEffect(() => {
    setMonthlyData(getMonthlyData(pivotDate, data));
  }, [data, pivotDate]);

  // useCallback으로 메모이제이션
  const onDecreaseMonth = useCallback(() => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  }, [pivotDate]);

  const onIncreaseMonth = useCallback(() => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  }, [pivotDate]);

  // 현재 월이 원래 월인지 확인하는 함수
  const isCurrentMonth = useCallback(() => {
    return (
      pivotDate.getMonth() === originalMonth.getMonth() &&
      pivotDate.getFullYear() === originalMonth.getFullYear()
    );
  }, [pivotDate, originalMonth]);

  // onTitleClick 함수
  const onTitleClick = useCallback(() => {
    if (!isCurrentMonth()) {
      setPivotDate(new Date(originalMonth));
    }
  }, [originalMonth, isCurrentMonth]);

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
        isCurrentMonth={isCurrentMonth()}
        onTitleClick={onTitleClick}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
