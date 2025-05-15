import { AnswerRow } from "./dbTypes";

export type ExamType = {
 department: string;
 course: number;
 lesson: string;
 questions: Question[];
 startAt: string | null;
 endAt: string | null;
 name: string;
 password: string;
};

export type Question = {
 images: string[];
 question: string;
 answers: Answer[];
};

export type Answer = {
 text: string;
 isCurrect: boolean;
};

export type StudentExamPayload = {
 exam: StudentExamMeta;
 questions: StudentQuestion[];
};

export type StudentExamMeta = {
 id: number;
 department: string;
 course: number;
 lesson: string;
 startAt: string;
 endAt: string;
 name: string;
};

export type StudentQuestion = {
 id: number;
 question: string;
 answers: AnswerRow[];
 isManyCorrectAnswers: boolean;
 images: string[];
};

export type StudentResult = {
 examId: number;
 studentName: string;
 answers: StudentAnswer[];
};

export type StudentAnswer = { questionId: number; answerText: string };
