import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import logo from "../assets/logo.jpg"
import { usePage } from "../context/ContentContext.jsx"
import { SITE_DEFAULTS } from "../data/defaults.js"

// الأيقونات ثابتة في الكود، والروابط بتيجي من لوحة التحكم
const icons = {
  whatsapp: (
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
}

// لو الرابط مش بيبدأ بـ http بنخليه "#" عشان ميبوظش
const safeUrl = (u) => (/^https?:\/\//i.test((u || "").trim()) ? u.trim() : "#")

export default function Footer() {
  const { data: s } = usePage("site", SITE_DEFAULTS)

  const whatsappHref = `https://wa.me/${s.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(s.whatsappMessage)}`

  const navLinks = [
    { label: s.navHome, to: "/" },
    { label: s.navAbout, to: "/about" },
    { label: s.navServices, to: "/services" },
    { label: s.navBlog, to: "/blog" },
    { label: s.navContact, to: "/contact" },
  ]

  const socials = [
    { label: "WhatsApp", href: whatsappHref, filled: true, icon: icons.whatsapp },
    { label: "Facebook", href: safeUrl(s.facebookUrl), icon: icons.facebook },
    { label: "Instagram", href: safeUrl(s.instagramUrl), icon: icons.instagram },
    { label: "LinkedIn", href: safeUrl(s.linkedinUrl), icon: icons.linkedin },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#173649] px-5 pb-5 pt-8 md:px-12 md:pb-6 md:pt-10">
      <div className="absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full border border-[#a5854e]/20" />
      <div className="absolute -right-20 -top-40 h-[450px] w-[450px] rounded-full border border-[#a5854e]/10" />

      <div className="relative mx-auto max-w-6xl">
        {/* Top: logo (فوق في الموبايل / جنب في الديسكتوب) + text */}
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-start">
            <h2 className="mb-5 text-xl font-bold leading-[1.8] text-white md:mb-6 md:text-2xl">
              {s.footerTitle1}
              <br />
              {s.footerTitle2}
            </h2>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-[#a5854e] px-7 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#967743] hover:shadow-md"
            >
              {s.footerButton}
              <ArrowLeft size={20} />
            </Link>
          </div>

          {/* order-first = فوق الكلام في الموبايل، وفي الديسكتوب بيرجع مكانه */}
          <div className="order-first flex shrink-0 items-center justify-center md:order-none">
            <img
              src={logo}
              alt="لوغاريتم للمحاسبة والاستشارات الضريبية"
              style={{ filter: "invert(1) hue-rotate(180deg)", mixBlendMode: "screen" }}
              className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105 md:h-20"
            />
          </div>
        </div>

        {/* Line */}
        <div className="my-5 h-px w-full bg-gradient-to-l from-transparent via-[#a5854e]/60 to-transparent md:my-6" />

        {/* Links (ديسكتوب بس) + socials */}
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <nav className="hidden flex-wrap justify-center gap-x-8 gap-y-3 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white/75 transition-colors duration-200 hover:text-[#a5854e]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#a5854e]/50 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:bg-[#a5854e] hover:text-white md:h-10 md:w-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[15px] w-[15px] md:h-[18px] md:w-[18px]"
                  fill={item.filled ? "currentColor" : "none"}
                  stroke={item.filled ? "none" : "currentColor"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/50 md:mt-5 md:text-sm">
          {s.footerCopyright} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}