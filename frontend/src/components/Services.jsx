import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Building2, Calculator, FileText } from "lucide-react"

import accountingImage from "../assets/accounting.jpg"
import vatImage from "../assets/vat.jpg"
import corporateTaxImage from "../assets/corporate-tax.jpg"
import { usePage } from "../context/ContentContext.jsx"
import { HOME_DEFAULTS } from "../data/defaults.js"

// الروابط والأيقونات والصور ثابتة في الكود، والنصوص بتيجي من لوحة التحكم
const CARDS = [
  { to: "/services/accounting", icon: Building2, image: accountingImage },
  { to: "/services/vat", icon: FileText, image: vatImage },
  { to: "/services/corporate-tax", icon: Calculator, image: corporateTaxImage },
]

function Services() {
  const { data: c } = usePage("home", HOME_DEFAULTS)

  const services = CARDS.map((card, idx) => ({
    ...card,
    title: c[`svc${idx + 1}Title`],
    description: c[`svc${idx + 1}Text`],
  }))

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="px-5 py-14 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 text-center md:mb-14">
          <div className="group mb-3 flex cursor-default items-center justify-center gap-3 md:mb-4 md:gap-5">
            <span className="h-[2px] w-8 shrink-0 bg-[#a5854e] transition-all duration-300 group-hover:w-14 md:w-16 md:group-hover:w-24" />
            <h2 className="text-2xl font-extrabold text-[#173649] transition-colors duration-300 group-hover:text-[#a5854e] md:text-4xl">{c.svcTitle}</h2>
            <span className="h-[2px] w-8 shrink-0 bg-[#a5854e] transition-all duration-300 group-hover:w-14 md:w-16 md:group-hover:w-24" />
          </div>
          <p className="text-sm font-medium text-[#173649]/70 md:text-base">{c.svcSub}</p>
        </div>

        <div className="mx-auto grid max-w-lg gap-5 md:max-w-none md:grid-cols-3 md:gap-8">
          {services.map(({ to, icon: Icon, image, title, description }, i) => (
            <div
              key={to}
              style={{ transitionDelay: visible ? "0ms" : `${i * 150}ms` }}
              className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              <Link
                to={to}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:shadow-xl"
              >
                <div className="relative h-32 overflow-hidden md:h-44">
                  <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173649]/30 to-transparent" />

                  <div className="absolute right-4 top-3 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-[#f7f4ee] shadow-md transition-colors duration-500 group-hover:bg-[#fbf6ea] md:right-5 md:top-4 md:h-[60px] md:w-[60px] md:border-4">
                    <Icon strokeWidth={1.5} className="h-5 w-5 text-[#a5854e] transition-colors duration-500 group-hover:text-[#8a6a35] md:h-7 md:w-7" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-6 text-right md:px-6 md:pb-7 md:pt-7">
                  <h3 className="mb-3 text-lg font-extrabold text-[#173649] md:text-[22px]">{title}</h3>

                  <p className="mb-5 flex-1 text-sm font-medium leading-7 text-[#173649]/75 md:mb-6 md:text-[15px]">{description}</p>

                  <span className="inline-flex items-center gap-2 self-start rounded-lg bg-[#a5854e] px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 group-hover:bg-[#967743] group-hover:shadow-md md:px-6 md:py-3">
                    {c.svcButton}
                    <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services