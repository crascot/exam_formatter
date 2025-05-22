import { Container } from "../../components/Container";
import "./Main.less";

export const Main = () => {
 return (
  <Container>
   <div className="main">
    <div className="main-welcome">
     <h1>Добро пожаловать в ExamFormatter!</h1>

     <p>
      <strong>ExamFormatter</strong> — это удобное приложение для автоматической
      конвертации вопросов из
      <strong> Word-файлов</strong> в структурированные экзаменационные
      титульники и тесты для студентов. Просто загрузите документ, и программа
      самостоятельно извлечет вопросы, организует их в удобный формат и
      подготовит тест.
     </p>
    </div>

    <div className="main-possibilities">
     <h2>Наши возможности:</h2>
     <ul>
      <li>✅ Автоматическое извлечение вопросов из Word</li>
      <li>✅ Поддержка различных типов вопросов</li>
      <li>✅ Генерация готовых тестов для студентов</li>
      <li>✅ Экспорт результатов в удобные форматы</li>
      <li>✅ Создание онлайн тестов</li>
     </ul>
    </div>

    <p className="main-start">
     <strong>Начните уже сейчас – просто загрузите ваш файл!</strong>
    </p>
   </div>
  </Container>
 );
};
