import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";

export const getQuizByCardId = async (req, res) => {
  try {
    const { cardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ message: "Invalid cardId" });
    }

    const objectId = new mongoose.Types.ObjectId(cardId);

    const quiz = await Quiz.findOne({ cardId: objectId });

    if (!quiz) {
      console.log("❌ Quiz not found for cardId:", objectId);
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (err) {
    console.error("⚠️ Error in getQuizByCardId:", err);
    res.status(500).json({ message: err.message });
  }
};


export const createQuiz = async (req, res) => {
  try {
    const { cardId, question, options, correctAnswer, explanation } = req.body;
    const newQuiz = new Quiz({ cardId, question, options, correctAnswer, explanation });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
