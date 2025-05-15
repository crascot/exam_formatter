import { ExamType } from "../types/ExamTypes";

export const getTestInfo = async (
 id: number,
 password: string,
): Promise<ExamType> => {
 const res = await fetch(
  `http://localhost:3000/api/exams/${id}?password=${encodeURIComponent(password)}`,
 );

 if (!res.ok) throw new Error("Пароль неверен");

 return res.json();
};
