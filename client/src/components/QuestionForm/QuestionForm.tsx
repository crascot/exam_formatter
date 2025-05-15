import React, { useState } from "react";
import { Answer, DifficultyEnum, Question } from "../../types/ExamTypes";
import "./QuestionForm.less";
import { InputFile } from "../InputFile";

type QuestionFormProps = {
 // eslint-disable-next-line no-unused-vars
 onSubmit: (newQuestion: Question) => void;
};

export const QuestionForm = ({ onSubmit }: QuestionFormProps) => {
 const [questionText, setQuestionText] = useState("");
 const [images, setImages] = useState<string[]>([]);
 const [answers, setAnswers] = useState<Answer[]>([]);

 const handleAddAnswer = () => {
  setAnswers([...answers, { text: "", isCurrect: false }]);
 };

 const handleAnswerChange = (
  index: number,
  key: keyof Answer,
  value: string | boolean,
 ) => {
  const updatedAnswers = [...answers];
  updatedAnswers[index][key] = value as never;
  setAnswers(updatedAnswers);
 };

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  Array.from(files).forEach(file => {
   const reader = new FileReader();
   reader.onloadend = () => {
    if (typeof reader.result === "string") {
     setImages(prev => [...prev, reader.result as string]);
    }
   };
   reader.readAsDataURL(file);
  });
 };

 const handleSubmit = () => {
  if (!questionText || answers.length === 0) return;

  onSubmit({
   question: questionText,
   images,
   answers,
   difficulty: DifficultyEnum.EASY,
  });

  setQuestionText("");
  setImages([]);
  setAnswers([]);
 };

 return (
  <div className="question-form">
   <div className="field">
    <label>Вопрос:</label>
    <input
     type="text"
     value={questionText}
     onChange={e => setQuestionText(e.target.value)}
    />
   </div>

   <div className="field">
    <label className="form-upload-files-label">
     <h5>Загрузить изображение</h5>
     <InputFile
      id="upload-image"
      onChange={e => handleImageUpload(e)}
      accept="image/*"
     />
    </label>
    <div className="image-preview">
     {images.map((img, idx) => (
      <img key={idx} src={img} alt={`img-${idx}`} />
     ))}
    </div>
   </div>

   <div className="field">
    <label>Ответы:</label>
    {answers.map((answer, i) => (
     <div key={i} className="answer-item">
      <input
       type="text"
       value={answer.text}
       onChange={e => handleAnswerChange(i, "text", e.target.value)}
       placeholder={`Ответ ${i + 1}`}
      />
      <label>
       <input
        type="checkbox"
        checked={answer.isCurrect}
        onChange={e => handleAnswerChange(i, "isCurrect", e.target.checked)}
       />
       Правильный
      </label>
     </div>
    ))}
    <button
     className="question-form-add-question"
     type="button"
     onClick={handleAddAnswer}
    >
     Добавить ответ
    </button>
   </div>

   <button type="button" className="submit-button" onClick={handleSubmit}>
    Сохранить вопрос
   </button>
  </div>
 );
};
