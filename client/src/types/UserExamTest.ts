export type UserExamTest = {
 exam: {
  id: number;
  department: string;
  course: number;
  lesson: string;
  startAt: string;
  endAt: string;
  name: string;
 };
 questions: UserExamTestQuestion[];
};

type UserExamTestQuestion = {
 id: number;
 question: string;
 answers: UserExamTestAnswer[];
 isManyCorrectAnswers: boolean;
 images: string[];
};

type UserExamTestAnswer = {
 id: number;
 text: string;
 isCurrect: number;
};
