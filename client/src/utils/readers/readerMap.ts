import { Difficulty, Question } from "../../types/ExamTypes";
import { FileTypeEnum } from "../../types/FileTypeEnum";
import { docToDocx } from "../docToDocx";
import { parseFromDocx } from "../parsers/parseDocx/parseFromDocx";
import { parseFromTxt } from "../parsers/parseTxt/parseFromTxt";
import { pdfToDocx } from "../pdfToDocx";
import { readDocxFiles } from "./readDocx";
import { readTxtFiles } from "./readTxt";

type ReaderMapType = {
 // eslint-disable-next-line no-unused-vars
 reader: (files: File[]) => Promise<string[]>;
 parser: (
  // eslint-disable-next-line no-unused-vars
  lines: string,
  // eslint-disable-next-line no-unused-vars
  difficulty: Difficulty,
  // eslint-disable-next-line no-unused-vars
  prev?: Question[],
 ) => Question[];
};

export const readerMap: Record<string, ReaderMapType> = {
 [FileTypeEnum.DOCX]: { reader: readDocxFiles, parser: parseFromDocx },
 [FileTypeEnum.PDF]: { reader: pdfToDocx, parser: parseFromDocx },
 [FileTypeEnum.DOC]: { reader: docToDocx, parser: parseFromDocx },
 [FileTypeEnum.TXT]: { reader: readTxtFiles, parser: parseFromTxt },
};
