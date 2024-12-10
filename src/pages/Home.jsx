import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

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

  const monthlyData = getMonthlyData(pivotDate, data);
  console.log(monthlyData);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  // 현재 월이 원래 월인지 확인하는 함수
  const isCurrentMonth =
    pivotDate.getMonth() === originalMonth.getMonth() &&
    pivotDate.getFullYear() === originalMonth.getFullYear();

  // onTitleClick 함수
  const onTitleClick = () => {
    if (!isCurrentMonth) {
      setPivotDate(new Date(originalMonth));
    }
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
        isCurrentMonth={isCurrentMonth}
        onTitleClick={onTitleClick}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
