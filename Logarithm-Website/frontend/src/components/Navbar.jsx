import { ArrowLeft, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logo.jpg"

const links = [
  { label: "الرئيسية", to: "/", end: true, home: true },
  { label: "من نحن", to: "/about" },
  { label: "خدماتنا", to: "/services" },
 
  { label: "تواصل معنا", to: "/contact" },
]

const desktopLink = (home) => ({ isActive }) =>
  `relative rounded-lg px-4 py-2 text-[16px] font-bold transition-all duration-300 active:scale-95
   after:absolute after:-bottom-0.5 after:inset-x-4 after:h-[2px] after:origin-right
   after:bg-[#a5854e] after:transition-transform after:duration-300 after:ease-out
   ${home ? "bg-[#a5854e]/15" : isActive ? "" : "hover:bg-[#a5854e]/5 active:bg-[#a5854e]/10"}
   ${
     isActive
       ? "text-[#a5854e] after:scale-x-100"
       : "text-[#173649] after:scale-x-0 hover:text-[#a5854e] hover:after:scale-x-100"
   }`

const mobileLink = (home) => ({ isActive }) =>
  `relative block w-fit rounded-lg px-4 py-2 text-[16px] font-bold transition-all duration-300 active:scale-95
   after:absolute after:-bottom-0.5 after:inset-x-4 after:h-[2px] after:origin-right
   after:bg-[#a5854e] after:transition-transform after:duration-300 after:ease-out
   ${home ? "bg-[#a5854e]/15" : isActive ? "" : "active:bg-[#a5854e]/10"}
   ${isActive ? "text-[#a5854e] after:scale-x-100" : "text-[#173649] after:scale-x-0"}`

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"))

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e0d5] bg-[#fdfcf9]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logarithm"
            className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop links (nudged toward the left) */}
        <div className="hidden items-center gap-3 md:flex lg:-translate-x-26">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={desktopLink(link.home)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Left side: mobile menu + back button */}
        <div className="flex items-center gap-3 md:justify-self-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="القائمة"
            className="text-[#173649] transition-transform duration-300 active:scale-90 md:hidden"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {pathname !== "/" && (
            <button
              onClick={goBack}
              aria-label="رجوع"
              className="group flex h-8 items-center overflow-hidden rounded-full bg-[#173649] px-2 text-[#e0c78c] shadow-md ring-1 ring-[#a5854e]/40 transition-all duration-500 hover:bg-[#a5854e] hover:text-white hover:shadow-lg active:scale-95 md:h-10 md:px-2.5"
            >
              <ArrowLeft
                strokeWidth={2.4}
                className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:-translate-x-0.5 md:h-5 md:w-5"
              />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-500 group-hover:ms-2 group-hover:max-w-[60px] group-hover:opacity-100">
                رجوع
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`grid transition-all duration-300 ease-out md:hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 border-t border-[#e7e0d5] px-6 py-5 text-right">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setIsOpen(false)}
                className={mobileLink(link.home)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar