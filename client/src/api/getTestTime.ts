type Time = {
 startAt: string;
 endAt: string;
};

export const getTestTime = async (id: number): Promise<Time> => {
 const res = await fetch(`http://localhost:3000/api/exams/${id}/time`, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });

 if (!res.ok) throw new Error("Ошибка запроса");

 return res.json();
};
