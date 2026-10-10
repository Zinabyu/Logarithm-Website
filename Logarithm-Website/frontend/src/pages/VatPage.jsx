import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Building2, Calculator, Check, ChevronDown, ChevronLeft, ChevronRight, Link2, RefreshCcw, Search, ShieldCheck, BadgeCheck } from "lucide-react"
import heroImg from "../assets/VAThero.jpg"

const risks = [
  "غرامات إدارية ومالية باهظة نتيجة التأخير أو الخطأ في الإقرارات.",
  "فقدان الحق في استرداد ضريبة المدخلات بسبب أخطاء صياغة الفواتير الضريبية.",
  "تعقيدات أثناء المراجعة والتدقيق الضريبي من قبل الهيئة الاتحادية للضرائب.",
]

const services = [
  {
    icon: Building2,
    title: "التسجيل وإدارة الملف الضريبي",
    text: "تقييم حد التسجيل واستخراج الرقم الضريبي وإدارة ملفك الضريبي بكفاءة.",
    items: [
      { t: "التسجيل الضريبي", d: "تقييم حد التسجيل (الإلزامي والاختياري) واستخراج الرقم الضريبي بكفاءة وسرعة." },
      { t: "إلغاء التسجيل الضريبي", d: "إدارة إجراءات إلغاء التسجيل عند تصفية الأعمال أو انخفاض التوريدات عن الحدود القانونية لتجنب غرامات التأخير." },
      { d: "تحديث البيانات اللازمة للملف الضريبي بشكل دوري." },
    ],
  },
  {
    icon: Calculator,
    title: "إعداد وتقديم الإقرارات الضريبية الدورية",
    text: "مراجعة بيانات المبيعات والمشتريات وتقديم الإقرار في موعده بدقة تامة.",
    items: [
      { t: "تجميع ومراجعة البيانات", d: "فحص ومطابقة بيانات المبيعات والمشتريات من واقع الدفاتر المحاسبية." },
      { t: "تصنيف التوريدات بدقة", d: "بين توريدات خاضعة للضريبة وفقاً للنسبة القياسية، وتوريدات خاضعة للنسبة الصفرية، وتوريدات معفاة، وتوريدات خارج نطاق الضريبة." },
      { d: "ضمان تقديم الإقرار واحتساب الضريبة الواجبة السداد أو الاسترداد بدقة وقبل المواعيد النهائية." },
    ],
  },
  {
    icon: RefreshCcw,
    title: "تقديم طلبات الاسترداد",
    text: "إعداد النماذج الرسمية لاسترداد رصيد الضريبة الدائن ومتابعتها مع الهيئة.",
    items: [
      { d: "إعداد وتقديم النماذج الرسمية لطلبات استرداد رصيد ضريبة القيمة المضافة الدائن بكفاءة عالية بعد التأكد من الأهلية والمستندات المطلوبة." },
      { d: "متابعة طلبات الاسترداد والرد على استفسارات الهيئة الاتحادية للضرائب." },
    ],
  },
  {
    icon: Search,
    title: "المراجعة والتدقيق الضريبي الوقائي",
    text: "فحص السجلات والفواتير واكتشاف الأخطاء وتصحيحها قبل المراجعة الرسمية.",
    items: [
      { t: "الفحص الضريبي الشامل", d: "فحص السجلات والفواتير السابقة للتحقق من سلامة التطبيق واكتشاف الأخطاء وتصحيحها قبل المراجعة الرسمية للهيئة." },
      { t: "التحقق من نموذج الفواتير", d: "التأكد من استيفاء كافة الفواتير الصادرة والواردة للبيانات الإلزامية المحددة." },
      { t: "إدارة طلبات استرداد الضريبة", d: "إعداد وتقديم طلبات استرداد الضريبة المؤهلة ومتابعتها مع الهيئة حتى إتمام الاسترداد." },
    ],
  },
]

const why = [
  { icon: BadgeCheck, title: "خبرة وكيل ضريبي معتمد", text: "تمثيل موثوق ومعرفة عميقة باللوائح والتعاميم الصادرة عن الهيئة الاتحادية للضرائب." },
  { icon: ShieldCheck, title: "تجنب الغرامات والمخاطر", text: "ضمان تقديم كافة الإقرارات والمعاملات في مواعيدها وبدقة تامة." },
  { icon: Link2, title: "التكامل مع النظام المحاسبي", text: "ربط معالجة ضريبة القيمة المضافة مباشرة بخدمات مسك الدفاتر والأنظمة المحاسبية لضمان اتساق البيانات." },
]

const card = "rounded-2xl border border-[#ddd7cc] border-r-4 border-r-[#a5854e] bg-[#fdfcf9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:shadow-xl"
/* نفس الكارت من غير الشريط الدهبي الجانبي */
const cardPlain = "rounded-2xl border border-[#ddd7cc] bg-[#fdfcf9] shadow-sm"
const iconBox = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e3d5b9] bg-[#f3eee4] text-[#a5854e] md:h-14 md:w-14"

function Geometry({ className }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" stroke="#a5854e" strokeWidth="1.5" className={`pointer-events-none absolute opacity-[0.14] ${className}`}>
      <path d="M20 10 380 120M20 10 200 290M380 120 200 290M20 10 120 200M380 120 120 200M120 200 200 290" />
    </svg>
  )
}

/* شارت الأعمدة الباهت في الهيرو: صغير في الموبايل وأكبر في الديسكتوب */
function HeroChart() {
  const bars = [28, 48, 36, 72, 58, 90]
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-16 left-3 flex origin-bottom-left items-end gap-1.5 opacity-[0.16] lg:bottom-0 lg:left-10 lg:scale-[1.6] lg:gap-2"
    >
      {bars.map((h, i) => (
        <span key={i} style={{ height: h }} className="w-3.5 rounded-t-sm bg-[#a5854e] lg:w-5" />
      ))}
    </div>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-8 text-center md:mb-12">
      <div className="group mx-auto w-fit max-w-full cursor-default">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-[2px] w-14 shrink-0 bg-[#a5854e] transition-all duration-300 group-hover:w-20 md:block" />
          <h2 className="text-balance text-xl font-extrabold leading-snug text-[#173649] transition-colors duration-300 group-hover:text-[#a5854e] md:text-3xl">{children}</h2>
          <span className="hidden h-[2px] w-14 shrink-0 bg-[#a5854e] transition-all duration-300 group-hover:w-20 md:block" />
        </div>
        <span className="mx-auto mt-3 block h-[2px] w-1/5 bg-[#a5854e] transition-all duration-500 group-hover:w-4/5 md:hidden" />
      </div>
      {sub && <p className="mx-auto mt-4 max-w-2xl font-medium leading-8 text-[#173649]/85 md:mt-5">{sub}</p>}
    </div>
  )
}

function ServiceCard({ icon: Icon, title, text, items }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${card} p-5 md:p-7`}>
      <div className="flex items-center gap-3 md:gap-4">
        <div className={iconBox}><Icon className="h-5 w-5 md:h-7 md:w-7" strokeWidth={1.7} /></div>
        <h3 className="text-base font-extrabold leading-7 text-[#173649] md:text-xl md:leading-8">{title}</h3>
      </div>

      <p className="mt-4 text-[15px] font-medium leading-8 text-[#173649]/85 md:mt-5">{text}</p>

      <div className={`grid transition-all duration-700 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <ul className="overflow-hidden">
          <div className="mt-5 space-y-4 border-t-2 border-[#a5854e]/60 pt-5">
            {items.map(({ t, d }) => (
              <li key={d} className="flex gap-3 text-[15px] leading-8 text-[#173649]/90">
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#a5854e]" />
                <p>{t && <b className="text-[#173649]">{t}: </b>}{d}</p>
              </li>
            ))}
          </div>
        </ul>
      </div>

      <button onClick={() => setOpen(!open)} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#a5854e] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#967743] hover:shadow-md">
        {open ? "عرض أقل" : "اقرأ المزيد"}
        <ChevronDown size={18} className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  )
}

export default function VatPage() {
  const [riskIdx, setRiskIdx] = useState(0)
  const prevRisk = () => setRiskIdx((i) => (i - 1 + risks.length) % risks.length)
  const nextRisk = () => setRiskIdx((i) => (i + 1) % risks.length)

  return (
    <div className="relative overflow-hidden bg-[#f7f5f0] text-[#173649]">
      {/* Hero: من غير صورة في الموبايل + أقصر */}
      <section className="relative overflow-hidden bg-[#173649] pb-24 pt-8 lg:pb-[120px] lg:pt-10">
        <div className="absolute inset-0 hidden bg-gradient-to-l from-[#173649] via-[#173649] to-[#21485d] lg:block" />
        <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full border border-[#a5854e]/20" />
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#a5854e]/10" />
        <HeroChart />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-[1.2fr_.8fr] lg:px-10">
          <div className="text-white">
            <span className="group mb-4 inline-flex cursor-default items-center gap-2.5 rounded-full border border-[#a5854e]/50 bg-white/10 px-4 py-2 text-xs font-medium text-[#e0c78c] transition-all duration-300 hover:border-[#a5854e] hover:bg-white/15 hover:text-[#f0d9a0] sm:text-sm lg:mb-6 lg:gap-3 lg:px-5 lg:py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#a5854e] transition-transform duration-300 group-hover:scale-[1.6]" />
              خدمات ضريبة القيمة المضافة
            </span>

            <h1 className="mb-3 max-w-[720px] text-[24px] font-extrabold leading-[1.6] sm:text-[30px] lg:mb-5 lg:text-[38px] lg:leading-[1.65]">
              <span className="text-[#a5854e]">امتثال ضريبي دقيق وحماية متكاملة</span> لأعمالك من المخاطر والغرامات
            </h1>

            <p className="mb-5 max-w-[650px] text-[14px] font-medium leading-7 text-white/80 lg:mb-7 lg:text-[17px] lg:leading-8">
              ندير ملفك الضريبي بمهنية عالية؛ بدءاً من التخطيط والتسجيل، وصولاً إلى تقديم الإقرارات والمعالجة الفنية للمعاملات المعقدة وفقاً للقوانين الضريبية في الإمارات العربية المتحدة.
            </p>

            <Link to="/contact" className="animate-soft-bounce inline-flex items-center justify-center gap-2 rounded-xl bg-[#a5854e] px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:animate-none hover:bg-[#967743] sm:gap-3 sm:px-8 sm:py-4 sm:text-base">
              احجز استشارتك الآن
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>

          {/* الصورة للكمبيوتر بس */}
          <div className="hidden justify-end lg:flex">
            <div className="h-[270px] w-full max-w-[390px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl">
              <img src={heroImg} alt="خدمات ضريبة القيمة المضافة" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Importance (overlaps hero) */}
      <section className="relative z-10 -mt-16 px-3 pb-14 md:px-5 md:pb-20 lg:-mt-20 lg:px-10">
        <Geometry className="-right-16 top-16 hidden w-[460px] lg:block" />
        <Geometry className="-left-20 bottom-0 hidden w-[360px] -scale-x-100 lg:block" />

        <div className={`${cardPlain} relative mx-auto max-w-5xl p-2.5 shadow-2xl md:p-10`}>
          {/* شارة */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e3d5b9] bg-[#f3eee4] px-4 py-1.5 text-sm font-semibold text-[#a5854e]">
            <ShieldCheck size={16} strokeWidth={1.8} />
            حماية أعمالك
          </span>

          <h2 className="mb-3 text-xl font-extrabold leading-snug md:mb-4 md:text-3xl">أهمية الإدارة الصحيحة لضريبة القيمة المضافة</h2>
          <p className="mb-5 text-[15px] font-medium leading-8 text-[#173649]/85 md:mb-6">
            ضريبة القيمة المضافة ليست مجرد 5% تُضاف على الفواتير، بل هي نظام إداري ومحاسبي متكامل يتطلب دقة عالية في التصنيف والمطابقة. الإدارة غير الدقيقة لضريبة القيمة المضافة قد تُعرّض الشركة لـ:
          </p>

          {/* الديسكتوب: قائمة */}
          <ul className="hidden space-y-3 md:block">
            {risks.map((r) => (
              <li key={r} className="flex items-start gap-3 text-[15px] font-medium leading-8">
                <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a5854e] text-white"><Check size={14} strokeWidth={3} /></span>
                {r}
              </li>
            ))}
          </ul>

          {/* الموبايل: نقطة واحدة، الكلام سطرين */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={prevRisk}
              aria-label="السابق"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#173649] text-white shadow-md transition-all duration-200 active:scale-95"
            >
              <ChevronRight size={15} />
            </button>

            <div className="flex min-h-[72px] flex-1 items-center rounded-2xl border border-[#e3d5b9] bg-white px-2.5 py-2">
              <p className="text-[13px] font-bold leading-6 text-[#173649]">{risks[riskIdx]}</p>
            </div>

            <button
              onClick={nextRisk}
              aria-label="التالي"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a5854e] text-white shadow-md transition-all duration-200 active:scale-95"
            >
              <ChevronLeft size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 pb-14 md:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle sub="نقدم في لوغاريتم حلولاً ضريبية شاملة تغطي كافة المراحل والمتطلبات التشريعية:">
            النطاق التفصيلي لخدماتنا في ضريبة القيمة المضافة
          </SectionTitle>

          <div className="grid items-start gap-4 md:grid-cols-2 md:gap-7">
            {services.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-5 pb-14 md:pb-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#173649] px-5 py-10 md:px-12 md:py-14">
          <div className="absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full border border-[#a5854e]/20" />
          <h2 className="relative mb-8 text-center text-xl font-extrabold leading-snug text-white md:mb-10 md:text-3xl">القيمة المضافة والتميز مع "لوغاريتم"</h2>

          <div className="relative grid gap-7 md:grid-cols-3 md:gap-8">
            {why.map(({ icon: Icon, title, text }) => (
              <div key={title} className="group text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#a5854e]/50 text-[#e0c78c] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#a5854e] group-hover:text-white md:mb-4 md:h-14 md:w-14">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mb-2 text-base font-extrabold text-white md:mb-3 md:text-lg">{title}</h3>
                <p className="text-[15px] font-medium leading-8 text-white/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}