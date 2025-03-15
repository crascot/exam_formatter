import React, { Dispatch, SetStateAction } from "react";
import { Difficulty } from "../../../types/ExamTypes";

type DifficultType = {
 difficult: Difficulty | null;
 setDifficult: Dispatch<SetStateAction<Difficulty | null>>;
};

export const Difficult = ({ difficult, setDifficult }: DifficultType) => {
 return (
  <div className="exam-questions-content-block-difficult">
   <button
    className={
     difficult === "Легкий"
      ? "exam-questions-content-block-difficult-current"
      : ""
    }
    onClick={() => setDifficult("Легкий")}
   >
    Легкий
   </button>
   <button
    className={
     difficult === "Средний"
      ? "exam-questions-content-block-difficult-current"
      : ""
    }
    onClick={() => setDifficult("Средний")}
   >
    Средний
   </button>
   <button
    className={
     difficult === "Сложный"
      ? "exam-questions-content-block-difficult-current"
      : ""
    }
    onClick={() => setDifficult("Сложный")}
   >
    Сложный
   </button>
  </div>
 );
};
