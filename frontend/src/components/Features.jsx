import { BadgeCheck, Clock3, Handshake, ShieldCheck } from "lucide-react"
import { usePage } from "../context/ContentContext.jsx"
import { HOME_DEFAULTS } from "../data/defaults.js"

// الأيقونات ثابتة في الكود، والنصوص بتيجي من لوحة التحكم
const ICONS = [BadgeCheck, Handshake, ShieldCheck, Clock3]

function Features() {
  const { data: c } = usePage("home", HOME_DEFAULTS)

  const features = ICONS.map((icon, idx) => ({
    icon,
    title: c[`feature${idx + 1}Title`],
    description: c[`feature${idx + 1}Text`],
  }))

  return (
    <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-5 md:-mt-14 md:px-6">
      <div className="grid gap-3 md:grid-cols-4 md:gap-0 md:rounded-3xl md:border-x-4 md:border-[#a5854e] md:bg-white md:shadow-xl">
        {features.map(({ icon: Icon, title, description }, i) => (
          <div
            key={i}
            className={`group flex cursor-default items-center gap-4 rounded-2xl bg-white px-5 py-3.5 shadow-md transition-all duration-300 hover:shadow-xl md:flex-col md:gap-0 md:px-6 md:py-8 md:text-center md:shadow-none md:hover:relative md:hover:z-10 md:hover:shadow-[0_14px_34px_rgba(23,54,73,0.2)] ${
              i !== features.length - 1 ? "md:border-l md:border-gray-200" : ""
            }`}
          >
            <Icon strokeWidth={1.7} className="h-9 w-9 shrink-0 text-[#c9a65a] transition-colors duration-500 group-hover:text-[#8a6a35] md:mb-4 md:h-11 md:w-11" />

            <div>
              <h3 className="text-base font-extrabold text-[#173649] md:mb-2 md:text-xl">{title}</h3>
              <p className="text-[13px] font-medium leading-6 text-[#173649]/70 md:text-sm">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features