import { useEffect, useState } from "react"
import {
  ABOUT_DEFAULTS,
  ACCOUNTING_DEFAULTS,
  CORPORATE_TAX_DEFAULTS,
  HOME_DEFAULTS,
  SERVICES_DEFAULTS,
  VAT_DEFAULTS,
  CONTACT_DEFAULTS,
  SITE_DEFAULTS,
} from "../data/defaults.js"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

// حقول صفحة ضريبة الشركات (متولدة بحلقات عشان الأسماء تطابق defaults.js)
const CORPORATE_TAX_FIELDS = [
  { name: "heroBadge", label: "الهيرو: الشارة الصغيرة" },
  { name: "heroGold1", label: "الهيرو: العنوان (الجزء الذهبي الأول)" },
  { name: "heroMid", label: "الهيرو: العنوان (الجزء الأبيض)" },
  { name: "heroGold2", label: "الهيرو: العنوان (الكلمة الذهبية الأخيرة)" },
  { name: "heroText", label: "الهيرو: الوصف", multiline: true },
  { name: "heroButton", label: "الهيرو: نص الزرار" },

  { name: "importanceTitle", label: "الأهمية: عنوان القسم" },
  { name: "importanceIntro", label: "الأهمية: الفقرة التمهيدية", multiline: true },
  ...[1, 2, 3].flatMap((i) => [
    { name: `importance${i}Title`, label: `الأهمية ${i}: العنوان` },
    { name: `importance${i}Text`, label: `الأهمية ${i}: النص`, multiline: true },
  ]),

  { name: "servicesTitle", label: "الخدمات: عنوان القسم" },
  ...[[1, 2], [2, 1], [3, 2], [4, 2]].flatMap(([i, n]) => [
    { name: `service${i}Title`, label: `الخدمة ${i}: العنوان` },
    { name: `service${i}Text`, label: `الخدمة ${i}: الوصف`, multiline: true },
    ...Array.from({ length: n }, (_, k) => k + 1).flatMap((j) => [
      { name: `service${i}Detail${j}Title`, label: `الخدمة ${i}: تفصيل ${j} - العنوان (بعد اقرأ المزيد)` },
      { name: `service${i}Detail${j}Text`, label: `الخدمة ${i}: تفصيل ${j} - النص (بعد اقرأ المزيد)`, multiline: true },
    ]),
  ]),

  { name: "whyTitle", label: "لماذا لوغاريتم: عنوان القسم" },
  ...[1, 2, 3].flatMap((i) => [
    { name: `why${i}Title`, label: `لماذا ${i}: العنوان` },
    { name: `why${i}Text`, label: `لماذا ${i}: النص`, multiline: true },
  ]),
]

// حقول صفحة القيمة المضافة. شكل كل خدمة: "td" = عنوان + نص، "d" = نص بس (لازم يطابق VatPage.jsx)
const VAT_SERVICE_ITEMS = [
  ["td", "td", "d"],
  ["td", "td", "d"],
  ["d", "d"],
  ["td", "td", "td"],
]
const VAT_FIELDS = [
  { name: "heroBadge", label: "الهيرو: الشارة الصغيرة" },
  { name: "heroGold", label: "الهيرو: العنوان (الجزء الذهبي)" },
  { name: "heroRest", label: "الهيرو: العنوان (باقي الجملة بالأبيض)" },
  { name: "heroText", label: "الهيرو: الوصف", multiline: true },
  { name: "heroButton", label: "الهيرو: نص الزرار" },

  { name: "riskBadge", label: "الأهمية: الشارة الصغيرة" },
  { name: "importanceTitle", label: "الأهمية: العنوان" },
  { name: "importanceIntro", label: "الأهمية: الفقرة التمهيدية", multiline: true },
  { name: "risk1", label: "الأهمية: النقطة 1", multiline: true },
  { name: "risk2", label: "الأهمية: النقطة 2", multiline: true },
  { name: "risk3", label: "الأهمية: النقطة 3", multiline: true },

  { name: "servicesTitle", label: "الخدمات: عنوان القسم" },
  { name: "servicesSub", label: "الخدمات: الجملة تحت العنوان", multiline: true },
  ...VAT_SERVICE_ITEMS.flatMap((kinds, idx) => {
    const i = idx + 1
    return [
      { name: `service${i}Title`, label: `الخدمة ${i}: العنوان` },
      { name: `service${i}Text`, label: `الخدمة ${i}: الوصف`, multiline: true },
      ...kinds.flatMap((kind, k) => [
        ...(kind === "td"
          ? [{ name: `service${i}Item${k + 1}T`, label: `الخدمة ${i}: بند ${k + 1} - العنوان (بعد اقرأ المزيد)` }]
          : []),
        { name: `service${i}Item${k + 1}D`, label: `الخدمة ${i}: بند ${k + 1} - النص (بعد اقرأ المزيد)`, multiline: true },
      ]),
    ]
  }),

  { name: "whyTitle", label: "القيمة المضافة: عنوان القسم" },
  ...[1, 2, 3].flatMap((i) => [
    { name: `why${i}Title`, label: `التميز ${i}: العنوان` },
    { name: `why${i}Text`, label: `التميز ${i}: النص`, multiline: true },
  ]),
]

// حقول صفحة المحاسبة
const ACCOUNTING_FIELDS = [
  { name: "heroBadge", label: "الهيرو: الشارة الصغيرة" },
  { name: "heroGold", label: "الهيرو: العنوان (الجزء الذهبي)" },
  { name: "heroRest", label: "الهيرو: العنوان (باقي الجملة بالأبيض)" },
  { name: "heroText", label: "الهيرو: الوصف", multiline: true },
  { name: "heroButton", label: "الهيرو: نص الزرار" },

  { name: "importanceTitle", label: "الأهمية: العنوان" },
  { name: "importanceText1", label: "الأهمية: الفقرة الأولى (ظاهرة)", multiline: true },
  { name: "importanceText2", label: "الأهمية: الفقرة الثانية (بعد اقرأ المزيد)", multiline: true },
  ...[1, 2, 3].flatMap((i) => [
    { name: `importance${i}Title`, label: `الأهمية: كارت ${i} - العنوان` },
    { name: `importance${i}Text`, label: `الأهمية: كارت ${i} - النص`, multiline: true },
  ]),

  { name: "scopeTitle", label: "النطاق: عنوان القسم" },
  { name: "scopeSub", label: "النطاق: الجملة تحت العنوان", multiline: true },
  ...[1, 2, 3, 4, 5, 6].flatMap((i) => [
    { name: `scope${i}Title`, label: `النطاق ${i}: العنوان` },
    { name: `scope${i}Short`, label: `النطاق ${i}: النص المختصر (ظاهر)`, multiline: true },
    { name: `scope${i}Text`, label: `النطاق ${i}: النص الكامل (بعد اقرأ المزيد)`, multiline: true },
  ]),
  ...[1, 2, 3, 4].map((j) => ({
    name: `scope6List${j}`,
    label: `النطاق 6: نقطة ${j} في القائمة (بعد اقرأ المزيد)`,
    multiline: true,
  })),

  { name: "noteStart", label: "الملاحظة: أول الجملة (قبل الكلمة الذهبية)" },
  { name: "noteBrand", label: "الملاحظة: الكلمة الذهبية" },
  { name: "noteEnd", label: "الملاحظة: باقي الجملة", multiline: true },

  { name: "whyTitle", label: "لماذا لوغاريتم: عنوان القسم" },
  ...[1, 2, 3].flatMap((i) => [
    { name: `why${i}Title`, label: `لماذا ${i}: العنوان` },
    { name: `why${i}Text`, label: `لماذا ${i}: النص`, multiline: true },
  ]),
]

// حقول صفحة تواصل معنا
const CONTACT_FIELDS = [
  { name: "title", label: "العنوان الرئيسي" },
  { name: "introLine1", label: "الجملة تحت العنوان (السطر الأول)" },
  { name: "introLine2", label: "الجملة تحت العنوان (السطر الثاني)" },

  { name: "card1Title", label: "كارت الموقع: العنوان" },
  { name: "card1Line1", label: "كارت الموقع: السطر الأول" },
  { name: "card1Line2", label: "كارت الموقع: السطر الثاني" },
  { name: "card1Action", label: "كارت الموقع: نص الزرار" },
  { name: "card2Title", label: "كارت الهاتف: العنوان" },
  { name: "card2Line2", label: "كارت الهاتف: السطر التاني (مواعيد العمل). الرقم نفسه من تاب الإعدادات العامة" },
  { name: "card2Action", label: "كارت الهاتف: نص الزرار" },
  { name: "card3Title", label: "كارت الإيميل: العنوان" },
  { name: "card3Line2", label: "كارت الإيميل: السطر التاني. الإيميل نفسه من تاب الإعدادات العامة" },
  { name: "card3Action", label: "كارت الإيميل: نص الزرار" },
  { name: "card4Title", label: "كارت واتساب: العنوان" },
  { name: "card4Line1", label: "كارت واتساب: السطر الأول" },
  { name: "card4Line2", label: "كارت واتساب: السطر الثاني" },
  { name: "card4Action", label: "كارت واتساب: نص الزرار" },

  { name: "formTitle", label: "الفورم: العنوان" },
  { name: "formSub", label: "الفورم: الجملة تحت العنوان" },
  { name: "formButton", label: "الفورم: نص زرار الإرسال" },
  { name: "sentMessage", label: "الفورم: رسالة بعد الإرسال", multiline: true },
]

// الإعدادات العامة: بتتستخدم في الهيدر والفوتر وصفحة التواصل
const SITE_FIELDS = [
  { name: "phone", label: "رقم الهاتف (بالشكل اللي يظهر، مثال: +971 50 123 4567)" },
  { name: "whatsappNumber", label: "رقم الواتساب (أرقام بس مع كود الدولة، مثال: 971501234567)" },
  { name: "whatsappMessage", label: "رسالة الواتساب الجاهزة (تظهر للعميل لما يضغط على أيقونة واتساب في الفوتر)", multiline: true },
  { name: "email", label: "البريد الإلكتروني (الفورم بيرسل عليه)" },
  { name: "mapLink", label: "رابط الموقع على الخريطة (لازم يبدأ بـ https://)" },

  { name: "facebookUrl", label: "رابط فيسبوك (لازم يبدأ بـ https://)" },
  { name: "instagramUrl", label: "رابط إنستجرام (لازم يبدأ بـ https://)" },
  { name: "linkedinUrl", label: "رابط لينكدإن (لازم يبدأ بـ https://)" },

  { name: "navHome", label: "القائمة: الرئيسية" },
  { name: "navAbout", label: "القائمة: من نحن" },
  { name: "navServices", label: "القائمة: خدماتنا" },
  { name: "navBlog", label: "القائمة: المدونة (في الفوتر بس)" },
  { name: "navContact", label: "القائمة: تواصل معنا" },
  { name: "navBack", label: "زرار الرجوع" },

  { name: "footerTitle1", label: "الفوتر: العنوان (السطر الأول)" },
  { name: "footerTitle2", label: "الفوتر: العنوان (السطر الثاني)" },
  { name: "footerButton", label: "الفوتر: نص الزرار" },
  { name: "footerCopyright", label: "الفوتر: جملة الحقوق (السنة بتتضاف لوحدها)" },
]

// الصفحات اللي العميل يقدر يعدلها. لإضافة صفحة جديدة: ضيفي عنصر هنا
// (key لازم يطابق اسم الصفحة في الباك اند: home, about, services, ...)
const PAGES = [
  {
    key: "home",
    label: "الصفحة الرئيسية",
    defaults: HOME_DEFAULTS,
    fields: [
      { name: "heroTitle1", label: "العنوان (السطر الأول)" },
      { name: "heroTitle2", label: "العنوان (السطر الثاني، باللون الذهبي)" },
      { name: "heroTagline", label: "الشعار تحت العنوان" },
      { name: "heroText", label: "الوصف", multiline: true },
      { name: "heroButton", label: "نص الزرار" },

      { name: "feature1Title", label: "المميزات: كارت 1 - العنوان" },
      { name: "feature1Text", label: "المميزات: كارت 1 - النص (رقم الوكيل الضريبي TAN)" },
      { name: "feature2Title", label: "المميزات: كارت 2 - العنوان" },
      { name: "feature2Text", label: "المميزات: كارت 2 - النص" },
      { name: "feature3Title", label: "المميزات: كارت 3 - العنوان" },
      { name: "feature3Text", label: "المميزات: كارت 3 - النص" },
      { name: "feature4Title", label: "المميزات: كارت 4 - العنوان" },
      { name: "feature4Text", label: "المميزات: كارت 4 - النص" },

      { name: "svcTitle", label: "قسم الخدمات: العنوان" },
      { name: "svcSub", label: "قسم الخدمات: الجملة تحت العنوان" },
      { name: "svcButton", label: "قسم الخدمات: نص الزرار في الكروت" },
      { name: "svc1Title", label: "قسم الخدمات: كارت المحاسبة - العنوان" },
      { name: "svc1Text", label: "قسم الخدمات: كارت المحاسبة - الوصف", multiline: true },
      { name: "svc2Title", label: "قسم الخدمات: كارت القيمة المضافة - العنوان" },
      { name: "svc2Text", label: "قسم الخدمات: كارت القيمة المضافة - الوصف", multiline: true },
      { name: "svc3Title", label: "قسم الخدمات: كارت ضريبة الشركات - العنوان" },
      { name: "svc3Text", label: "قسم الخدمات: كارت ضريبة الشركات - الوصف", multiline: true },
    ],
  },
  {
    key: "about",
    label: "من نحن",
    defaults: ABOUT_DEFAULTS,
    fields: [
      { name: "heroBadge", label: "الهيرو: الشارة الصغيرة فوق العنوان" },
      { name: "heroTitle1", label: "الهيرو: العنوان (السطر الأول)" },
      { name: "heroTitle2", label: "الهيرو: العنوان (السطر الثاني، باللون الذهبي)" },
      { name: "heroText", label: "الهيرو: الوصف", multiline: true },
      { name: "heroButton", label: "الهيرو: نص الزرار" },

      { name: "philosophyTitle", label: "الفلسفة: العنوان" },
      { name: "philosophyText1", label: "الفلسفة: الفقرة الأولى (ظاهرة)", multiline: true },
      { name: "philosophyText2", label: "الفلسفة: الفقرة الثانية (تظهر بعد اقرأ المزيد)", multiline: true },
      { name: "philosophyText3", label: "الفلسفة: الفقرة الثالثة (تظهر بعد اقرأ المزيد)", multiline: true },

      { name: "accredTitle", label: "الاعتماد: العنوان" },
      { name: "accredText1", label: "الاعتماد: الفقرة (ظاهرة)", multiline: true },
      { name: "accredText2", label: "الاعتماد: تكملة الفقرة (تظهر بعد عرض المزيد)", multiline: true },

      { name: "visionSectionTitle", label: "الرؤية والرسالة: عنوان القسم" },
      { name: "visionTitle", label: "الرؤية: العنوان" },
      { name: "visionText", label: "الرؤية: النص", multiline: true },
      { name: "missionTitle", label: "الرسالة: العنوان" },
      { name: "missionText", label: "الرسالة: النص", multiline: true },

      { name: "valuesSectionTitle", label: "القيم: عنوان القسم" },
      { name: "value1Title", label: "القيمة 1: العنوان" },
      { name: "value1Text", label: "القيمة 1: النص", multiline: true },
      { name: "value2Title", label: "القيمة 2: العنوان" },
      { name: "value2Text", label: "القيمة 2: النص", multiline: true },
      { name: "value3Title", label: "القيمة 3: العنوان" },
      { name: "value3Text", label: "القيمة 3: النص", multiline: true },
      { name: "value4Title", label: "القيمة 4: العنوان" },
      { name: "value4Text", label: "القيمة 4: النص", multiline: true },

      { name: "diffSectionTitle", label: "ما يميزنا: عنوان القسم" },
      { name: "diffTitle", label: "ما يميزنا: عنوان الكارت" },
      { name: "diffText1", label: "ما يميزنا: الفقرة (ظاهرة)", multiline: true },
      { name: "diffText2", label: "ما يميزنا: الفقرة (تظهر بعد اقرأ المزيد)", multiline: true },
      { name: "pillar1Title", label: "المحور الأول: العنوان" },
      { name: "pillar1Text", label: "المحور الأول: النص", multiline: true },
      { name: "pillar2Title", label: "المحور الثاني: العنوان" },
      { name: "pillar2Text", label: "المحور الثاني: النص", multiline: true },
    ],
  },
  {
    key: "services",
    label: "الخدمات",
    defaults: SERVICES_DEFAULTS,
    fields: [
      { name: "heroTitle", label: "الهيرو: العنوان" },
      { name: "heroText", label: "الهيرو: الوصف", multiline: true },
      { name: "listTitle", label: "عنوان قائمة الخدمات" },
    ],
  },
  {
    key: "corporate-tax",
    label: "ضريبة الشركات",
    defaults: CORPORATE_TAX_DEFAULTS,
    fields: CORPORATE_TAX_FIELDS,
  },
  {
    key: "vat",
    label: "القيمة المضافة",
    defaults: VAT_DEFAULTS,
    fields: VAT_FIELDS,
  },
  {
    key: "accounting",
    label: "المحاسبة",
    defaults: ACCOUNTING_DEFAULTS,
    fields: ACCOUNTING_FIELDS,
  },
  {
    key: "contact",
    label: "تواصل معنا",
    defaults: CONTACT_DEFAULTS,
    fields: CONTACT_FIELDS,
  },
  {
    key: "site",
    label: "الإعدادات العامة",
    defaults: SITE_DEFAULTS,
    fields: SITE_FIELDS,
  },
]

const input =
  "w-full rounded-xl border border-[#ddd7cc] bg-white px-4 py-3 text-[#173649] outline-none transition focus:border-[#a5854e] focus:ring-2 focus:ring-[#a5854e]/20"
const label = "mb-1.5 block text-sm font-bold text-[#173649]"
const card = "rounded-2xl border border-[#ddd7cc] bg-[#fdfcf9] p-6 shadow-sm md:p-8"
const primaryBtn =
  "rounded-xl bg-[#173649] px-6 py-3 font-bold text-white transition hover:bg-[#a5854e] disabled:opacity-60"
const headerBtn =
  "rounded-lg border border-[#ddd7cc] bg-white px-4 py-2 text-sm font-bold text-[#173649] transition hover:border-[#a5854e] hover:text-[#a5854e]"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError("")
    setBusy(true)
    try {
      const res = await fetch(API + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.token) return onLogin(json.token)
      if (res.status === 429) setError("محاولات كتير، حاولي تاني بعد شوية")
      else setError("الإيميل أو الباسورد غلط")
    } catch {
      setError("تعذر الاتصال بالسيرفر")
    } finally {
      setBusy(false)
    }
  }

  return (
    
    <form onSubmit={submit} className={card + " mx-auto w-full max-w-md space-y-5"}>
      <h1 className="text-2xl font-extrabold text-[#173649]">تسجيل الدخول</h1>
      <div>
        <label className={label}>البريد الإلكتروني</label>
        <input className={input} type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className={label}>كلمة المرور</label>
        <input className={input} type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="text-sm font-bold text-red-600">{error}</p>}
      <button className={primaryBtn + " w-full"} disabled={busy}>
        {busy ? "جاري الدخول..." : "دخول"}
      </button>
    </form>
    
  )
}

function Editor({ token, onLogout }) {
  const [pageKey, setPageKey] = useState(PAGES[0].key)
  const [values, setValues] = useState(null)
  const [seo, setSeo] = useState({ title: "", description: "" })
  const [status, setStatus] = useState("")
  const [saving, setSaving] = useState(false)

  const page = PAGES.find((p) => p.key === pageKey)

  useEffect(() => {
    let alive = true
    const current = PAGES.find((p) => p.key === pageKey)
    setValues(null)
    setStatus("")
    fetch(API + "/api/content/" + pageKey)
      .then((r) => r.json())
      .then((doc) => {
        if (!alive) return
        const saved = doc.data || {}
        const v = {}
        current.fields.forEach((f) => {
          v[f.name] = saved[f.name] || current.defaults[f.name] || ""
        })
        setValues(v)
        setSeo({ title: doc.seo?.title || "", description: doc.seo?.description || "" })
      })
      .catch(() => alive && setStatus("تعذر تحميل المحتوى"))
    return () => {
      alive = false
    }
  }, [pageKey])

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setStatus("")
    try {
      const res = await fetch(API + "/api/content/" + pageKey, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ data: values, seo }),
      })
      if (res.status === 401) return onLogout()
      setStatus(res.ok ? "تم الحفظ ✓ حدثي الموقع عشان تشوفي التغيير" : "حصل خطأ أثناء الحفظ")
    } catch {
      setStatus("تعذر الاتصال بالسيرفر")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#173649]">لوحة التحكم</h1>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className={headerBtn}>
            عرض الموقع
          </a>
          <button type="button" onClick={onLogout} className={headerBtn}>
            خروج
          </button>
        </div>
      </div>

      {PAGES.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {PAGES.map((p) => (
            <button
              key={p.key}
              onClick={() => setPageKey(p.key)}
              className={
                "rounded-full px-5 py-2 text-sm font-bold transition " +
                (p.key === pageKey ? "bg-[#173649] text-white" : "bg-white text-[#173649] ring-1 ring-[#ddd7cc] hover:ring-[#a5854e]")
              }
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {!values ? (
        <p className="text-[#173649]/70">{status || "جاري التحميل..."}</p>
      ) : (
        <form onSubmit={save} className="space-y-6">
          <section className={card + " space-y-5"}>
            <h2 className="text-lg font-extrabold text-[#173649]">نصوص {page.label}</h2>
            {page.fields.map((f) => (
              <div key={f.name}>
                <label className={label}>{f.label}</label>
                {f.multiline ? (
                  <textarea
                    className={input + " min-h-[120px]"}
                    value={values[f.name]}
                    onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  />
                ) : (
                  <input
                    className={input}
                    value={values[f.name]}
                    onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </section>

          <section className={card + " space-y-5"}>
            <h2 className="text-lg font-extrabold text-[#173649]">ظهور الصفحة في جوجل (SEO)</h2>
            <div>
              <label className={label}>عنوان الصفحة (حتى 60 حرف تقريباً)</label>
              <input className={input} maxLength={70} value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} />
            </div>
            <div>
              <label className={label}>الوصف المختصر (حتى 155 حرف تقريباً)</label>
              <textarea
                className={input + " min-h-[90px]"}
                maxLength={200}
                value={seo.description}
                onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              />
            </div>
          </section>

          <div className="flex items-center gap-4">
            <button className={primaryBtn} disabled={saving}>
              {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
            {status && <p className="text-sm font-bold text-[#173649]">{status}</p>}
          </div>
        </form>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem("adminToken") || "")

  // الصفحة دي متظهرش في جوجل
  useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex,nofollow"
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  function login(t) {
    sessionStorage.setItem("adminToken", t)
    setToken(t)
  }
  function logout() {
    sessionStorage.removeItem("adminToken")
    setToken("")
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-5 py-10 md:py-16">
      {token ? <Editor token={token} onLogout={logout} /> : <Login onLogin={login} />}
    </main>
  )
}