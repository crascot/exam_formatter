import { ChangeEvent, useState } from "react";
import "./ExamQuestions.less";
import { generateWordFile } from "./utils/generateWordFile";
import { Container } from "../../components/Container";
import { InputFile } from "../../components/InputFile";
import { ExamInstruction } from "../../components/ExamInstruction";
import { motion } from "framer-motion";
import { handleFileChange } from "../../utils/handleFileChange";
import { parseExam } from "./utils/parser";
import { Difficulty, ExamType } from "../../types/ExamTypes";
import { Difficult } from "./Difficult/Difficult";

export const ExamQuestions = () => {
 const [content, setContent] = useState<ExamType | null>(null);
 const [difficult, setDifficult] = useState<Difficulty | null>(null);
 const [count] = useState(2);

 const inputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  handleFileChange(e, setContent, parseExam);
 };

 const generateFile = () => {
  if (!content) {
   return;
  }
  if (!difficult) {
   alert("Выберите сложность");
   return;
  }

  generateWordFile(content, difficult, count);
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
        {content.questions.map(e => (
         <li key={`${e}${e.question}`}>
          <h4>{e.question}</h4>
         </li>
        ))}
       </ul>
      </div>
      <Difficult difficult={difficult} setDifficult={setDifficult} />
      <button onClick={generateFile}>Скачать новый .docx</button>
     </motion.div>
    ) : (
     ""
    )}
   </div>
   <ExamInstruction />
  </Container>
 );
};
