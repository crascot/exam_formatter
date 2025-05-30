export const generateTestPrompt = ({
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
     Ты — генератор вопросов для онлайн теста.
     
     На вход:
     - Предмет: "${subject}"
     - Количество вопросов: ${difficultyEntries}
   
     - Больше информации: "${details}"
     
     Сгенерируй только **массив JSON-объектов**. Каждый элемент должен быть объектом следующего вида:
     
     {
       "images": [],
       "question": "Тут вопрос",
       "answers": AnswerType[],
       "difficulty": "Легкий"
     }

     Вот тип AnswerType:
     {
        "text": string;
        "isCurrect": boolean; 
     }

     Если не указали количество ответов для вопроса, то указывай от 2 до 6 ответов.
     Если не указали сколько правильный ответов может быть, то указывай как минимум 1 правильный ответ.
     Вопросы не должны повторяться.
     Ответы в одном вопросе не должны повторяться.

     Не добавляй текст до или после. Не используй блоки \`\`\`json. Ответ должен быть валидным JSON-массивом.
     `.trim();
};
