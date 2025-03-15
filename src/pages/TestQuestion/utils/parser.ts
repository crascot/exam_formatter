import { Question } from "../types/questionTipe";

export const parseTest = (input: string): Question[] => {
 const sections = input
  .split("---")
  .map(section => section.trim())
  .filter(section => section.length > 0);

 const questions: Question[] = [];

 for (let i = 0; i < sections.length; i += 2) {
  const questionText = sections[i];
  const answers = sections[i + 1]
   .split("\n")
   .map(answer => answer.trim())
   .filter(answer => answer.length > 0);

  questions.push({ text: questionText, answers });
 }

 return questions;
};
