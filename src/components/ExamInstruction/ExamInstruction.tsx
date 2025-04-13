import { downloadExam } from "../../utils/download/downloadExam";
import { Instructions } from "../Instructions";

export const ExamInstruction = () => {
 return <Instructions downloadFile={downloadExam} />;
};
