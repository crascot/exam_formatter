import { saveAs } from "file-saver";

export const downloadExam = async () => {
 saveAs("/assets/files/exam_example.docx", "шаблон экзамена.docx");
};
