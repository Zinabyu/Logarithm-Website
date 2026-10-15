import { createContext, useCallback, useContext, useEffect, useState } from "react"

export const API = import.meta.env.VITE_API_URL || "http://localhost:5000"
const ContentContext = createContext({ pages: {}, loaded: false, refresh: async () => {} })

export function ContentProvider({ children }) {
  const [state, setState] = useState({ pages: {}, loaded: false })

  // بيجيب المحتوى من الباك اند (بيتنادى أول مرة، وبعد كل حفظ من لوحة التحكم)
  const refresh = useCallback(
    () =>
      fetch(`${API}/api/content`)
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({}))
        .then((pages) => setState({ pages, loaded: true })),
    []
  )

  useEffect(() => {
    refresh()
  }, [refresh])

  return <ContentContext.Provider value={{ ...state, refresh }}>{children}</ContentContext.Provider>
}

// لوحة التحكم بتستخدم ده عشان تقرا النصوص المحفوظة وتعمل refresh بعد الحفظ
export function useContent() {
  return useContext(ContentContext)
}

// بيرجع النص المحفوظ لو موجود، ولو لأ بيرجع النص الافتراضي
export function usePage(key, defaults = {}) {
  const { pages } = useContext(ContentContext)
  const saved = pages[key]?.data || {}
  const data = { ...defaults }
  for (const [k, v] of Object.entries(saved)) {
    if (v !== undefined && v !== null && v !== "") data[k] = v
  }
  return { data, seo: pages[key]?.seo || {} }
}
