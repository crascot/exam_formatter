import { UserExamTest } from "../types/UserExamTest";

export const getTestForUser = async (id: number): Promise<UserExamTest> => {
 const res = await fetch(`http://localhost:3000/api/exams/${id}/for-students`);

 if (!res.ok) throw new Error("Ошибка запроса");

 return res.json();
};
