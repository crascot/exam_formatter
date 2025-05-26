export const generateExamPrompt = ({
 lesson,
 course,
 config,
}: {
 lesson: string;
 course: number;
 config: { [key: string]: number };
}) => {
 const difficultyEntries = Object.entries(config)
  .map(([level, count]) => `- ${level}: ${count}`)
  .join("\n");

 return `
  Ты — генератор экзаменационных вопросов.
  
  На вход:
  - Предмет: "${lesson}"
  - Курс: ${course}
  - Количество вопросов по уровням сложности:
  ${difficultyEntries}
  
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
