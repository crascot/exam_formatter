import axios from "axios";
import { ExamType } from "../models/examTypes";
import { GEMINI_API_KEY } from "../KEYS";

function extractPureJson(text: string): string {
 return text
  .replace(/^```json\s*/i, "")
  .replace(/```$/, "")
  .trim();
}

export async function generateExam(prompt: string): Promise<ExamType> {
 const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

 const body = {
  contents: [
   {
    parts: [{ text: prompt }],
   },
  ],
 };

 const response = await axios.post(url, body);
 const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

 if (!text) throw new Error("Empty response from Gemini");

 try {
  console.log(extractPureJson(text));

  const parsed: ExamType = JSON.parse(extractPureJson(text));
  return parsed;
 } catch (err) {
  throw new Error("Failed to parse Gemini response");
 }
}
