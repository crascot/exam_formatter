import { parseCommonLines } from "../../../utils/parseCommon";
import { TestType } from "../types/TestTypes";
import { parseDate } from "./parseDate";

export const parseTest = (
 input: string,
 prev?: Partial<TestType>,
): TestType | null => {
 const lines = input
  .split("\n")
  .map(line => line.trim())
  .filter(Boolean);

 const parsed = parseCommonLines(lines, prev);

 let createdAt = prev?.createdAt || "";
 let startTime: string | null = prev?.startTime || null;
 let endTime: string | null = prev?.endTime || null;

 for (const line of lines) {
  if (!startTime && line.startsWith("Начало теста:")) {
   startTime = parseDate(line.replace("Начало теста:", "").trim());
  } else if (!endTime && line.startsWith("Окончание теста:")) {
   endTime = parseDate(line.replace("Окончание теста:", "").trim());
  }
 }

 if (!startTime) startTime = createdAt;

 const errors: string[] = [];
 if (!parsed.department) errors.push("Кафедра");
 if (!parsed.course) errors.push("Курс");
 if (!parsed.lesson) errors.push("Предмет");
 if (!startTime) errors.push("Начало теста");
 if (!endTime) errors.push("Окончание теста");
 if (errors.length > 0) {
  alert("Не удалось разобрать поля: " + errors.join(", "));
  return null;
 }

 return {
  department: parsed.department,
  course: parsed.course,
  lesson: parsed.lesson,
  config: parsed.config,
  questions: [...(prev?.questions || []), ...parsed.questions],
  createdAt,
  startTime,
  endTime: endTime ?? createdAt,
 };
};
