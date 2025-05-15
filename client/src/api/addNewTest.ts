import { LinkResponse } from "../types/ExamResponse";
import { ExamType } from "../types/ExamTypes";

export const addNewTests = async ({
 content,
}: {
 content: ExamType;
}): Promise<LinkResponse> => {
 const res = await fetch("http://localhost:3000/api/exams/", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(content),
 });

 if (!res.ok) throw new Error("Ошибка запроса");

 return res.json();
};
