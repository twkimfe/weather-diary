import { useState } from "react";
import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

// 1. "/": home page 모든 일기 조회
// 2. "/new": new page 새 일기 작성
// 3. "/diary": diary 일기 상세 조회

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-11-19").getTime(),
    weather: 1,
    content: "1번 일기 제목",
    diary: "일기 내용",
    location: {
      lat: 31.2304, // 상하이
      lon: 121.4737,
    },
  },
  {
    id: 2,
    createdDate: new Date("2024-12-09").getTime(),
    weather: 2,
    content: "2번 일기 제목",
    diary: "일기 내용",
    location: {
      lat: 39.9042, // 베이징
      lon: 116.4074,
    },
  },
  {
    id: 3,
    createdDate: new Date("2025-01-08").getTime(),
    weather: 4,
    content: "3번 일기 제목",
    diary: "일기 내용",
    location: {
      lat: 35.6762, // 도쿄
      lon: 139.6503,
    },
  },
  {
    id: 4,
    createdDate: new Date("2024-12-02").getTime(),
    weather: 3,
    content: "4번 일기 제목",
    diary: "일기 내용",
    location: {
      lat: 40.7128, // 뉴욕
      lon: -74.006,
    },
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state].sort(
        (a, b) => b.createdDate - a.createdDate
      );
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(5);

  // 새 일기 추가
  // 새 일기 추가 기능
  const onCreate = (createdDate, weather, content, diary) => {
    const newId = idRef.current;
    idRef.current += 1;

    dispatch({
      type: "CREATE",
      data: {
        id: newId,
        createdDate: new Date(createdDate).getTime(), // timestamp로 저장
        weather,
        content,
        diary,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, weather, content, diary) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        weather,
        content,
        diary,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
