import { Router } from "express";
import { getGeneratedExam } from "../controllers/gemini.controller";

const geminiRouter = Router();

geminiRouter.post("/generate-exam", getGeneratedExam);

export default geminiRouter;
