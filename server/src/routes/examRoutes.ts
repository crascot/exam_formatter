import { Router } from "express";
import * as examController from "../controllers/examControllers";

const router = Router();

router.get("/exams/:id", examController.getExamById);
router.get("/exams/:id/results", examController.getExamResults);
router.get("/exams/:id/for-students", examController.getExamForStudents);
router.post("/exams", examController.createExam);
router.post("/exams/:id/submit", examController.submitExamAnswers);

export default router;
