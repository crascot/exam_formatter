import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FileTypeEnum } from "../types/FileTypeEnum";
import { readDocxFile } from "./readFiles/readDocx";
import { readPdfFile } from "./readFiles/readPdf";
import { readTxtFile } from "./readFiles/readTxt";

// eslint-disable-next-line no-unused-vars
const readerMap: Record<string, (file: File) => Promise<string>> = {
 [FileTypeEnum.DOCX]: readDocxFile,
 [FileTypeEnum.PDF]: readPdfFile,
 [FileTypeEnum.TXT]: readTxtFile,
};

export const handleFileChange = async (
 event: ChangeEvent<HTMLInputElement>,
 setState: Dispatch<SetStateAction<any>>,
 // eslint-disable-next-line no-unused-vars
 parse: (data: string, prev?: any) => any,
) => {
 const files = Array.from(event.target.files || []);

 if (files.length === 0) return;

 const parsedFiles: string[] = [];

 for (const file of files) {
  const reader = readerMap[file.type];
  if (reader) {
   try {
    const text = await reader(file);
    parsedFiles.push(text);
   } catch (err) {
    console.error(`Ошибка чтения файла ${file.name}`, err);
   }
  } else {
   alert(`Неподдерживаемый тип файла: ${file.name}`);
  }
 }

 setState((prev: any) => {
  let result = prev;
  for (const fileText of parsedFiles) {
   result = parse(fileText, result);
  }
  return result;
 });
};
