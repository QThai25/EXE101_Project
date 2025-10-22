import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cardRoutes from "./routes/cards.js";
import userCardRoutes from "./routes/userCards.js";
import uploadRoutes from "./routes/upload.js";
import quizRoutes from "./routes/quiz.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/users", userCardRoutes);
app.use("/api", uploadRoutes);
app.use("/api/quizzes", quizRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy trên port ${PORT}`));
