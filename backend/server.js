import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import Content, { PAGES } from "./models/Content.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const {
  MONGO_URI,
  JWT_SECRET,
  CLIENT_URL = "http://localhost:5173",
  SITE_URL = "http://localhost:5173",
  PORT = 5000,
} = process.env;

if (!MONGO_URI || !JWT_SECRET) {
  console.error("Missing MONGO_URI or JWT_SECRET in .env");
  process.exit(1);
}

const app = express();
app.use(helmet());
app.use(cors({ origin: CLIENT_URL.split(",").map((s) => s.trim()) }));
app.use(express.json({ limit: "1mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

/* ---------- SEO: robots.txt + sitemap.xml ---------- */
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  );
});

app.get("/sitemap.xml", async (_req, res, next) => {
  try {
    const docs = await Content.find({}, "key updatedAt").lean();
    const updated = Object.fromEntries(docs.map((d) => [d.key, d.updatedAt]));
    const urls = Object.entries(PAGES)
      .map(([key, path]) => {
        const last = updated[key] ? `<lastmod>${new Date(updated[key]).toISOString()}</lastmod>` : "";
        return `  <url><loc>${SITE_URL}${path}</loc>${last}</url>`;
      })
      .join("\n");
    res
      .type("application/xml")
      .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
  } catch (err) {
    next(err);
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use((_req, res) => res.status(404).json({ message: "Not found" }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
