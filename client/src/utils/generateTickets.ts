import { Difficulty, Question, TicketConfig } from "../types/ExamTypes";

const shuffleArray = <T>(array: T[]): T[] => {
 return array
  .map(item => ({ item, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ item }) => item);
};

export const generateTickets = (
 questions: Question[],
 config: TicketConfig,
 count?: number,
): Question[][] => {
 const difficultyLevels: Difficulty[] = ["Легкий", "Средний", "Сложный"];

 const categorizedQuestions: Record<Difficulty, Question[]> = {
  Легкий: [],
  Средний: [],
  Сложный: [],
 };

 const shuffledQuestions = shuffleArray(questions);

 for (const question of shuffledQuestions) {
  categorizedQuestions[question.difficulty].push(question);
 }

 const maxTicketsPerDifficulty = difficultyLevels
  .filter(difficulty => config[difficulty] > 0)
  .map(difficulty => {
   const available = categorizedQuestions[difficulty].length;
   const perTicket = config[difficulty];
   return Math.floor(available / perTicket);
  });

 const totalTickets =
  maxTicketsPerDifficulty.length > 0
   ? Math.max(Math.min(...maxTicketsPerDifficulty), 0)
   : 0;

 const ticketsToGenerate = count ? Math.min(count, totalTickets) : totalTickets;

 const tickets: Question[][] = [];

 for (let i = 0; i < ticketsToGenerate; i++) {
  const ticket: Question[] = [];

  for (const difficulty of difficultyLevels) {
   const perTicket = config[difficulty];

   if (perTicket > 0) {
    ticket.push(...categorizedQuestions[difficulty].splice(0, perTicket));
   }
  }

  tickets.push(ticket);
 }

 return tickets;
};
