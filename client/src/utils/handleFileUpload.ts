import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { readerMap } from "./readers/readerMap";
import { Difficulty, ExamType } from "../types/ExamTypes";

export const handleFileUpload = async (
 event: ChangeEvent<HTMLInputElement>,
 setState: Dispatch<SetStateAction<any>>,
 difficulty: Difficulty,
 isTest: boolean = false,
) => {
 const files = Array.from(event.target.files || []);
 if (files.length === 0) return;

 const groupedFiles: Record<string, File[]> = {};
 for (const file of files) {
  if (!readerMap[file.type]) {
   console.warn(`Тип файла не поддерживается: ${file.name} (${file.type})`);
   continue;
  }

  if (!groupedFiles[file.type]) groupedFiles[file.type] = [];
  groupedFiles[file.type].push(file);
 }

 for (const [type, group] of Object.entries(groupedFiles)) {
  const { reader, parser } = readerMap[type];

  const parsedFiles = await reader(group);

  setState((prev: ExamType) => {
   let newQuestions = [...prev.questions];

   for (const fileText of parsedFiles) {
    newQuestions = parser(fileText, difficulty, isTest, newQuestions);
   }

   return {
    ...prev,
    questions: newQuestions,
   };
  });
 }
};
