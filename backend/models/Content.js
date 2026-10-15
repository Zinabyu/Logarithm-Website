import mongoose from "mongoose";

/* مفتاح الصفحة -> مسارها في الموقع (بيستخدم في sitemap.xml)
   "site" للإعدادات العامة (واتساب، سوشيال، الفوتر) ومالوش صفحة */
export const PAGES = {
  home: "/",
  about: "/about",
  services: "/services",
  "corporate-tax": "/services/corporate-tax",
  vat: "/services/vat",
  accounting: "/services/accounting",
  contact: "/contact",
};

export const KEYS = ["site", ...Object.keys(PAGES)];

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, enum: KEYS },
    // نصوص الصفحة: شكلها حر، والفرونت هو اللي بيحدد الحقول
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    seo: {
      title: { type: String, maxlength: 70, default: "" },
      description: { type: String, maxlength: 200, default: "" },
      image: { type: String, maxlength: 500, default: "" },
    },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model("Content", contentSchema);