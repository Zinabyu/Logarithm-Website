
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import CorporateTaxPage from "./pages/CorporateTaxPage"
import VatPage from "./pages/VatPage"
import AccountingPage from "./pages/AccountingPage"
import Footer from "./components/Footer"
import ContactPage from "./pages/ContactPage"
import AdminPage from "./pages/AdminPage"
import SEO from "./components/SEO"

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith("/admin")

  const seoPageKey = {
    "/": "home",
    "/about": "about",
    "/services": "services",
    "/services/corporate-tax": "corporate-tax",
    "/services/vat": "vat",
    "/services/accounting": "accounting",
    "/contact": "contact",
  }[pathname] || "home"

  return (
    <>
      {!isAdmin && <SEO pageKey={seoPageKey} />}
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/corporate-tax" element={<CorporateTaxPage />} />
        <Route path="/services/vat" element={<VatPage />} />
        <Route path="/services/accounting" element={<AccountingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  )
}
