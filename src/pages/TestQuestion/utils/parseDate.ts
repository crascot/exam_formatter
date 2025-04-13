export const parseDate = (input: string): string | null => {
 const months: Record<string, number> = {
  январь: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
 };

 const regex = /(\d{1,2})\s+([а-яА-Я]+)\s+(\d{4}),\s*(\d{1,2}):(\d{2})/i;
 const match = input.match(regex);

 if (!match) return null;

 const [, dayStr, monthStr, yearStr, hourStr, minuteStr] = match;

 const day = parseInt(dayStr, 10);
 const month = months[monthStr.toLowerCase()];
 const year = parseInt(yearStr, 10);
 const hour = parseInt(hourStr, 10);
 const minute = parseInt(minuteStr, 10);

 if (month === undefined) return null;

 return new Date(year, month, day, hour, minute).toISOString();
};
