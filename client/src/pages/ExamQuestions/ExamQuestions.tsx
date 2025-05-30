import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./ExamQuestions.less";
import { generateWordFile } from "./utils/generateWordFile";
import { Container } from "../../components/Container";
import { ExamType, Question } from "../../types/ExamTypes";
import { Form } from "../../components/Form/Form";
import { QuestionGenerator } from "../../components/QuestionGenerator/QuestionGenerator";

const initialExam: ExamType = {
 department: "",
 course: 0,
 lesson: "",
 questions: [],
 config: { Легкий: 0, Средний: 0, Сложный: 0 },
 startAt: null,
 endAt: null,
};

export const ExamQuestions = () => {
 const [content, setContent] = useState<ExamType>(initialExam);
 const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);

 const [ticketCount, setTicketCount] = useState<number>(1);

 const maxTickets = useMemo(() => {
  const difficulties = ["Легкий", "Средний", "Сложный"] as const;

  const categorized = Object.fromEntries(
   difficulties.map(d => [d, []]),
  ) as Record<string, Question[]>;

  for (const q of content.questions) {
   categorized[q.difficulty].push(q);
  }

  const result = difficulties
   .filter(d => content.config[d] > 0)
   .map(d => Math.floor(categorized[d].length / content.config[d]));

  return result.length ? Math.min(...result) : 0;
 }, [content]);

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

  generateWordFile(filteredContent, ticketCount);
 };

 return (
  <Container>
   <div className="exam-questions">
    <h1>Заполните форму и загрузите файлы с вопросами</h1>
    <Form state={content} setState={setContent} />
    <QuestionGenerator setContent={setContent} />
    {JSON.stringify(content) !== JSON.stringify(initialExam) ? (
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
          <li className="exam-questions-content-block-list" key={uuidv4()}>
           <p>{e.difficulty}</p>
           {e.images.length
            ? e.images.map(image => (
               <img style={{ width: 100 }} src={image} key={image} />
              ))
            : ""}
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
      {ticketCount !== Infinity ? (
       <div className="exam-questions-content-ticket-count">
        <h5>Количество билетов (макс. {maxTickets}):</h5>
        <input
         type="number"
         min={1}
         max={maxTickets}
         value={ticketCount}
         onChange={e =>
          setTicketCount(
           Math.min(maxTickets, Math.max(1, Number(e.target.value))),
          )
         }
         style={{ marginLeft: 8, width: 80 }}
        />
       </div>
      ) : (
       ""
      )}
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
  </Container>
 );
};
