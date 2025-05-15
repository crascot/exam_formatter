import { Request, Response, NextFunction } from "express";
import * as examService from "../services/examServices";

export const getExamById = async (
 req: Request,
 res: Response,
 next: NextFunction,
) => {
 try {
  const examId = parseInt(req.params.id, 10);
  const enteredPassword = req.query.password as string;

  const exam = await examService.getExamById(examId);

  if (!exam) {
   res.status(404).json({ error: "Экзамен не найден" });
   return;
  }

  if (exam.password) {
   if (exam.password !== enteredPassword) {
    res.status(403).json({ error: "Пароль неверен" });
    return;
   }
  }

  res.json(exam);
 } catch (error) {
  next(error);
 }
};

export const getExamResults = async (
 req: Request,
 res: Response,
 next: NextFunction,
) => {
 try {
  const results = examService.getExamResults(parseInt(req.params.id, 10));
  res.json(results);
 } catch (error) {
  next(error);
 }
};

export const getExamForStudents = async (
 req: Request,
 res: Response,
 next: NextFunction,
) => {
 try {
  const results = examService.getExamForStudents(parseInt(req.params.id, 10));

  if (!results) {
   res.status(404).json({ error: "Экзамен не найден" });
   return;
  }

  res.json(results);
 } catch (error) {
  next(error);
 }
};

export const createExam = async (
 req: Request,
 res: Response,
 next: NextFunction,
) => {
 try {
  const examId = examService.createExam(req.body);
  res.status(201).json({
   message: "Экзамен успешно создан",
   adminUrl: `/teacher-results/${examId}`,
   examUrl: `/test-submit/${examId}`,
  });
 } catch (error) {
  next(error);
 }
};

export const submitExamAnswers = async (
 req: Request,
 res: Response,
 next: NextFunction,
) => {
 try {
  const { id } = req.params;
  const { studentName, answers } = req.body;

  const result = examService.submitExamAnswers({
   examId: parseInt(id, 10),
   studentName,
   answers,
  });
  res.status(201).json(result);
 } catch (error) {
  next(error);
 }
};
