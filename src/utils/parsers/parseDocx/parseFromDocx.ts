import { Difficulty, Question } from "../../../types/ExamTypes";
import { ParsedItem } from "../../../types/parsedItem";
import { parseCommon } from "../../parseCommon";
import { parseHtmlToSequence } from "./utils/parseHtmlToSequence";

export const parseFromDocx = (
 html: string,
 difficulty: Difficulty,
 prev?: Question[],
): Question[] => {
 const sequence: ParsedItem[] = parseHtmlToSequence(html);
 const parsed = parseCommon({ sequence, isSequence: true }, difficulty);

 return [...parsed, ...(prev || [])];
};
