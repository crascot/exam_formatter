import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import "./styles/global.less";
import { ExamQuestions } from "./pages/ExamQuestions";
import { TestQuestion } from "./pages/TestQuestion";

const App = () => {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/exam-questions" element={<ExamQuestions />} />
    <Route path="/test-questions" element={<TestQuestion />} />
   </Routes>
  </BrowserRouter>
 );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
