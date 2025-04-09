import {
 Difficulty,
 ExamType,
 TicketConfig,
 Question,
} from "../../../types/ExamTypes";

export const parseExam = (input: string, prev?: ExamType): ExamType => {
 const lines = input
  .split("\n")
  .map(line => line.trim())
  .filter(Boolean);

 let department = prev?.department || "";
 let course = prev?.course || 0;
 let lesson = prev?.lesson || "";
 let config: TicketConfig = prev?.config || {
  Легкий: 0,
  Средний: 0,
  Сложный: 0,
 };

 let difficulty: Difficulty = "Легкий";
 const newQuestions: Question[] = [];

 for (const line of lines) {
  if (!prev?.department && line.startsWith("Кафедра:")) {
   department = line.replace("Кафедра:", "").trim();
  } else if (!prev?.course && line.startsWith("Курс:")) {
   course = parseInt(line.replace("Курс:", "").trim(), 10);
  } else if (!prev?.lesson && line.startsWith("Предмет:")) {
   lesson = line.replace("Предмет:", "").trim();
  } else if (line.startsWith("Конфигурация билета:")) {
   continue;
  } else if (!prev?.config && line.match(/^(Легкий|Средний|Сложный):\s*\d+$/)) {
   const [level, count] = line.split(":").map(s => s.trim());
   config[level as Difficulty] = parseInt(count, 10);
  } else if (line.match(/^\[(Легкий|Средний|Сложный)\]$/)) {
   difficulty = line.replace(/\[|\]/g, "") as Difficulty;
  } else if (line.match(/^\d+\..+/)) {
   newQuestions.push({
    question: line.replace(/^\d+\.\s*/, "").trim(),
    answers: [],
    difficulty,
   });
  } else if (line.startsWith("- ")) {
   if (newQuestions.length > 0) {
    newQuestions[newQuestions.length - 1].answers.push(
     line.replace("- ", "").trim(),
    );
   }
  }
 }

 return {
  department,
  course,
  lesson,
  config,
  questions: [...(prev?.questions || []), ...newQuestions],
 };
};
