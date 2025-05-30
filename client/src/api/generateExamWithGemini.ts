import { Question } from "../types/ExamTypes";
import { GenerateExamType } from "../types/generateExam";

export const generateExamWithGemini = async ({
 content,
 forTest = false,
}: {
 content: GenerateExamType;
 forTest?: boolean;
}): Promise<Question[]> => {
 const res = await fetch(
  `http://localhost:3000/gemini-api/${forTest ? "generate-test" : "generate-exam"}`,
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(content),
  },
 );

 if (!res.ok) throw new Error("Ошибка запроса");

 return res.json();
};
