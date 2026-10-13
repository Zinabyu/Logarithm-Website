import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BadgeCheck, Calculator, ChevronDown, FileCheck2, Handshake, Layers, Scale, ScrollText, ShieldCheck, Target } from "lucide-react"
import heroImg from "../assets/hero-illustration.jpg"
import sideImg from "../assets/aboutsection.jpg"

const values = [
  { icon: BadgeCheck, title: "الاعتماد والتمثيل الرسمي", text: "بصفتنا وكيل ضريبي معتمد، نلتزم بالتمثيل القانوني والمهني المباشر والدقيق أمام الهيئة الاتحادية للضرائب." },
  { icon: Scale, title: "الانضباط والدقة", text: "التعامل مع القوائم والمعاملات المالية بمعايير محاسبية صارمة تمنع الأخطاء وتضمن سلامة الموقف المالي." },
  { icon: ShieldCheck, title: "الوقاية والحماية المالية", text: "الحفاظ على أمان الملف الضريبي للشركة وتجنب المخاطر والغرامات الناتجة عن أخطاء القيد أو التفسير الضريبي." },
  { icon: Handshake, title: "الشراكة المستدامة", text: "العمل عن قرب مع الإدارة كفريق مالي متكامل يسهم في بناء القرارات واستقرار الأعمال." },
]

const vision = [
  { icon: Target, title: "رؤيتنا", text: "أن نكون نموذجاً مرجعياً في تقديم الخدمات المحاسبية والتمثيل الضريبي في دولة الإمارات، من خلال إرساء حلول مالية دقيقة ومحكمة تتوافق تماماً مع الأنظمة والتشريعات المحلية." },
  { icon: ScrollText, title: "رسالتنا", text: "تمكين مؤسسات الأعمال من إدارة دوراتها المالية بثقة والامتثال التام لمتطلبات الهيئة الاتحادية للضرائب، عبر التكامل المباشر بين التطبيق المحاسبي الصحيح والتخطيط الضريبي الوقائي." },
]

const pillars = [
  { icon: Calculator, title: "أولاً: الخبرة المحاسبية التأسيسية", text: "بناء وتوجيه الدفاتر والقوائم المالية وفق المعايير الدولية، لضمان حصول الإدارة على صورة واقعية وشاملة عن أداء الشركة وربحيتها." },
  { icon: FileCheck2, title: "ثانياً: التوجيه والامتثال الضريبي التخصصي", text: "صياغة ومعالجة كافة البيانات المحاسبية لتكون منذ لحظة القيد الأولى مهيأة ومتوافقة مع قانون ضريبة القيمة المضافة وضريبة الشركات." },
]

const wrap = "mx-auto max-w-7xl px-5 lg:px-10"
const card = "rounded-2xl border border-[#ddd7cc] border-r-4 border-r-[#a5854e] bg-[#fdfcf9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a5854e] hover:shadow-xl"
const body = "text-[15px] font-medium leading-8 text-[#173649]/85"
const bodySm = "text-[14px] font-medium leading-7 text-[#173649]/85 md:text-[15px] md:leading-8"
// الحجم بيتحدد في كل مكان لوحده
const iconBox = "flex shrink-0 items-center justify-center rounded-full border border-[#e3d5b9] bg-[#f3eee4] text-[#a5854e] transition-colors duration-500 group-hover:text-[#7a5a2b]"
const dots = { backgroundImage: "radial-gradient(rgba(165,133,78,.14) 1.2px, transparent 1.2px)", backgroundSize: "26px 26px" }

function Expand({ open, children }) {
  return (
    <div className={`grid transition-all duration-700 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

function MoreButton({ open, onClick, more = "اقرأ المزيد", less = "عرض أقل" }) {
  return (
    <button onClick={onClick} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#a5854e] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#967743] hover:shadow-md">
      {open ? less : more}
      <ChevronDown size={18} className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
    </button>
  )
}

function SectionTitle({ children }) {
  return (
    <div className="group mb-10 flex cursor-default items-center justify-center gap-3 md:mb-12 md:gap-4">
      <span className="h-[2px] w-6 shrink-0 bg-[#a5854e] transition-all duration-300 group-hover:w-10 md:w-14 md:group-hover:w-20" />
      <h2 className="text-xl font-extrabold leading-snug text-[#173649] transition-colors duration-300 group-hover:text-[#a5854e] md:text-3xl">{children}</h2>
      <span className="h-[2px] w-6 shrink-0 bg-[#a5854e] transition-all duration-300 group-hover:w-10 md:w-14 md:group-hover:w-20" />
    </div>
  )
}

export default function AboutPage() {
  const [philosophy, setPhilosophy] = useState(false)
  const [diff, setDiff] = useState(false)
  const [accred, setAccred] = useState(false)

  // طول الصورة = طول الكارت - طول الجزء المتمدد (ثابت وقت الأنيميشن)
  const cardRef = useRef(null)
  const expRef = useRef(null)
  const [imgH, setImgH] = useState(null)

  useEffect(() => {
    const card = cardRef.current
    const exp = expRef.current
    if (!card || !exp) return

    const measure = () => setImgH(card.offsetHeight - exp.offsetHeight)

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(card)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="overflow-x-hidden bg-[#f7f5f0] text-[#173649]" style={dots}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-4 border-[#a5854e] bg-[#173649] py-12 md:py-20">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover object-left" />
        <div className="absolute inset-0 bg-[#173649]/80 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-l from-[#173649] from-30% via-[#173649]/85 via-50% to-transparent to-80% md:block" />

        <div className={`${wrap} relative`}>
          <div className="max-w-[560px] text-white">
            <span className="group mb-5 inline-flex max-w-full cursor-default items-center gap-3 rounded-full border border-[#a5854e]/40 bg-white/10 px-4 py-2 text-xs font-medium text-[#e8dcc0] transition-all duration-300 hover:border-[#a5854e] hover:bg-white/15 hover:text-white sm:px-5 sm:text-sm">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#a5854e] transition-transform duration-300 group-hover:scale-[1.6]" />
              لوغاريتم للمحاسبة والاستشارات الضريبية
            </span>

            <h1 className="text-[28px] font-extrabold leading-[1.5] md:text-[40px]">
              دعمكم للامتثال الضريبي،
              <span className="block text-[#a5854e]">ودقة الحسابات</span>
            </h1>

            <p className="mb-6 mt-4 text-[15px] font-medium leading-8 text-white/80 md:text-[16px]">
              نحول بياناتك المالية إلى رؤى واضحة وتوصيات عملية تدعمك في اتخاذ القرارات، بينما نتولى عنك تعقيدات المحاسبة والضرائب.
            </p>

            <Link to="/contact" className="animate-soft-bounce inline-flex items-center justify-center gap-2 rounded-lg bg-[#a5854e] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:animate-none hover:bg-[#967743] md:gap-3 md:rounded-xl md:px-7 md:py-3 md:text-base">
              احجز استشارتك الآن
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy + image */}
      <section className={`${wrap} grid items-start gap-8 py-12 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-10`}>
        <div ref={cardRef} className={`${card} p-6 md:p-10`}>
          <h2 className="mb-4 text-xl font-extrabold md:text-3xl">فلسفة الاسم والمنهج</h2>
          <p className={body}>
            تأسست لوغاريتم للمحاسبة والاستشارات الضريبية في دبي لتكون الشريك المالي المستدام للشركات ومؤسسات الأعمال والأفراد في دولة الإمارات العربية المتحدة.
          </p>

          <div ref={expRef}>
            <Expand open={philosophy}>
              <div className="space-y-4 pt-4">
                <p className={body}>
                  جاء اختيار اسم «لوغاريتم» مستلهماً من المفهوم الرياضي القائم على تفكيك الأرقام المعقدة إلى صور مبسطة وقابلة للحل والإدارة. وفي عالم المال والضرائب، تمثل المعاملات اليومية والتشريعات الضريبية بيئة متداخلة تتطلب معالجة دقيقة بدون مساحة للخطأ.
                </p>
                <p className={body}>
                  دورنا في لوغاريتم يتجاوز القيد التقليدي؛ نحن نعمل على فك تعقيد المشهد المالي والضريبي لشركتك، وتحويل المعاملات والمتطلبات التشريعية إلى مسار سهل ومنظم يتسم بالوضوح المطلق والدقة الضريبية، مما يتيح للإدارة التركيز الكامل على نمو وتوسيع الأعمال.
                </p>
              </div>
            </Expand>
          </div>

          <MoreButton open={philosophy} onClick={() => setPhilosophy(!philosophy)} />
        </div>

        {/* الصورة: طولها = طول الكارت وهو مقفول، ومخفية في الموبايل والتابلت */}
        <div
          className="hidden min-h-[240px] overflow-hidden rounded-2xl border border-[#ddd7cc] lg:block"
          style={imgH ? { height: imgH } : undefined}
        >
          <img src={sideImg} alt="" className="h-full w-full object-cover object-center" />
        </div>
      </section>

      {/* Accreditation: no background, icon beside title, hover = lighter navy */}
      <section className={`${wrap} pb-12 md:pb-20`}>
        <div className="group cursor-default px-1 md:px-2">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e3d5b9] text-[#a5854e] transition-colors duration-300 group-hover:border-[#3d6785] group-hover:text-[#3d6785] md:h-16 md:w-16">
              <BadgeCheck className="h-6 w-6 md:h-9 md:w-9" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-extrabold leading-snug text-[#173649] transition-colors duration-300 group-hover:text-[#3d6785] md:text-2xl">
              الصفة والاعتماد الرسمي (الوكيل الضريبي المعتمد)
            </h3>
          </div>

          <p className={`${bodySm} mt-3 transition-colors duration-300 group-hover:text-[#3d6785] md:mt-4`}>
            بصفتنا وكيل ضريبي معتمد ومسجل لدى الهيئة الاتحادية للضرائب، نمنح ملف شركتك المالي والضريبي الغطاء القانوني والاعتماد الرسمي اللازم.
          </p>
          <Expand open={accred}>
            <p className={`${bodySm} pt-2 transition-colors duration-300 group-hover:text-[#3d6785]`}>
              وذلك أمام السلطات الضريبية وفق أحكام قانون الإجراءات الضريبية في دولة الإمارات العربية المتحدة.
            </p>
          </Expand>
          <MoreButton open={accred} onClick={() => setAccred(!accred)} more="عرض المزيد" less="عرض أقل" />
        </div>
      </section>

      {/* Vision / Mission */}
      <section className={`${wrap} pb-12 md:pb-20`}>
        <SectionTitle>رؤيتنا ورسالتنا</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {vision.map(({ icon: Icon, title, text }) => (
            <article key={title} className={`${card} group px-4 py-5 md:p-10`}>
              <div className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4">
                <div className={`${iconBox} h-11 w-11 md:h-16 md:w-16`}><Icon className="h-5 w-5 md:h-[30px] md:w-[30px]" strokeWidth={1.6} /></div>
                <h3 className="text-lg font-extrabold md:text-2xl">{title}</h3>
              </div>
              <p className={bodySm}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className={`${wrap} pb-12 md:pb-20`}>
        <SectionTitle>قيمنا الجوهرية</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className={`${card} group px-4 py-5 sm:p-6 sm:text-center`}>
              <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:flex-col sm:gap-4">
                <div className={`${iconBox} h-11 w-11 sm:h-16 sm:w-16`}><Icon className="h-5 w-5 sm:h-[30px] sm:w-[30px]" strokeWidth={1.6} /></div>
                <h3 className="text-base font-extrabold sm:text-lg">{title}</h3>
              </div>
              <p className={bodySm}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className={`${wrap} pb-14 md:pb-20`}>
        <SectionTitle>ما يميزنا</SectionTitle>
        <div className={`${card} group px-4 py-5 md:p-10`}>
          <div className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4">
            <div className={`${iconBox} h-11 w-11 md:h-16 md:w-16`}><Layers className="h-5 w-5 md:h-7 md:w-7" strokeWidth={1.6} /></div>
            <h3 className="text-lg font-extrabold md:text-2xl">التكامل المحاسبي والضريبي</h3>
          </div>
          <p className={bodySm}>
            غالبًا ما تواجه الشركات فجوة بين العمل المحاسبي اليومي ومتطلبات الامتثال الضريبي، حيث يُنفصل التوثيق عن التكليف.
          </p>

          <Expand open={diff}>
            <div className="pt-4">
              <p className={bodySm}>
                في لوغاريتم، نلغي الحاجة للتنسيق بين محاسب مستقل واستشاري ضريبي خارجي؛ حيث نضمن اتساق الدفاتر المالية مع الإقرارات الضريبية المقدمة للهيئة الاتحادية للضرائب بدون تعارض أو فروقات، وذلك من خلال العمل باتجاهين متكاملين:
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
                {pillars.map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-[#ddd7cc] border-t-4 border-t-[#a5854e] bg-[#f7f5f0] px-4 py-5 md:p-6">
                    <div className="mb-3 flex items-center gap-3 text-[#a5854e]">
                      <Icon size={24} strokeWidth={1.6} className="shrink-0" />
                      <h4 className="text-base font-extrabold text-[#173649]">{title}</h4>
                    </div>
                    <p className={bodySm}>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Expand>

          <MoreButton open={diff} onClick={() => setDiff(!diff)} />
        </div>
      </section>
    </div>
  )
}