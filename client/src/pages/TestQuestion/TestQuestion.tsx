import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import "./TestQuestion.less";
import { Container } from "../../components/Container";
import { motion } from "framer-motion";
import { ExamType, Question } from "../../types/ExamTypes";
import { Form } from "../../components/Form";
import { Modal } from "../../components/Modal/Modal";
import { addNewTests } from "../../api/addNewTest";
import { LinkResponse } from "../../types/ExamResponse";
import { QuestionForm } from "../../components/QuestionForm";
import { CopyButton } from "../../components/CopyButton";

const initialExam: ExamType = {
 department: "",
 course: 0,
 lesson: "",
 questions: [],
 config: { Легкий: 0, Средний: 0, Сложный: 0 },
 startAt: null,
 endAt: null,
};

export const TestQuestion = () => {
 const [content, setContent] = useState<ExamType>(initialExam);
 const [links, setLinks] = useState<LinkResponse | null>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);

 const filteredContent = content
  ? {
     ...content,
     questions: content.questions.filter(
      (_, i) => !disabledIndexes.includes(i),
     ),
    }
  : null;

 const createTest = () => {
  if (!filteredContent) {
   return;
  }
  const hasEmptyAnswers = content.questions.some(
   question => question.answers.length === 0,
  );
  const hasNoCorrectAnswer = content.questions.some(question =>
   question.answers.every(answer => !answer.isCurrect),
  );

  if (hasEmptyAnswers) {
   alert("Есть вопросы без ответов.");
   return;
  }

  if (hasNoCorrectAnswer) {
   alert("Есть вопросы без правильного ответа.");
   return;
  }

  addNewTests({ content })
   .then(res => {
    console.log(res);

    setLinks(res);
    setIsModalOpen(true);
   })
   .catch(err => {
    console.error(err);
   });
 };

 useEffect(() => {
  if (links !== null) {
   setIsModalOpen(true);
  }
 }, [links]);

 const handleAddQuestion = (newQuestion: Question) => {
  setContent(prev => ({
   ...prev,
   questions: [newQuestion, ...prev.questions],
  }));
 };

 return (
  <>
   {isModalOpen && links && (
    <Modal onClick={() => setIsModalOpen(false)}>
     <div className="modal-links">
      <h3>{links.message}</h3>
      <h4>Здесь вы можете посмотреть результат студентов:</h4>
      <a href={links.adminUrl} target="_blank" rel="noreferrer">
       Смотреть результат тестов
      </a>
      <h4>Ссылка для прохождения теста:</h4>
      <a href={links.examUrl} target="_blank" rel="noreferrer">
       localhost:8080{links.examUrl}
      </a>
      <CopyButton textToCopy={`localhost:8080${links.examUrl}`} />
     </div>
    </Modal>
   )}
   <Container>
    <div className="exam-questions">
     <h1>Заполните форму и загрузите файлы с вопросами</h1>
     <Form state={content} setState={setContent} showTestLabels />
     <h2>Или</h2>
     <QuestionForm onSubmit={handleAddQuestion} />

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
       <button
        className="exam-questions-content-generate-file"
        onClick={createTest}
       >
        Создать тест
       </button>
      </motion.div>
     ) : (
      ""
     )}
    </div>
   </Container>
  </>
 );
};
