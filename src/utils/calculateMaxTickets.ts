import { Difficulty, Question, TicketConfig } from "../types/ExamTypes";

export const calculateMaxTickets = (
 questions: Question[],
 config: TicketConfig,
): number => {
 const difficultyLevels: Difficulty[] = ["Легкий", "Средний", "Сложный"];

 const difficultyCounts: Record<Difficulty, number> = {
  Легкий: 0,
  Средний: 0,
  Сложный: 0,
 };

 for (const q of questions) {
  difficultyCounts[q.difficulty]++;
 }

 const ticketCountsPerLevel = difficultyLevels.map(level => {
  const questionsAvailable = difficultyCounts[level];
  const questionsPerTicket = config[level];

  if (!questionsPerTicket || questionsPerTicket <= 0) return Infinity;

  return Math.floor(questionsAvailable / questionsPerTicket);
 });

 return Math.max(Math.min(...ticketCountsPerLevel), 0);
};
