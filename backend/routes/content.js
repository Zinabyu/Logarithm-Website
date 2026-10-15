import { Router } from "express";
import Content, { KEYS } from "../models/Content.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const str = (v) => (typeof v === "string" ? v.trim() : "");

// كل المحتوى مرة واحدة: { about: { data, seo }, site: { data, seo }, ... }
router.get("/", async (_req, res, next) => {
  try {
    const docs = await Content.find({}, "key data seo updatedAt").lean();
    res.json(Object.fromEntries(docs.map((d) => [d.key, { data: d.data, seo: d.seo, updatedAt: d.updatedAt }])));
  } catch (err) {
    next(err);
  }
});

router.get("/:key", async (req, res, next) => {
  try {
    if (!KEYS.includes(req.params.key)) return res.status(404).json({ message: "Unknown page" });
    const doc = await Content.findOne({ key: req.params.key }, "key data seo updatedAt").lean();
    // لو مفيش حاجة محفوظة لسه، الفرونت يستخدم النصوص الافتراضية
    res.json(doc || { key: req.params.key, data: {}, seo: {} });
  } catch (err) {
    next(err);
  }
});

// تعديل (للعميل بعد تسجيل الدخول)
router.put("/:key", requireAuth, async (req, res, next) => {
  try {
    const { key } = req.params;
    if (!KEYS.includes(key)) return res.status(404).json({ message: "Unknown page" });

    const { data, seo } = req.body || {};
    if (data !== undefined && !isPlainObject(data)) {
      return res.status(400).json({ message: "data must be an object" });
    }

    const update = {};
    if (data !== undefined) update.data = data;
    if (isPlainObject(seo)) {
      update.seo = { title: str(seo.title), description: str(seo.description), image: str(seo.image) };
    }

    const doc = await Content.findOneAndUpdate(
      { key },
      { $set: update, $setOnInsert: { key } },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    res.json({ key: doc.key, data: doc.data, seo: doc.seo, updatedAt: doc.updatedAt });
  } catch (err) {
    if (err.name === "ValidationError") return res.status(400).json({ message: err.message });
    next(err);
  }
});

export default router;