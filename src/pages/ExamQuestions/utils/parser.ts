import { Difficulty, ExamType, Question } from "../../../types/ExamTypes";

export const parseExam = (input: string): ExamType => {
 const lines = input
  .split("\n")
  .map(line => line.trim())
  .filter(Boolean);

 let department = "";
 let ticketNumber = 0;
 let course = 0;
 let lesson = "";
 let difficulty: Difficulty = "Легкий";
 const questions: Question[] = [];

 for (const line of lines) {
  if (line.startsWith("Кафедра:")) {
   department = line.replace("Кафедра:", "").trim();
  } else if (line.startsWith("Курс")) {
   course = parseInt(line.replace("Курс:", "").trim(), 10);
  } else if (line.startsWith("Номер билета:")) {
   ticketNumber = parseInt(line.replace("Номер билета:", "").trim(), 10);
  } else if (line.startsWith("Предмет:")) {
   lesson = line.replace("Предмет:", "").trim();
  } else if (line.match(/^\[(Легкий|Средний|Сложный)\]$/)) {
   difficulty = line.replace(/\[|\]/g, "") as Difficulty;
  } else if (line.match(/^\d+\..+/)) {
   questions.push({
    question: line.replace(/^\d+\.\s*/, "").trim(),
    answers: [],
    difficulty,
   });
  } else if (line.startsWith("- ")) {
   if (questions.length > 0) {
    questions[questions.length - 1].answers.push(line.replace("- ", "").trim());
   }
  }
 }

 const result = { department, lesson, ticketNumber, course, questions };

 return result;
};
