import "./QuestionGenerator.less";
import AIIcon from "../../icons/svg/ai-icon.svg";
import { ExamType } from "../../types/ExamTypes";
import { Dispatch, SetStateAction, useState } from "react";
import { QuestionGeneratorModal } from "./modal/QuestionGeneratorModal";

type QuestionGeneratorType = {
 setContent: Dispatch<SetStateAction<ExamType>>;
 forTest?: boolean;
};

export const QuestionGenerator = ({
 setContent,
 forTest,
}: QuestionGeneratorType) => {
 const [modal, setModal] = useState<"loading" | "form" | null>(null);

 const openModal = () => {
  setModal("form");
 };

 const closeModal = () => {
  setModal(null);
 };

 return (
  <>
   <div className="question-generator">
    <button onClick={openModal} className="question-generator-button">
     <AIIcon />
     Сгенерировать при помощи ИИ
    </button>
    <p className="question-generator-alert">
     ВАЖНО! Вопросы могут не совпадать или быть некорректными
    </p>
   </div>
   {modal === "form" && (
    <QuestionGeneratorModal
     setState={setContent}
     closeModal={closeModal}
     forTest={forTest}
    />
   )}
  </>
 );
};
