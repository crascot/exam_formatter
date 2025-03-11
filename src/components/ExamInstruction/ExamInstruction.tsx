import { Instructions } from "../Instructions";
import "./ExamInstruction.less";

export const ExamInstruction = () => {
 const modal = () => (
  <div className="exam-instruction">
   <h3>Создайте word файл и добавьте ваши вопросы как показанно ниже.</h3>
   <img src="/assets/images/instruction-exam.jpg" alt="instruction-exam" />
   <h3>
    Затем нажмите на кнопку <span>Загрузить файл</span> и выберите ваш файл.
   </h3>
   <h3>Максимально 40 вопросов.</h3>
  </div>
 );

 return <Instructions modalComponent={modal()} />;
};
