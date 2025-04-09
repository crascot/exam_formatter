import { ChangeEvent, useState } from "react";
import "./ExamQuestions.less";
import { generateWordFile } from "./utils/generateWordFile";
import { Container } from "../../components/Container";
import { InputFile } from "../../components/InputFile";
import { ExamInstruction } from "../../components/ExamInstruction";
import { motion } from "framer-motion";
import { handleFileChange } from "../../utils/handleFileChange";
import { parseExam } from "./utils/parser";
import { ExamType } from "../../types/ExamTypes";

export const ExamQuestions = () => {
 const [content, setContent] = useState<ExamType | null>(null);
 const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
 const inputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  handleFileChange(e, setContent, parseExam);
 };

 const filteredContent = content
  ? {
     ...content,
     questions: content.questions.filter(
      (_, i) => !disabledIndexes.includes(i),
     ),
    }
  : null;

 const generateFile = () => {
  if (!filteredContent) {
   return;
  }

  generateWordFile(filteredContent);
 };

 return (
  <Container>
   <div className="exam-questions">
    <h1>Загрузите свой word документ с экзаменационными вопросами</h1>
    <InputFile onChange={inputFileOnChange} />

    {content ? (
     <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${content.questions.length ? "exam-questions-content-show" : ""} exam-questions-content`}
     >
      <div className="exam-questions-content-block">
       <h2>Предпросмотр</h2>
       <h3>Кафедра: {content.department}</h3>
       <h3>Курс: {content.course}</h3>
       <ul>
        {content.questions.map((e, index) => {
         const isDisabled = disabledIndexes.includes(index);
         return (
          <li
           className="exam-questions-content-block-list"
           key={`${e}${e.question}`}
          >
           <h4
            className={`${isDisabled ? "exam-questions-content-block-list-question-disabled" : ""} exam-questions-content-block-list-question`}
           >
            {e.question}
           </h4>
           <button
            className={`${isDisabled ? "exam-questions-content-block-list-delete-button-disabled" : ""} exam-questions-content-block-list-delete-button`}
            onClick={() => {
             setDisabledIndexes(prev =>
              prev.includes(index)
               ? prev.filter(i => i !== index)
               : [...prev, index],
             );
            }}
           >
            {isDisabled ? "Восстановить" : "Убрать"}
           </button>
          </li>
         );
        })}
       </ul>
      </div>
      <button
       className="exam-questions-content-generate-file"
       onClick={generateFile}
      >
       Скачать новый .docx
      </button>
     </motion.div>
    ) : (
     ""
    )}
   </div>
   <ExamInstruction />
  </Container>
 );
};
