import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Content, { KEYS } from "./models/Content.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 10) {
  console.error("Set MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD (10+ chars) in .env first");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);

// أدمن: لو موجود بنحدّث الباسورد، ولو مش موجود بنعمله
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
await User.findOneAndUpdate(
  { email: ADMIN_EMAIL.toLowerCase().trim() },
  { $set: { passwordHash } },
  { upsert: true }
);
console.log(`Admin ready: ${ADMIN_EMAIL}`);

// مستندات المحتوى فاضية، بتتملي لما العميل يحفظ أول مرة أو لما نربط الفرونت
for (const key of KEYS) {
  await Content.updateOne({ key }, { $setOnInsert: { key, data: {} } }, { upsert: true });
}
console.log(`Content docs ready: ${KEYS.join(", ")}`);

await mongoose.disconnect();
