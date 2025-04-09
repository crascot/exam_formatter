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
): Question[][] => {
 const categorizedQuestions: Record<Difficulty, Question[]> = {
  Легкий: [],
  Средний: [],
  Сложный: [],
 };

 const shuffleQuestion = shuffleArray(questions);

 shuffleQuestion.forEach(question => {
  categorizedQuestions[question.difficulty].push(question);
 });

 const tickets: Question[][] = [];
 const totalTickets = Math.min(
  ...Object.keys(config).map(key =>
   Math.floor(
    categorizedQuestions[key as Difficulty].length / config[key as Difficulty],
   ),
  ),
 );

 for (let i = 0; i < totalTickets; i++) {
  const ticket: Question[] = [];

  for (const difficulty of Object.keys(config) as Difficulty[]) {
   ticket.push(
    ...categorizedQuestions[difficulty].splice(0, config[difficulty]),
   );
  }

  tickets.push(ticket);
 }

 return tickets;
};
