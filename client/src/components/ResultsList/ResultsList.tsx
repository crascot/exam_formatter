import { UserResult } from "../../types/UserResult";
import "./ResultsList.less";

type ResultsListType = {
 responses: UserResult[];
};

export const ResultsList = ({ responses }: ResultsListType) => {
 return (
  <div className="results">
   <h1 className="results__title">Результаты студентов</h1>
   {responses.map((response, index) => {
    const correctCount = response.answers.filter(a => a.isCorrect).length;
    const total = response.answers.length;

    return (
     <div key={index} className="results__card">
      <h2 className="results__name">{response.studentName}</h2>
      <p className="results__time">
       Сдано: {new Date(response.submittedAt).toLocaleString()}
      </p>
      <ul className="results__answers">
       {response.answers.map((answer, i) => (
        <li
         key={i}
         className={`results__answer ${answer.isCorrect ? "results__answer--correct" : "results__answer--wrong"}`}
        >
         <div>
          <strong>Вопрос:</strong> {answer.question}
         </div>
         <div>
          <strong>Ответ:</strong> {answer.userAnswers.map(text => text)}
         </div>
         <span className="results__tag">
          {answer.isCorrect ? "✅ Верно" : "❌ Неверно"}
         </span>
        </li>
       ))}
      </ul>
      <div className="results__summary">
       Итог: {correctCount} из {total} правильных
      </div>
      <div className="results__summary">Баллов: {correctCount}</div>
     </div>
    );
   })}
  </div>
 );
};
