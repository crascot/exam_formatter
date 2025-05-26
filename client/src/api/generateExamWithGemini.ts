import { LinkResponse } from "../types/ExamResponse";

export const generateExamWithGemini = async ({
 lesson,
 course,
 config,
}: {
 lesson: string;
 course: number;
 config: { [key: string]: number };
}): Promise<LinkResponse> => {
 const res = await fetch(`http://localhost:3000/gemini-api/generate-exam`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({ lesson, course, config }),
 });

 if (!res.ok) throw new Error("Ошибка запроса");

 return res.json();
};
