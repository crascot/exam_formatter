import { Request, Response } from "express";
import { generateExamPrompt } from "../prompts/generateExamPrompt";
import { generateExam } from "../services/gemini.service";

export async function getGeneratedExam(req: Request, res: Response) {
 const { lesson, course, config } = req.body;

 const prompt = generateExamPrompt({ lesson, course, config });

 try {
  const exam = await generateExam(prompt);
  res.json(exam);
 } catch (error: any) {
  res.status(500).json({ error: error.message || "Internal Server Error" });
 }
}
