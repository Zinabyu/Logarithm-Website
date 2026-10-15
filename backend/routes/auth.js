import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import User from "../models/User.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts, try again later" },
});

// hash وهمي عشان وقت الرد يبقى متقارب سواء الإيميل موجود أو لأ
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    const ok = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
    if (!user || !ok) return res.status(401).json({ message: "Wrong email or password" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/change-password", requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (typeof currentPassword !== "string" || typeof newPassword !== "string" || newPassword.length < 10) {
      return res.status(400).json({ message: "New password must be at least 10 characters" });
    }

    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      return res.status(401).json({ message: "Current password is wrong" });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    next(err);
  }
});

export default router;
