export type Difficulty = "Легкий" | "Средний" | "Сложный";

export type ExamType = {
 department: string;
 course: number;
 lesson: string;
 questions: Question[];
};

export type Question = {
 question: string;
 answers: string[];
 difficulty: Difficulty;
};
