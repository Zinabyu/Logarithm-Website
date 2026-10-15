import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowUp,
  ShieldCheck,
  BadgeCheck,
  FileText,
  Calculator,
  Building2,
  Handshake,
} from "lucide-react"
import heroImg from "../assets/hero-illustration.jpg"
import { usePage } from "../context/ContentContext.jsx"
import { CORPORATE_TAX_DEFAULTS } from "../data/defaults.js"

/* الديسكتوب: خطين جنب العنوان.
   الموبايل: خط تحت العنوان بطول 20% من طوله، والهوفر 80% */
function SectionTitle({ children }) {
  return (
    <div className="group mb-10 flex cursor-default justify-center md:mb-12">
      <div className="flex flex-col items-center md:flex-row md:gap-5">
        <span className="hidden h-[2px] w-14 bg-[#a5854e] transition-all duration-300 group-hover:w-20 md:block" />
        <h2 className="text-center text-xl font-bold leading-snug text-[#173649] transition-colors duration-300 group-hover:text-[#a5854e] md:text-3xl">
          {children}
        </h2>
        <span className="hidden h-[2px] w-14 bg-[#a5854e] transition-all duration-300 group-hover:w-20 md:block" />
        <span className="mt-3 block h-[2px] w-1/5 bg-[#a5854e] transition-all duration-500 group-hover:w-4/5 md:hidden" />
      </div>
    </div>
  )
}

function IconCircle({ icon: Icon }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e3d5b9] bg-[#f3eee4] text-[#a5854e] md:h-14 md:w-14">
      <Icon className="h-[18px] w-[18px] md:h-7 md:w-7" strokeWidth={1.7} />
    </div>
  )
}

const cardClass =
  "rounded-[20px] border border-[#ddd7cc] border-r-4 border-r-[#a5854e] bg-[#fdfcf9] px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:shadow-xl md:p-7"

/* كاردات الأهمية: خلفية كريمي + نقطة بدل الأيقونة، والنقطة تكبر وتتغير في الهوفر */
function ImportanceCard({ title, text }) {
  return (
    <div className="group rounded-2xl border border-[#ddd7cc] bg-[#fdfcf9] px-4 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:shadow-lg md:p-7">
      <div className="mb-2 flex items-center gap-3">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#a5854e] transition-all duration-300 group-hover:scale-150 group-hover:bg-[#3d6785]" />
        <h3 className="text-base font-bold text-[#173649] md:text-lg">{title}</h3>
      </div>
      <p className="text-[13px] leading-7 text-[#173649]/80 md:text-sm md:leading-8">{text}</p>
    </div>
  )
}

function InfoCard({ icon, title, text }) {
  return (
    <div className={cardClass}>
      <div className="mb-3 flex items-center gap-3 md:mb-5 md:gap-4">
        <IconCircle icon={icon} />
        <h3 className="text-base font-bold text-[#173649] md:text-lg">{title}</h3>
      </div>
      <p className="text-[13px] leading-7 text-[#173649]/80 md:text-sm md:leading-8">{text}</p>
    </div>
  )
}

function ServiceCard({ icon, title, text, details }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-3 md:gap-4">
        <IconCircle icon={icon} />
        <h3 className="text-base font-bold leading-7 text-[#173649] md:text-xl md:leading-8">{title}</h3>
      </div>

      <p className="mt-3 text-[13px] leading-7 text-[#173649]/75 md:mt-5 md:text-sm md:leading-8">{text}</p>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 space-y-4 border-t-2 border-[#a5854e]/60 pt-4 md:mt-5 md:pt-5">
          {details.map((d, i) => (
            <div key={i}>
              <h4 className="mb-1.5 text-[15px] font-bold text-[#173649] md:mb-2 md:text-base">{d.title}</h4>
              <p className="text-[13px] leading-7 text-[#173649]/75 md:text-sm">{d.text}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#a5854e] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#967743] hover:shadow-md md:mt-6 md:px-6 md:py-3"
      >
        <span>{open ? "عرض أقل" : "اقرأ المزيد"}</span>
        {open ? <ArrowUp size={18} /> : <ArrowLeft size={18} />}
      </button>
    </div>
  )
}

export default function CorporateTaxPage() {
  const { data: c } = usePage("corporate-tax", CORPORATE_TAX_DEFAULTS)

  // الأيقونات وعدد التفاصيل ثابتين في الكود، والنصوص بتيجي من لوحة التحكم
  const importance = [1, 2, 3].map((i) => ({
    title: c[`importance${i}Title`],
    text: c[`importance${i}Text`],
  }))

  const services = [
    { icon: Building2, n: 2 },
    { icon: Calculator, n: 1 },
    { icon: FileText, n: 2 },
    { icon: ShieldCheck, n: 2 },
  ].map(({ icon, n }, idx) => {
    const i = idx + 1
    return {
      icon,
      title: c[`service${i}Title`],
      text: c[`service${i}Text`],
      details: Array.from({ length: n }, (_, k) => ({
        title: c[`service${i}Detail${k + 1}Title`],
        text: c[`service${i}Detail${k + 1}Text`],
      })),
    }
  })

  const why = [BadgeCheck, FileText, Handshake].map((icon, idx) => ({
    icon,
    title: c[`why${idx + 1}Title`],
    text: c[`why${idx + 1}Text`],
  }))

  return (
    <div className="bg-[#f7f5f0] text-[#173649]">

      {/* Hero: من غير صورة في الموبايل + أقصر */}
      <section className="relative overflow-hidden bg-[#173649] py-8 lg:py-[65px]">
        <div className="absolute inset-0 hidden bg-gradient-to-l from-[#173649] via-[#173649] to-[#21485d] lg:block" />
        <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full border border-[#a5854e]/20" />
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#a5854e]/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div className="text-white">
              <div className="group mb-4 inline-flex cursor-default items-center gap-2.5 rounded-full border border-[#a5854e]/50 bg-white/10 px-4 py-2 text-xs text-[#e0c78c] sm:text-sm lg:mb-7 lg:gap-3 lg:px-5 lg:py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#a5854e] transition-transform duration-300 group-hover:scale-[1.45]" />
                {c.heroBadge}
              </div>

              <h1 className="mb-3 max-w-[720px] text-[24px] font-bold leading-[1.6] text-white sm:text-[30px] lg:mb-6 lg:text-[39px] lg:leading-[1.65]">
                <span className="text-[#a5854e]">{c.heroGold1}</span>{" "}
                {c.heroMid} <span className="text-[#a5854e]">{c.heroGold2}</span>
              </h1>

              <p className="mb-5 max-w-[650px] text-[14px] leading-7 text-white/75 lg:mb-8 lg:text-[17px] lg:leading-8">
                {c.heroText}
              </p>

              <Link to="/contact" className="animate-soft-bounce inline-flex items-center justify-center gap-2 rounded-xl bg-[#a5854e] px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:animate-none hover:bg-[#967743] sm:gap-3 sm:px-8 sm:py-4 sm:text-base">
                {c.heroButton}
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>

            <div className="hidden justify-end lg:flex">
              <div className="h-[300px] w-full max-w-[390px] overflow-hidden rounded-[24px] border border-white/10 shadow-2xl">
                <img src={heroImg} alt="المحاسبة والاستشارات الضريبية" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Importance */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionTitle>{c.importanceTitle}</SectionTitle>

          <p className="mx-auto mb-8 max-w-3xl text-center text-[14px] leading-7 text-[#173649]/80 md:mb-12 md:text-[15px] md:leading-8">
            {c.importanceIntro}
          </p>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {importance.map((item, i) => (
              <ImportanceCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionTitle>{c.servicesTitle}</SectionTitle>

          <div className="grid items-start gap-4 md:grid-cols-2 md:gap-7">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionTitle>{c.whyTitle}</SectionTitle>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {why.map((item, i) => (
              <InfoCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}