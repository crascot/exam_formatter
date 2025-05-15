export type Difficulty = "Легкий" | "Средний" | "Сложный";

export enum DifficultyEnum {
 // eslint-disable-next-line no-unused-vars
 EASY = "Легкий",
 // eslint-disable-next-line no-unused-vars
 MIDDLE = "Средний",
 // eslint-disable-next-line no-unused-vars
 HARD = "Сложный",
}

export type ExamType = {
 department: string;
 course: number;
 lesson: string;
 questions: Question[];
 config: TicketConfig;
 startAt: string | null;
 endAt: string | null;
 name?: string;
 password?: string;
};

export type Question = {
 images: string[];
 question: string;
 answers: Answer[];
 difficulty: Difficulty;
};

export type Answer = {
 text: string;
 isCurrect: boolean;
};

export type TicketConfig = {
 // eslint-disable-next-line no-unused-vars
 [key in Difficulty]: number;
};
