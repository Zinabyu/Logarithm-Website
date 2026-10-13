
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import background from "../assets/background.jpg"

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#092d47]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }} />
      <div className="absolute inset-0 bg-[#062a43]/60" />

      <div className="relative mx-auto flex min-h-[320px] max-w-7xl items-center px-6 pb-16 pt-8 md:min-h-[470px] md:pb-24 md:pt-10">
        <div className="max-w-2xl text-right text-white">
          <h1 className="mb-2 text-[26px] font-extrabold leading-snug md:mb-3 md:text-5xl md:leading-snug">
            لوغاريتم للمحاسبة
            <span className="block text-[#a5854e]">والاستشارات الضريبية</span>
          </h1>

          <p className="mb-2 text-base font-bold text-white md:mb-3 md:text-xl">دعمكم للامتثال الضريبي، ودقة الحسابات</p>

          <p className="mb-5 text-sm font-medium leading-7 text-gray-200 md:mb-6 md:text-lg md:leading-8">
            نحول بياناتك المالية إلى رؤى واضحة وتوجيهات عملية تدعمك في اتخاذ القرارات، بينما نتولى عنك تعقيدات المحاسبة والضرائب.
          </p>

          <Link
            to="/contact"
            className="animate-soft-bounce inline-flex items-center gap-2 rounded-lg bg-[#a5854e] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:animate-none hover:bg-[#967743] md:gap-3 md:rounded-xl md:px-8 md:py-3.5 md:text-base"
          >
            احجز استشارتك الآن
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero