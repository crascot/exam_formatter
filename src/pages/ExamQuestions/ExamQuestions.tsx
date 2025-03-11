import { ChangeEvent, useState } from "react";
import { handleFileUpload } from "./utils/handleFileUpload";
import "./ExamQuestions.less";
import { generateWordFile } from "./utils/generateWordFile";
import { Container } from "../../components/Container";
import { InputFile } from "../../components/InputFile";
import { ExamInstruction } from "../../components/ExamInstruction";
import { motion } from "framer-motion";

export const ExamQuestions = () => {
 const [content, setContent] = useState<string[]>([]);

 const inputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  handleFileUpload(e, setContent);
 };

 return (
  <Container>
   <div className="exam-questions">
    <h1>Загрузите свой word документ с экзаменационными вопросами</h1>
    <InputFile onChange={inputFileOnChange} />

    {content.length && content.length <= 40 ? (
     <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${content.length ? "exam-questions-content-show" : ""} exam-questions-content`}
     >
      <div className="exam-questions-content-block">
       <h2>Предпросмотр</h2>
       <ul>
        {content.map(question => (
         <li key={`${question}${question.length}`}>
          <h4>{question}</h4>
         </li>
        ))}
       </ul>
      </div>
      <button
       onClick={() => generateWordFile(content)}
       disabled={content.length === 0}
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
