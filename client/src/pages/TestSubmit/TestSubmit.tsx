import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./TestSubmit.less";
import { useNavigate, useParams } from "react-router-dom";
import { UserSubmit } from "../../types/UserSubmit";
import { UserExamTest } from "../../types/UserExamTest";
import { getTestForUser } from "../../api/getTestForUser";
import { sendUserResult } from "../../api/sendUserResult";
import dayjs from "dayjs";
import { CountdownTimer } from "../../components/CountdownTimer";
import { getTestTime } from "../../api/getTestTime";
import { PageConsts } from "../../page-consts";

export const TestSubmit = () => {
 const { id } = useParams();
 const navigate = useNavigate();

 const [now, setNow] = useState(new Date());

 const [testDate, setTestDate] = useState<{
  startAt: string;
  endAt: string;
 } | null>(null);

 const [examState, setExamState] = useState<UserExamTest | null>(null);
 const [result, setResult] = useState<UserSubmit>({
  studentName: "",
  submittedAt: new Date().toISOString(),
  answers: [],
 });

 const handleAnswerChange = (
  questionId: number,
  answerText: string,
  isMany: boolean,
  checked: boolean,
 ) => {
  setResult(prev => {
   const current = prev.answers;

   if (isMany) {
    if (checked) {
     const alreadyExists = current.some(
      a => a.questionId === questionId && a.answerText === answerText,
     );
     if (!alreadyExists) {
      return {
       ...prev,
       answers: [...current, { questionId, answerText }],
      };
     }
     return prev;
    } else {
     return {
      ...prev,
      answers: current.filter(
       a => !(a.questionId === questionId && a.answerText === answerText),
      ),
     };
    }
   } else {
    const updatedAnswers = current.filter(a => a.questionId !== questionId);
    updatedAnswers.push({ questionId, answerText });

    return {
     ...prev,
     answers: updatedAnswers,
    };
   }
  });
 };

 const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setResult(prev => ({
   ...prev,
   studentName: e.target.value,
  }));
 };

 const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!result.studentName.trim()) {
   alert("Пожалуйста, введите имя.");
   return;
  }
  sendUserResult({
   id: Number(id),
   content: { ...result, submittedAt: new Date().toISOString() },
  }).finally(() => {
   navigate(PageConsts.TEST_FINISH, { replace: true });
  });
  // .then(() => {
  //  setExamState(null);
  // });
 };

 useEffect(() => {
  getTestTime(Number(id))
   .then(res => {
    setTestDate(res);
   })
   .then(() => {
    getTestForUser(Number(id)).then(res => {
     setExamState(res);
     setResult({
      studentName: "",
      submittedAt: new Date().toISOString(),
      answers: [],
     });
    });
   });
 }, []);

 useEffect(() => {
  const interval = setInterval(() => {
   setNow(new Date());
  }, 1000);

  return () => clearInterval(interval);
 }, []);

 if (!testDate) {
  return (
   <div className="test-message">
    <h1>Загрузка</h1>
   </div>
  );
 }

 const time = 3;
 const extraTime = dayjs(testDate.endAt).add(time, "minutes");

 if (now < new Date(testDate.startAt)) {
  return (
   <div className="test-message">
    <h1>Тест начнется {dayjs(testDate.startAt).format("HH:mm DD.MM.YYYY")}</h1>
   </div>
  );
 }

 if (now > new Date(testDate.endAt)) {
  return (
   <div className="test-message">
    <h1>Тест завершен</h1>
    <CountdownTimer
     endAt={extraTime.toISOString()}
     showEndMessage={false}
     text={`Через ${time} минуты тест будет закрыт для отправки.`}
    />
    {now < extraTime.toDate() ? (
     <form onSubmit={handleSubmit}>
      <div className="test-form-block" style={{ marginTop: 20 }}>
       <h3>Укажите ваше имя</h3>
       <input
        type="text"
        className="test-form-block-input"
        placeholder="Введите ваше имя"
        value={result.studentName}
        onChange={handleNameChange}
        required
       />
      </div>
      <div className="test-form-block">
       <input className="test-form-block-submit" type="submit" />
      </div>
     </form>
    ) : (
     ""
    )}
   </div>
  );
 }

 return (
  <form className="test-form" onSubmit={handleSubmit}>
   <div className="test-form-block">
    <CountdownTimer endAt={testDate.endAt} />
   </div>
   <div className="test-form-header">
    <h1 className="test-form-header-title">Онлайн тестирование</h1>
    <h2>Кафедра: {examState?.exam.department}</h2>
    <h2>Преподаватель: {examState?.exam.name}</h2>
    <h2>Предмет: {examState?.exam.lesson}</h2>
    <h2>Курс: {examState?.exam.course}</h2>
   </div>
   {examState && (
    <div className="test-form-block">
     <h3>Введите ваше имя</h3>
     <input
      type="text"
      className="test-form-block-input"
      placeholder="Введите ваше имя"
      value={result.studentName}
      onChange={handleNameChange}
      required
     />
    </div>
   )}
   {examState?.questions.map(element => (
    <div className="test-form-block" key={uuidv4()}>
     <h3>{element.question}</h3>
     <p>
      {element.isManyCorrectAnswers
       ? "Вопрос содержит несколько ответов"
       : "Выберите один правильный ответ"}
     </p>
     <div className="test-form-block-images">
      {element.images.map(image => (
       <img className="test-form-block-image" src={image} key={uuidv4()} />
      ))}
     </div>
     <div className="test-form-block-answers">
      {element.answers.map(answer => {
       const isChecked = result.answers.some(
        result =>
         result.questionId === element.id && result.answerText === answer.text,
       );

       return (
        <label key={answer.id} className="test-form-block-answers-answer">
         <input
          type={element.isManyCorrectAnswers ? "checkbox" : "radio"}
          name={`question-${element.id}`}
          value={answer.text}
          checked={isChecked}
          onChange={e =>
           handleAnswerChange(
            element.id,
            answer.text,
            element.isManyCorrectAnswers,
            e.target.checked,
           )
          }
          required={!element.isManyCorrectAnswers}
         />
         <span>{answer.text}</span>
        </label>
       );
      })}
     </div>
    </div>
   ))}
   {examState && (
    <div className="test-form-block">
     <input className="test-form-block-submit" type="submit" />
    </div>
   )}
  </form>
 );
};
