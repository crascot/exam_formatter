import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import "./styles/global.less";
import { ExamQuestions } from "./pages/ExamQuestions";
import { TestQuestion } from "./pages/TestQuestion";
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc =
 "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

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
