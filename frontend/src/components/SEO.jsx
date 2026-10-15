
import { useEffect } from "react"
import { usePage } from "../context/ContentContext"

const defaults = {
  home: {
    title: "Logarithm | خدمات المحاسبة والضرائب",
    description: "Logarithm لخدمات المحاسبة والاستشارات الضريبية ودعم الشركات.",
  },
  about: {
    title: "من نحن | Logarithm",
    description: "تعرف على Logarithm وخدماتنا في المحاسبة والاستشارات الضريبية.",
  },
  services: {
    title: "خدماتنا | Logarithm",
    description: "اكتشف خدمات المحاسبة والضرائب التي تقدمها Logarithm للشركات.",
  },
  "corporate-tax": {
    title: "ضريبة الشركات | Logarithm",
    description: "خدمات واستشارات ضريبة الشركات من Logarithm.",
  },
  vat: {
    title: "ضريبة القيمة المضافة | Logarithm",
    description: "خدمات التسجيل والإقرارات والاستشارات الخاصة بضريبة القيمة المضافة.",
  },
  accounting: {
    title: "الخدمات المحاسبية | Logarithm",
    description: "خدمات محاسبية احترافية لدعم أعمال شركتك.",
  },
  contact: {
    title: "تواصل معنا | Logarithm",
    description: "تواصل مع Logarithm للاستفسار عن خدمات المحاسبة والضرائب.",
  },
}

export default function SEO({ pageKey = "home" }) {
  const { seo } = usePage(pageKey)
  const fallback = defaults[pageKey] || defaults.home

  useEffect(() => {
    document.title = seo.title?.trim() || fallback.title

    let meta = document.querySelector('meta[name="description"]')

    if (!meta) {
      meta = document.createElement("meta")
      meta.name = "description"
      document.head.appendChild(meta)
    }

    meta.content = seo.description?.trim() || fallback.description
  }, [seo.title, seo.description, fallback.title, fallback.description])

  return null
}
