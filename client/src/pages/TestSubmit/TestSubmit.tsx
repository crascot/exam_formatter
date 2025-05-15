import { ChangeEvent, useEffect, useState } from "react";
import { Container } from "../../components/Container";
import "./TestSubmit.less";
import { useParams } from "react-router-dom";
import { UserSubmit, UserSubmitAnswer } from "../../types/UserSubmit";
import { UserExamTest } from "../../types/UserExamTest";
import { getTestForUser } from "../../api/getTestForUser";
import { sendUserResult } from "../../api/sendUserResult";

export const TestSubmit = () => {
 const { id } = useParams();
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
   const current = [...prev.answers];
   let updatedAnswers: UserSubmitAnswer[];

   if (isMany) {
    updatedAnswers = checked
     ? [...current, { questionId, answerText }]
     : current.filter(
        a => !(a.questionId === questionId && a.answerText === answerText),
       );
   } else {
    updatedAnswers = [
     ...current.filter(a => a.questionId !== questionId),
     { questionId, answerText },
    ];
   }

   return {
    ...prev,
    answers: updatedAnswers,
   };
  });
 };

 const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setResult(prev => ({
   ...prev,
   studentName: e.target.value,
  }));
 };

 const handleSubmit = () => {
  if (!result.studentName.trim()) {
   alert("Пожалуйста, введите имя.");
   return;
  }
  sendUserResult({
   id: Number(id),
   content: { ...result, submittedAt: new Date().toISOString() },
  });
 };

 useEffect(() => {
  getTestForUser(Number(id)).then(res => {
   setExamState(res);
  });
 }, []);

 useEffect(() => {
  console.log(result);
 }, [result]);

 return (
  <Container>
   <div className="exam-form">
    <h1 className="exam-title">{examState?.exam.name}</h1>

    <input
     type="text"
     className="student-name-input"
     placeholder="Введите ваше имя"
     value={result.studentName}
     onChange={handleNameChange}
    />

    {examState?.questions.map(q => (
     <div key={q.id} className="question-block">
      <p className="question-text">{q.question}</p>
      {q.images.map((src, i) => (
       <img key={i} src={src} alt={`img-${i}`} className="question-image" />
      ))}
      <div className="answers">
       {q.answers.map(a => {
        const isChecked = result.answers.some(
         r => r.questionId === q.id && r.answerText === a.text,
        );

        return (
         <label key={a.id} className="answer-option">
          <input
           type={q.isManyCorrectAnswers ? "checkbox" : "radio"}
           name={`question-${q.id}`}
           value={a.text}
           checked={isChecked}
           onChange={() =>
            handleAnswerChange(
             q.id,
             a.text,
             q.isManyCorrectAnswers,
             q.isManyCorrectAnswers,
            )
           }
          />
          <span>{a.text}</span>
         </label>
        );
       })}
      </div>
     </div>
    ))}

    <button className="submit-button" onClick={handleSubmit}>
     Отправить тест
    </button>
   </div>
  </Container>
 );
};
