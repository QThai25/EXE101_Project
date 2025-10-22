import express from "express";
import * as userCardController from "../controllers/userCardController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id/cards", userCardController.getUserCards); // View user's collection
router.post("/:id/cards", authMiddleware, adminMiddleware, userCardController.addUserCard); // Add by admin
router.post("/scan", authMiddleware, userCardController.scanCard); // Scan QR (user)

export default router;
