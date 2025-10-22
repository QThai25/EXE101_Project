import mongoose from "mongoose";

const userCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
  acquiredAt: { type: Date, default: Date.now },
  source: { type: String, enum: ["scan", "admin_add"], required: true },
});

const UserCard = mongoose.model("UserCard", userCardSchema);
export default UserCard;
