import { Dispatch, SetStateAction, useState } from "react";
import "./QuestionGeneratorModal.less";
import { Modal } from "../../Modal/Modal";
import {
 Difficulty,
 DifficultyEnum,
 ExamType,
 Question,
} from "../../../types/ExamTypes";
import AIIcon from "../../../icons/svg/ai-icon.svg";
import { GenerateExamType } from "../../../types/generateExam";
import { generateExamWithGemini } from "../../../api/generateExamWithGemini";
import { LoaderModal } from "../../LoaderModal";

type QuestionGeneratorModalType = {
 setState: Dispatch<SetStateAction<ExamType>>;
 closeModal: () => void;
 forTest?: boolean;
};

const initialContent: GenerateExamType = {
 subject: "",
 difficulty: {
  Легкий: 0,
  Средний: 0,
  Сложный: 0,
 },
 details: "",
};

export const QuestionGeneratorModal = ({
 setState,
 closeModal,
 forTest,
}: QuestionGeneratorModalType) => {
 const [isLoading, setIsLoading] = useState(false);

 const [content, setContent] = useState<GenerateExamType | null>(
  initialContent,
 );

 const handleInputChange = <K extends keyof GenerateExamType>(
  key: K,
  value: GenerateExamType[K],
 ) => {
  setContent(prev => {
   if (!prev) return null;
   return {
    ...prev,
    [key]: value,
   };
  });
 };

 const handleDifficultyChange = (level: Difficulty, value: number) => {
  setContent(prev => {
   if (!prev) return null;
   return {
    ...prev,
    difficulty: {
     ...prev.difficulty,
     [level]: value,
    },
   };
  });
 };

 const getResult = () => {
  if (!content || !content.subject || !content.details) {
   alert("Пожалуйста, заполните все поля формы.");
   return;
  } else {
   setIsLoading(true);

   const totalQuestions =
    content.difficulty["Легкий"] +
    content.difficulty["Средний"] +
    content.difficulty["Сложный"];

   if (totalQuestions < 2) {
    alert(
     "Минимальное количество вопросов - 2. Пожалуйста, измените настройки сложности.",
    );
    return;
   }
  }
  generateExamWithGemini({ content, forTest })
   .then((res: Question[]) => {
    setState(prev => ({
     ...prev,
     questions: [...res, ...prev.questions],
    }));
   })
   .catch(() => {
    alert("Ошибка при генерации экзамена, попробуйте еще раз");
   })
   .finally(() => {
    setIsLoading(false);
    closeModal();
   });
 };

 if (isLoading) {
  return <LoaderModal />;
 }

 return (
  <Modal onClick={closeModal}>
   <div className="question-generator-modal">
    <div className="question-generator-modal__header">
     <h2>Генератор вопросов</h2>
    </div>
    <div className="question-generator-modal__content">
     <label>
      <h5>Предмет</h5>
      <input
       value={content?.subject ?? ""}
       onChange={e => handleInputChange("subject", e.target.value)}
       placeholder="Предмет"
       type="text"
      />
     </label>

     {forTest ? (
      <label>
       <h5>Количество вопросов</h5>
       <input
        type="number"
        value={content?.difficulty[DifficultyEnum.EASY] ?? 0}
        onChange={e =>
         handleDifficultyChange(DifficultyEnum.EASY, +e.target.value)
        }
       />
      </label>
     ) : (
      <>
       {(
        [
         DifficultyEnum.EASY,
         DifficultyEnum.MIDDLE,
         DifficultyEnum.HARD,
        ] as Difficulty[]
       ).map(level => (
        <label key={level}>
         <h5>{level}</h5>
         <input
          type="number"
          value={content?.difficulty[level]}
          onChange={e => handleDifficultyChange(level, +e.target.value)}
         />
        </label>
       ))}
      </>
     )}

     <label>
      <h5>Подробная информация</h5>
      <textarea
       value={content?.details ?? ""}
       onChange={e => handleInputChange("details", e.target.value)}
       placeholder="Какой класс/курс, какие темы были пройдены, что важно учесть и тп."
      />
     </label>
    </div>
    <div className="question-generator-modal__footer">
     <button
      onClick={getResult}
      className="question-generator-modal__footer-button"
     >
      <AIIcon />
      Сгенерировать
     </button>
    </div>
   </div>
  </Modal>
 );
};
