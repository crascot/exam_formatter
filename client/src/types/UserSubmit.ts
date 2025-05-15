export type UserSubmit = {
 studentName: string;
 submittedAt: string;
 answers: UserSubmitAnswer[];
};

export type UserSubmitAnswer = { questionId: number; answerText: string };
