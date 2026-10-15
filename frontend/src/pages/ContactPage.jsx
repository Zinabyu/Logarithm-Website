import { useState } from "react"
import { MapPin, Phone, Mail, MessageCircle, Send, ArrowLeft } from "lucide-react"
import logo from "../assets/logo.jpg"
import { usePage } from "../context/ContentContext.jsx"
import { CONTACT_DEFAULTS, SITE_DEFAULTS } from "../data/defaults.js"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const initialValues = { name: "", email: "", phone: "", message: "" }

const validateField = (name, value) => {
  const text = value.trim()

  if (name === "name" && !text) return "الرجاء إدخال الاسم الكامل"
  if (name === "message" && !text) return "الرجاء كتابة رسالتك"
  if (name === "email") {
    if (!text) return "الرجاء إدخال البريد الإلكتروني"
    if (!EMAIL_REGEX.test(text)) return "البريد الإلكتروني غير صالح"
  }

  return ""
}

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-[#fdfcf9] px-5 py-3.5 text-[15px] font-medium text-[#173649] outline-none transition placeholder:text-[#173649]/70 focus:ring-2 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-[#cfc7b8] focus:border-[#a5854e] focus:ring-[#a5854e]/20"
  }`

function FieldError({ text }) {
  if (!text) return null

  return <p className="mt-1.5 pr-1 text-sm font-semibold text-red-600">{text}</p>
}

function ContactCard({ icon: Icon, title, lines, action, href }) {
  const isExternal = href.startsWith("http")

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex flex-col items-center rounded-2xl border border-[#ddd7cc] bg-[#fdfcf9] p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:shadow-xl"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3eee4] text-[#a5854e] transition-all duration-300 group-hover:bg-[#a5854e] group-hover:text-white">
        <Icon size={28} strokeWidth={1.7} />
      </div>

      <h3 className="mb-4 text-xl font-extrabold text-[#173649]">{title}</h3>

      <div className="mb-6 flex-1 space-y-2 text-[15px] font-medium leading-7 text-[#173649]/90">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <span className="group/action inline-flex cursor-pointer items-center gap-2 text-[15px] font-bold text-[#8a6a35] transition-all duration-300 hover:scale-105 hover:text-[#5c3d0e]">
        {action}
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover/action:-translate-x-1" />
      </span>
    </a>
  )
}

export default function ContactPage() {
  const { data: c } = usePage("contact", CONTACT_DEFAULTS)
  // بيانات التواصل مشتركة مع الفوتر، فبتيجي من الإعدادات العامة
  const { data: s } = usePage("site", SITE_DEFAULTS)

  // روابط الاتصال بتتبني من البيانات اللي في لوحة التحكم، وبتتنضف عشان متبوظش
  const email = s.email.trim()
  const phoneLink = s.phone.replace(/[^\d+]/g, "")
  const whatsappLink = s.whatsappNumber.replace(/\D/g, "")
  const mapHref = /^https?:\/\//i.test(s.mapLink.trim()) ? s.mapLink.trim() : "#"

  // الأيقونات ثابتة في الكود، والنصوص بتيجي من لوحة التحكم
  const contactCards = [
    { icon: MapPin, title: c.card1Title, lines: [c.card1Line1, c.card1Line2], action: c.card1Action, href: mapHref },
    { icon: Phone, title: c.card2Title, lines: [s.phone, c.card2Line2], action: c.card2Action, href: `tel:${phoneLink}` },
    { icon: Mail, title: c.card3Title, lines: [email, c.card3Line2], action: c.card3Action, href: `mailto:${email}` },
    {
      icon: MessageCircle,
      title: c.card4Title,
      lines: [c.card4Line1, c.card4Line2],
      action: c.card4Action,
      href: `https://wa.me/${whatsappLink}`,
    },
  ]

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
    setSent(false)
  }

  const handleBlur = (e) => {
    const { name, value } = e.target

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      message: validateField("message", values.message),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) return

    const subject = `رسالة جديدة من ${values.name}`
    const body = `الاسم: ${values.name}\nالبريد: ${values.email}\nالهاتف: ${values.phone || "-"}\n\n${values.message}`

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setSent(true)
    setValues(initialValues)
    setErrors({})
  }

  return (
    <div className="bg-[#f7f5f0] text-[#173649]">
      {/* Title */}
      <section className="px-5 pb-12 pt-16 text-center">
        <h1 className="mb-5 text-4xl font-extrabold md:text-5xl">{c.title}</h1>
        <p className="mx-auto max-w-xl text-[16px] font-medium leading-9 text-[#173649]/85">
          {c.introLine1}
          <br />
          {c.introLine2}
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#a5854e]" />
      </section>

      {/* Contact cards */}
      <section className="px-5 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, i) => (
            <ContactCard key={i} {...card} />
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="px-5 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div className="hidden justify-center md:flex">
            <img src={logo} alt="" className="w-72 opacity-[0.08] mix-blend-multiply" />
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-extrabold">{c.formTitle}</h2>
            <p className="mb-7 text-[16px] font-medium text-[#173649]/85">{c.formSub}</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="الاسم الكامل *"
                    className={inputClass(errors.name)}
                  />
                  <FieldError text={errors.name} />
                </div>

                <div>
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="البريد الإلكتروني *"
                    className={inputClass(errors.email)}
                  />
                  <FieldError text={errors.email} />
                </div>
              </div>

              <input
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                placeholder="رقم الهاتف (اختياري)"
                className={inputClass(false)}
              />

              <div>
                <textarea
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="رسالتك *"
                  className={`${inputClass(errors.message)} resize-none`}
                />
                <FieldError text={errors.message} />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#a5854e] px-6 py-4 text-[16px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#967743] hover:shadow-md"
              >
                {c.formButton}
                <Send size={18} className="-scale-x-100" />
              </button>

              {sent && <p className="text-center text-sm font-bold text-[#a5854e]">{c.sentMessage}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}