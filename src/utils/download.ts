import { saveAs } from "file-saver";

export const downloadFile = async () => {
 saveAs("/assets/files/example.docx", "example.docx");
};
