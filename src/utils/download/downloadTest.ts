import { saveAs } from "file-saver";

export const downloadTest = async () => {
 saveAs("/assets/files/test_example.docx", "шаблон теста.docx");
};
