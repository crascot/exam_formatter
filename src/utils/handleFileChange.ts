import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FileTypeEnum } from "../types/FileTypeEnum";
import { readDocxFile } from "./readFiles/readDocx";
import { readPdfFile } from "./readFiles/readPdf";
import { readTxtFile } from "./readFiles/readTxt";

export const handleFileChange = async (
 event: ChangeEvent<HTMLInputElement>,
 setState: Dispatch<SetStateAction<any>>,
 // eslint-disable-next-line no-unused-vars
 parse: (data: any) => void,
) => {
 const file = event.target.files?.[0];
 if (file) {
  if (file.type === FileTypeEnum.DOCX) {
   readDocxFile(file).then(data => {
    setState(parse(data));
   });
  } else if (file.type === FileTypeEnum.PDF) {
   readPdfFile(file).then(data => {
    setState(parse(data));
   });
  } else if (file.type === FileTypeEnum.TXT) {
   readTxtFile(file).then(data => {
    setState(parse(data));
   });
  } else {
   alert("Неподдерживаемый файл");
  }
 }
};
