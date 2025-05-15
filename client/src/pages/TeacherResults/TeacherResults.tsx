import { useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { useState } from "react";
import { getTestResults } from "../../api/getTestResults";
import "./TeacherResults.less";
import { getTestInfo } from "../../api/getTestInfo";
import { Modal } from "../../components/Modal/Modal";
import { ExamType } from "../../types/ExamTypes";
import { CountdownTimer } from "../../components/CountdownTimer";
import { ResultsList } from "../../components/ResultsList";
import { UserResult } from "../../types/UserResult";

export const TeacherResults = () => {
 const { id } = useParams();
 const [examData, setExamData] = useState<ExamType | null>(null);
 const [studentResults, setStudentResult] = useState<UserResult[]>([]);
 const [modal, setModal] = useState(true);
 const [password, setPassword] = useState("");

 const getTestInfoFunc = () => {
  if (password.length === 0) {
   alert("Введите пароль");
   return;
  }

  getTestInfo(Number(id), password)
   .then(res => {
    setExamData(res);
   })
   .then(() => {
    getTestResults(Number(id)).then(res => {
     setStudentResult(res);
    });
   })
   .then(() => {
    setModal(false);
   })
   .catch(err => {
    alert(err);
   });
 };

 return (
  <>
   {modal && (
    <Modal>
     <div className="teacher-results-modal">
      <label className="form-label">
       <h5>Введите пароль</h5>
       <input
        placeholder="Ваше имя"
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
       />
      </label>
      <button onClick={getTestInfoFunc}>Подтвердить</button>
     </div>
    </Modal>
   )}
   <Container>
    <div className="teacher-results">
     {examData?.endAt && <CountdownTimer endAt={examData.endAt} />}
     {studentResults && <ResultsList responses={studentResults} />}
    </div>
   </Container>
  </>
 );
};
