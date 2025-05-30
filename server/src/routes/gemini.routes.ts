import { Router } from "express";
import {
 getGeneratedExam,
 getGeneratedTest,
} from "../controllers/gemini.controller";

const geminiRouter = Router();

geminiRouter.post("/generate-exam", getGeneratedExam);
geminiRouter.post("/generate-test", getGeneratedTest);

export default geminiRouter;
