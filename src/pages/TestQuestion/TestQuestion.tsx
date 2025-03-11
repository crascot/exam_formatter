import mammoth from "mammoth";
import { ChangeEvent, useState } from "react";

interface Question {
 id: number;
 text: string;
 answers: string[];
 type?: "choice" | "input";
 hasInput: boolean;
}

export const TestQuestion = () => {
 const [questions, setQuestions] = useState<Question[]>([]);
 const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

 const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async e => {
   const arrayBuffer = e.target?.result as ArrayBuffer;
   const text = await extractTextFromDocx(arrayBuffer);
   const parsedQuestions = parseQuestions(text);
   setQuestions(parsedQuestions);
  };
  reader.readAsArrayBuffer(file);
 };

 const extractTextFromDocx = async (
  arrayBuffer: ArrayBuffer,
 ): Promise<string> => {
  return mammoth.extractRawText({ arrayBuffer }).then(result => result.value);
 };

 const parseQuestions = (text: string): Question[] => {
  const lines = text
   .split("\n")
   .map(line => line.trim())
   .filter(line => line !== "");
  const questions: Question[] = [];
  let currentQuestion: Question | null = null;

  lines.forEach(line => {
   const questionMatch = line.match(/^(\d+|\w)\.\s(.+?)$/); // "1. Вопрос" или "a) Вопрос"
   const answerMatch = line.match(/^([a-zA-Z])\)\s(.+)$/); // "a) Ответ"

   if (questionMatch) {
    if (currentQuestion) {
     questions.push(currentQuestion);
    }
    currentQuestion = {
     id: questions.length + 1,
     text: questionMatch[2],
     answers: [],
     hasInput: false,
    };
   } else if (answerMatch && currentQuestion) {
    currentQuestion.answers.push(answerMatch[2]);
   } else if (
    currentQuestion &&
    (line.toLowerCase().includes("ваш ответ") ||
     line.toLowerCase().includes("введите ответ"))
   ) {
    currentQuestion.hasInput = true;
   }
  });

  if (currentQuestion) {
   questions.push(currentQuestion);
  }

  return questions;
 };

 const handleAnswerChange = (questionId: number, answer: string) => {
  setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
 };

 return (
  <div className="container">
   <h2>Загрузите файл с тестами</h2>
   <input type="file" accept=".docx" onChange={handleFileUpload} />

   {questions.length > 0 && (
    <div>
     <h3>Тест</h3>
     {questions.map(q => (
      <div key={q.id} style={{ marginBottom: "20px" }}>
       <h4>
        {q.id}. {q.text}
       </h4>
       {q.answers.map((answer, index) => (
        <label key={index} style={{ display: "block" }}>
         <input
          type="radio"
          name={`question-${q.id}`}
          value={answer}
          checked={userAnswers[q.id] === answer}
          onChange={() => handleAnswerChange(q.id, answer)}
         />
         {answer}
        </label>
       ))}
       {q.hasInput && (
        <input
         type="text"
         placeholder="Введите ваш ответ"
         value={userAnswers[q.id] || ""}
         onChange={e => handleAnswerChange(q.id, e.target.value)}
        />
       )}
      </div>
     ))}
    </div>
   )}
  </div>
 );
};
