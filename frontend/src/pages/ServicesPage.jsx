import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { services } from "../data/services"

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden bg-[#f7f5f0]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#173649] to-[#0f2735] py-14 text-center md:py-20">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#a5854e]/15" />
        <div className="absolute -bottom-20 -left-12 h-60 w-60 rounded-full bg-[#a5854e]/10" />
        <div className="relative mx-auto max-w-[1120px] px-5">
          <h1 className="text-4xl font-bold text-[#a5854e] md:text-5xl">خدماتنا</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-[22px] md:leading-8">
            نقدم حلولًا محاسبية وضريبية متكاملة تساعدك على الالتزام بالقوانين وتحقيق النمو لأعمالك.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <div className="group mb-8 text-center md:mb-10">
          <h2 className="inline-flex items-center gap-3 text-2xl font-bold text-[#173649] md:text-3xl">
            <span className="h-[3px] w-8 rounded-full bg-[#a5854e] transition-all duration-500 group-hover:w-14" />
            اختر الخدمة
            <span className="h-[3px] w-8 rounded-full bg-[#a5854e] transition-all duration-500 group-hover:w-14" />
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group flex items-center justify-between rounded-full border border-[#ddd7cc] bg-[#fdfcf9] px-6 py-4 shadow-sm transition-all duration-300 hover:border-[#a5854e] hover:bg-white hover:shadow-lg md:px-9 md:py-6"
            >
              <span className="text-lg font-bold text-[#173649] transition-colors duration-300 group-hover:text-[#8a6a35] md:text-2xl">
                {service.title}
              </span>
              <ChevronLeft
                strokeWidth={2.5}
                className="h-6 w-6 text-[#a5854e] transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:text-[#8a6a35] md:h-7 md:w-7"
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}