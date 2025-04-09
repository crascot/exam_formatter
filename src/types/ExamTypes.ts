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
};

export type Question = {
 question: string;
 answers: string[];
 difficulty: Difficulty;
};

export type TicketConfig = {
 // eslint-disable-next-line no-unused-vars
 [key in Difficulty]: number;
};
