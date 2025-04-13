import { ChangeEvent, useState } from "react";
import "./TestQuestion.less";
import { Container } from "../../components/Container";
import { InputFile } from "../../components/InputFile";
import { handleFileChange } from "../../utils/handleFileChange";
import { parseTest } from "./utils/parser";
import { TestType } from "./types/TestTypes";
import { motion } from "framer-motion";
import { TestInstructions } from "../../components/TestInstruction";

export const TestQuestion = () => {
 const [content, setContent] = useState<TestType | null>(null);
 const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
 const inputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  handleFileChange(e, setContent, parseTest);
 };

 const filteredContent = content
  ? {
     ...content,
     questions: content.questions.filter(
      (_, i) => !disabledIndexes.includes(i),
     ),
    }
  : null;

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
       onClick={() => console.log(filteredContent)}
      >
       Создать тест
      </button>
     </motion.div>
    ) : (
     ""
    )}
   </div>
   <TestInstructions />
  </Container>
 );
};
