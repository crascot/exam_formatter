import { Difficulty, Question } from "../../../types/ExamTypes";
import { parseCommon } from "../../parseCommon";

export const parseFromTxt = (
 input: string,
 difficulty: Difficulty,
 isTest = false,
 prev?: Question[],
): Question[] => {
 const lines = input
  .split("\n")
  .map(line => line.trim())
  .filter(Boolean);

 const parsed = parseCommon({ lines }, difficulty, isTest);

 return [...parsed, ...(prev || [])];
};
