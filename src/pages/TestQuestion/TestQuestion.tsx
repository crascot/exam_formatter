import { ChangeEvent, useState } from "react";
import "./TestQuestion.less";
import { Container } from "../../components/Container";
import { InputFile } from "../../components/InputFile";
import { handleFileChange } from "../../utils/handleFileChange";
import { parseTest } from "./utils/parser";

type Question = {
 text: string;
 answers: string[];
};

export const TestQuestion = () => {
 const [questions, setQuestions] = useState<Question[]>([]);

 const inputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  handleFileChange(e, setQuestions, parseTest);
 };

 return (
  <Container>
   <div className="test-question">
    <h1>Загрузите файл с тестами</h1>
    <InputFile onChange={inputFileOnChange} />

    {questions.length ? (
     <div>
      {questions.map((question: Question, index) => (
       <div key={index}>
        <h3>{question.text}</h3>
        <ul>
         {question.answers.map((answer: string, anserIndex) => (
          <p key={anserIndex}>{answer}</p>
         ))}
        </ul>
       </div>
      ))}
     </div>
    ) : (
     ""
    )}
   </div>
  </Container>
 );
};
