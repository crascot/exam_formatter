import { UserResult } from "../types/UserResult";

export const getTestResults = async (id: number): Promise<UserResult[]> => {
 const res = await fetch(`http://localhost:3000/api/exams/${id}/results`, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });

 if (!res.ok) throw new Error("Ошибка запроса");

 return res.json();
};
