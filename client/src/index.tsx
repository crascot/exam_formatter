import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import "./styles/global.less";
import { ExamQuestions } from "./pages/ExamQuestions";
import { TestQuestion } from "./pages/TestQuestion";
import { TeacherResults } from "./pages/TeacherResults";
import { PageConsts } from "./page-consts";
import { TestSubmit } from "./pages/TestSubmit";
import { TestFinish } from "./pages/TestFinish";

const App = () => {
 return (
  <BrowserRouter>
   <Routes>
    <Route path={PageConsts.MAIN} element={<Main />} />
    <Route path={PageConsts.EXAM_QUESTIONS} element={<ExamQuestions />} />
    <Route path={PageConsts.TEST_QUESTION} element={<TestQuestion />} />
    <Route path={PageConsts.TEACHER_RESULTS} element={<TeacherResults />} />
    <Route path={PageConsts.TEST_SUBMIT} element={<TestSubmit />} />
    <Route path={PageConsts.TEST_FINISH} element={<TestFinish />} />
   </Routes>
  </BrowserRouter>
 );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
