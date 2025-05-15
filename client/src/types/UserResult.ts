export type UserResult = {
 studentName: string;
 submittedAt: string;
 answers: UserResultAnswer[];
};

type UserResultAnswer = {
 question: string;
 userAnswers: string[];
 isCorrect: boolean;
};
