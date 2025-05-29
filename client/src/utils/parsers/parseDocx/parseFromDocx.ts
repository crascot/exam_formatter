import { Difficulty, Question } from "../../../types/ExamTypes";
import { ParsedItem } from "../../../types/parsedItem";
import { parseCommon } from "../../parseCommon";
import { parseHtmlToSequence } from "./utils/parseHtmlToSequence";

export const parseFromDocx = (
 html: string,
 difficulty: Difficulty,
 isTest = false,
 prev?: Question[],
): Question[] => {
 const sequence: ParsedItem[] = parseHtmlToSequence(html);
 const parsed = parseCommon({ sequence, isSequence: true }, difficulty, isTest);

 return [...parsed, ...(prev || [])];
};
