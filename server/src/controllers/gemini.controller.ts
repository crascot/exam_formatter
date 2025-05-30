import { Request, Response } from "express";
import { generateExamPrompt } from "../prompts/generateExamPrompt";
import { generateExam } from "../services/gemini.service";
import { generateTestPrompt } from "../prompts/generateTestPrompt";

export async function getGeneratedExam(req: Request, res: Response) {
 const content = req.body as {
  subject: string;
  details: string;
  difficulty: { [key: string]: number };
 };

 const prompt = generateExamPrompt(content);

 try {
  const exam = await generateExam(prompt);
  res.json(exam);
 } catch (error: any) {
  res.status(500).json({ error: error.message || "Internal Server Error" });
 }
}

export async function getGeneratedTest(req: Request, res: Response) {
 const content = req.body as {
  subject: string;
  details: string;
  difficulty: { [key: string]: number };
 };

 const prompt = generateTestPrompt(content);

 try {
  const exam = await generateExam(prompt);
  res.json(exam);
 } catch (error: any) {
  res.status(500).json({ error: error.message || "Internal Server Error" });
 }
}
