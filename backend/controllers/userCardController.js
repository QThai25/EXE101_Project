import UserCard from '../models/UserCard.js';
import Card from '../models/Card.js';

export const getUserCards = async (req, res) => {
  try {
    const userCards = await UserCard.find({ userId: req.params.id }).populate('cardId');
    res.json(userCards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

export const addUserCard = async (req, res) => {
  try {
    console.log("🧠 req.params.id:", req.params.id);
    console.log("📦 req.body:", req.body);

    const { cardId } = req.body;
    const userCard = new UserCard({
      userId: req.params.id,
      cardId,
      source: 'admin_add',
    });
    const saved = await userCard.save();
    console.log("✅ Saved:", saved);

    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};


export const scanCard = async (req, res) => {
  try {
    const { code } = req.body;
    const card = await Card.findOne({ code });
    if (!card)
      return res.status(404).json({ message: 'Thẻ không tồn tại' });

    const existing = await UserCard.findOne({
      userId: req.user.id,
      cardId: card._id,
    });
    if (existing)
      return res.status(400).json({ message: 'Bạn đã có thẻ này' });

    const userCard = new UserCard({
      userId: req.user.id,
      cardId: card._id,
      source: 'scan',
    });
    await userCard.save();

    res.json({
      message: `Đã thêm thẻ ${card.title} vào bộ sưu tập của bạn!`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
