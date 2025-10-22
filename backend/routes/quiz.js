import express from "express";
import { getQuizByCardId, createQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:cardId", getQuizByCardId);

router.post("/", createQuiz);

export default router;
