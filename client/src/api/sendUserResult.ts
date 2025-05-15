import { LinkResponse } from "../types/ExamResponse";
import { UserSubmit } from "../types/UserSubmit";

export const sendUserResult = async ({
 id,
 content,
}: {
 id: number;
 content: UserSubmit;
}): Promise<LinkResponse> => {
 const res = await fetch(`http://localhost:3000/api/exams/${id}/submit`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(content),
 });

 if (!res.ok) throw new Error("Ошибка запроса");

 return res.json();
};
