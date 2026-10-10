import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BadgeCheck, BarChart3, ChevronDown, FileText, Landmark, Link2, Package, Settings, ShieldCheck, Target, TrendingUp, Users, Wallet } from "lucide-react"
import heroImg from "../assets/ACChero.png"

const heroIcons = [BarChart3, FileText, Settings, TrendingUp]

const importance = [
  { icon: Wallet, title: "إدارة أفضل للموارد", text: "تنظيم الإيرادات والمصروفات وتتبع التدفقات النقدية أولاً بأول." },
  { icon: ShieldCheck, title: "الامتثال الضريبي والتنظيمي", text: "تلبية متطلبات الجهات التنظيمية والضريبية بكفاءة." },
  { icon: Target, title: "تحسين اتخاذ القرارات", text: "رؤية شاملة وشفافية مطلقة لاستشراف المستقبل المالي." },
]

const scope = [
  { icon: FileText, title: "تسجيل وتبويب المعاملات المالية اليومية", short: "قيد دقيق لكل المعاملات مع حفظ المستندات.", text: "قيد جميع فواتير المبيعات، المشتريات، المقبوضات، والمصروفات اليومية بدقة متناهية مع الاحتفاظ بالمستندات المؤيدة." },
  { icon: Landmark, title: "تسوية الحسابات البنكية والمطابقات الدورية", short: "مطابقة الكشوفات البنكية مع سجلاتك.", text: "إجراء تسويات بنكية دورية لمطابقة كشوفات الحسابات البنكية مع السجلات، بالإضافة إلى مطابقة حسابات الموردين والعملاء وبوابات الدفع الإلكتروني." },
  { icon: Users, title: "إدارة حسابات الذمم المدينة والدائنة", short: "متابعة أعمار الديون وتحصيل المستحقات.", text: "تنظيم ومتابعة أعمار الديون لضمان تحصيل المستحقات في مواعيدها وإدارة الالتزامات تجاه الموردين." },
  { icon: Package, title: "إدارة وتتبّع الأصول الثابتة", short: "تسجيل الأصول ومتابعة قيمتها الدفترية.", text: "تسجيل الأصول، احتساب الإهلاكات الدورية، ومتابعة القيمة الدفترية للأصول بشكل منتظم." },
  { icon: Settings, title: "إعداد وإدارة الأنظمة المحاسبية وشجرة الحسابات", short: "شجرة حسابات مخصصة لطبيعة نشاطك.", text: "تصميم وتطوير شجرة حسابات مخصصة لطبيعة نشاطك على البرامج المحاسبية الحديثة لضمان سهولة القيد والتتبع." },
  {
    icon: BarChart3,
    title: "التقارير المالية الدورية والتحليل المالي",
    short: "تقارير شهرية وربع سنوية وسنوية للإدارة.",
    text: "توفير تقارير دورية (شهرياً / ربع سنوياً / سنوياً) تمنح الإدارة صورة شفافة ودقيقة عن أداء الشركة:",
    list: ["قائمة الدخل: لتحديد نتائج الأعمال بدقة وقياس مستويات الربحية.", "قائمة المركز المالي: لرصد الأصول، الالتزامات، وحقوق الملكية في أي لحظة.", "قائمة التدفقات النقدية: لتتبع مصادر الأموال ومصارفها الفعلية.", "تقارير أخرى حسب احتياج الإدارة."],
  },
]

const why = [
  { icon: BadgeCheck, title: "خبرة محاسبية عميقة", text: "تنظيم دقيق للسجلات وإعداد احترافي للقوائم المالية وفقاً لأعلى المعايير والممارسات المهنية المعتمدة." },
  { icon: Link2, title: "التكامل المحاسبي والتشغيلي", text: "ربط محكم بين حركة العمليات اليومية والتقارير المالية لضمان تطابق البيانات ودعم اتخاذ القرار." },
  { icon: ShieldCheck, title: "تحصين واستقرار مالي", text: "رقابة مالية وقائية تحمي حقوق منشأتك وتمنحك الوضوح التام للتخطيط والتوسع بكل ثقة." },
]

const card = "rounded-2xl border border-[#ddd7cc] border-r-4 border-r-[#a5854e] bg-[#fdfcf9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:shadow-xl"
const body = "text-[15px] font-medium leading-8 text-[#173649]/85"
const iconBox = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e3d5b9] bg-[#f3eee4] text-[#a5854e] transition-colors duration-500 group-hover:text-[#7a5a2b] md:h-14 md:w-14"
const iconSize = "h-5 w-5 md:h-7 md:w-7"

function Expand({ open, children }) {
  return (
    <div className={`grid transition-all duration-700 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

function MoreButton({ open, onClick }) {
  return (
    <button onClick={onClick} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#a5854e] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#967743] hover:shadow-md">
      {open ? "عرض أقل" : "اقرأ المزيد"}
      <ChevronDown size={18} className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
    </button>
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
      {sub && <p className={`${body} mx-auto mt-4 max-w-3xl`}>{sub}</p>}
    </div>
  )
}

function ScopeCard({ icon: Icon, title, short, text, list }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${card} group px-4 py-5 md:p-7`}>
      <div className="flex items-center gap-3 md:gap-4">
        <div className={iconBox}><Icon className={iconSize} strokeWidth={1.7} /></div>
        <h3 className="text-base font-extrabold leading-7 text-[#173649] md:text-xl md:leading-8">{title}</h3>
      </div>

      <p className={`${body} mt-4`}>{short}</p>

      <Expand open={open}>
        <div className="mt-4 border-t-2 border-[#a5854e]/60 pt-4 text-[15px] leading-8 text-[#173649]/90">
          <p>{text}</p>
          {list && (
            <ul className="mt-3 space-y-2">
              {list.map((l) => (
                <li key={l} className="flex gap-3"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#a5854e]" />{l}</li>
              ))}
            </ul>
          )}
        </div>
      </Expand>

      <MoreButton open={open} onClick={() => setOpen(!open)} />
    </div>
  )
}

export default function AccountingPage() {
  const [more, setMore] = useState(false)

  return (
    <div className="overflow-x-hidden bg-[#f7f5f0] text-[#173649]">
      {/* Hero */}
      <section className="relative flex min-h-[460px] items-center overflow-hidden bg-[#173649] py-8 md:min-h-[500px] md:py-14">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover object-left" />
        <div className="absolute inset-0 bg-[#173649]/80 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-l from-[#173649] from-30% via-[#173649]/85 via-50% to-transparent to-75% md:block" />
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#a5854e]/10" />

        <div className="relative mx-auto flex w-full max-w-[1400px] items-center gap-6 px-5 lg:px-8">
          {/* Icons (right side) */}
          <div className="hidden shrink-0 flex-col gap-4 md:flex">
            {heroIcons.map((Icon, i) => (
              <div key={i} className="group flex h-16 items-center border-l border-[#a5854e]/60 pl-5">
                <Icon size={36} strokeWidth={1.4} className="text-[#d9bf86] transition-all duration-300 group-hover:scale-110 group-hover:text-[#f3eee4]" />
              </div>
            ))}
          </div>

          <div className="min-w-0 flex-1 text-white lg:max-w-[640px]">
            <span className="group mb-5 inline-flex max-w-full cursor-default items-center gap-2 rounded-full border border-[#a5854e]/30 bg-white/10 px-4 py-2 text-xs font-medium text-[#e8dcc0] transition-all duration-300 hover:border-[#a5854e]/70 hover:bg-white/15 hover:text-white sm:gap-3 sm:px-5 sm:text-sm">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#a5854e] transition-transform duration-300 group-hover:scale-[1.6]" />
              خدمات المحاسبة ومسك الدفاتر
              <span className="h-[2px] w-8 shrink-0 bg-[#d9bf86] sm:w-12" />
            </span>

            <h1 className="mb-4 text-[22px] font-extrabold leading-[1.6] sm:text-[28px] lg:mb-5 lg:text-[32px]">
              <span className="text-[#a5854e]">رؤية مالية واضحة لإدارة أعمالك..</span> وأساس متين لامتثالك الضريبي
            </h1>

            <p className="mb-5 text-[14px] font-medium leading-7 text-white/80 lg:mb-7 lg:text-[16px] lg:leading-8">
              تحويل البيانات المالية المعقدة إلى سجلات دقيقة ومنظمة، تمنحك السيطرة الكاملة وتسهل عملية اتخاذ القرار.
            </p>

            <Link to="/contact" className="animate-soft-bounce inline-flex items-center justify-center gap-2 rounded-xl bg-[#a5854e] px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:animate-none hover:bg-[#967743] sm:gap-3 sm:px-7 sm:py-2.5 sm:text-base">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              احجز استشارتك الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Importance */}
      <section className="px-3 py-12 sm:px-5 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="px-1 sm:px-0">
            <h2 className="mb-4 text-xl font-extrabold md:text-3xl">أهمية مسك الدفاتر المنظم</h2>
            <p className={body}>
              إنّ مسك الدفاتر المحاسبي المنتظم ليس مجرد رصد تقليدي للأرقام أو مجرد استيفاء لشروط قانونية شكلية؛ بل هو الركيزة الأساسية والمرآة الحقيقية لأداء عملك، والبوصلة التي توجّه الإدارة نحو اتخاذ القرارات الاستثمارية والتطويرية الصحيحة.
            </p>
            <Expand open={more}>
              <p className={`${body} pt-2`}>
                فمن خلال تنظيم الإيرادات والمصروفات بدقة، وتتبع التدفقات النقدية أولاً بأول، نوفر لمنشأتك أساساً متيناً لا يقتصر فقط على تلبية متطلبات الامتثال الضريبي والجهات التنظيمية بكفاءة، بل يمنحك الرؤية الشاملة والشفافية المطلقة لاستشراف المستقبل المالي وتنمية أعمالك بثقة.
              </p>
            </Expand>
            <MoreButton open={more} onClick={() => setMore(!more)} />
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-1">
            {importance.map(({ icon: Icon, title, text }) => (
              <div key={title} className={`${card} group px-4 py-4 md:p-5`}>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#a5854e] text-white transition-colors duration-500 group-hover:text-[#f5e6b8] lg:hidden">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <ArrowLeft className="hidden h-4 w-4 shrink-0 text-[#a5854e] lg:block" strokeWidth={2.5} />
                  <h3 className="text-base font-extrabold leading-7">{title}</h3>
                </div>
                <p className={body}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="px-3 pb-12 sm:px-5 md:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle sub="نحن في لوغاريتم نتكفل بكافة العمليات والمهام المحاسبية اليومية والدورية لضمان انتظام سجلاتك المالية وفق معايير إعداد التقارير المالية الدولية:">
            النطاق التفصيلي الشامل لإدارة الحسابات ومسك الدفاتر
          </SectionTitle>

          <div className="grid items-start gap-3 md:grid-cols-2 md:gap-7">
            {scope.map((s) => <ScopeCard key={s.title} {...s} />)}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#e3d5b9] bg-[#f3eee4] px-4 py-4 md:mt-8 md:items-center md:gap-5 md:p-6">
            <span className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center md:mt-0 md:h-12 md:w-12">
              <span className="absolute inset-0 animate-ping rounded-full border-2 border-[#a5854e]/60" />
              <span className="absolute inset-0 animate-ping rounded-full border border-[#a5854e]/40 [animation-delay:0.7s]" />
              <ArrowLeft className="relative h-4 w-4 text-[#a5854e] md:h-8 md:w-8" strokeWidth={2.6} />
            </span>
            <p className="text-sm font-bold leading-7 text-[#173649] md:text-base md:leading-8">
              تضمن <span className="font-extrabold text-[#a5854e]">لوغاريتم</span> أن تكون مخرجات جميع العمليات المحاسبية عبارة عن قاعدة بيانات ضريبية صلبة متوافقة بالكامل مع الأنظمة والتشريعات المحلية في دولة الإمارات العربية المتحدة.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-5 pb-14 md:pb-16 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#173649] px-5 py-10 md:px-12 md:py-14">
          <div className="absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full border border-[#a5854e]/20" />
          <h2 className="relative mb-8 text-center text-xl font-extrabold leading-snug text-white md:mb-10 md:text-3xl">لماذا تختار لوغاريتم لإدارة حساباتك؟</h2>

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