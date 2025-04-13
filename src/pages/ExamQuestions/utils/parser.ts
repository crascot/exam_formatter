import { ExamType } from "../../../types/ExamTypes";
import { parseCommonLines } from "../../../utils/parseCommon";

export const parseExam = (input: string, prev?: ExamType): ExamType => {
 const lines = input
  .split("\n")
  .map(line => line.trim())
  .filter(Boolean);

 const parsed = parseCommonLines(lines, prev);

 return {
  department: parsed.department,
  course: parsed.course,
  lesson: parsed.lesson,
  config: parsed.config,
  questions: [...(prev?.questions || []), ...parsed.questions],
 };
};
