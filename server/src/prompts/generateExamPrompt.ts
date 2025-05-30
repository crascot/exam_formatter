export const generateExamPrompt = ({
 subject,
 difficulty,
 details,
}: {
 subject: string;
 details: string;
 difficulty: { [key: string]: number };
}) => {
 const difficultyEntries = Object.entries(difficulty)
  .map(([level, count]) => `- ${level}: ${count}`)
  .join("\n");

 return `
  Ты — генератор экзаменационных вопросов.
  
  На вход:
  - Предмет: "${subject}"
  - Количество вопросов по уровням сложности:
  ${difficultyEntries}

  - Больше информации: "${details}"
  
  Сгенерируй только **массив JSON-объектов**. Каждый элемент должен быть объектом следующего вида:
  
  {
    "images": [],
    "question": "Тут вопрос",
    "answers": [],
    "difficulty": "Легкий" // или "Средний", "Сложный"
  }
  
  Не добавляй текст до или после. Не используй блоки \`\`\`json. Ответ должен быть валидным JSON-массивом.
  `.trim();
};
