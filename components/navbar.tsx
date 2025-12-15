"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { COMPANY_INFO, NAVIGATION_ITEMS, SERVICE_NAV_ITEMS } from "@/lib/constants"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/i18n/translations"
import Image from "next/image"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const isServiceActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/")
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-black hover:text-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center: Service Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 flex-1 justify-center">
              <Link
                href="/services/architecture"
                className={`text-xs lg:text-sm font-light uppercase tracking-wide transition-colors px-2 py-1 ${
                  isServiceActive("/services/architecture")
                    ? "text-black border border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t.services.architecture}
              </Link>
              <Link
                href="/services/engineering"
                className={`text-xs lg:text-sm font-light uppercase tracking-wide transition-colors px-2 py-1 ${
                  isServiceActive("/services/engineering")
                    ? "text-black border border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t.services.engineering}
              </Link>
              <Link
                href="/services/consultancy"
                className={`text-xs lg:text-sm font-light uppercase tracking-wide transition-colors px-2 py-1 ${
                  isServiceActive("/services/consultancy")
                    ? "text-black border border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t.services.consultancy}
              </Link>
              <Link
                href="/services/project-management"
                className={`text-xs lg:text-sm font-light uppercase tracking-wide transition-colors px-2 py-1 ${
                  isServiceActive("/services/project-management")
                    ? "text-black border border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t.services.projectManagement}
              </Link>
              <Link
                href="/services/material-supply"
                className={`text-xs lg:text-sm font-light uppercase tracking-wide transition-colors px-2 py-1 ${
                  isServiceActive("/services/material-supply")
                    ? "text-black border border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t.services.materialSupply}
              </Link>
            </div>

            {/* Right: Language Flags */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage("fr")}
                className={`w-8 h-6 transition-all ${
                  language === "fr" ? "scale-110" : "border-none hover:border-none"
                }`}
                aria-label="French language"
                title="Français"
              >
                <Image
                  src="/flags/fr.svg"
                  alt="French flag"
                  width={32}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`w-8 h-6 transition-all ${
                  language === "en" ? "scale-110" : "border-none hover:border-none"
                }`}
                aria-label="English language"
                title="English"
              >
                <Image
                  src="/flags/gb.svg"
                  alt="English flag"
                  width={32}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-black hover:text-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-black hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2 flex-1">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-light uppercase tracking-wide transition-colors py-3 px-4 ${
                    pathname === "/"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {t.nav.home}
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-light uppercase tracking-wide transition-colors py-3 px-4 ${
                    pathname === "/projects" || pathname?.startsWith("/projects")
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {t.nav.projects}
                </Link>
                <Link
                  href="/services"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-light uppercase tracking-wide transition-colors py-3 px-4 ${
                    pathname === "/services" || pathname?.startsWith("/services")
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {t.nav.services}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-light uppercase tracking-wide transition-colors py-3 px-4 ${
                    pathname === "/about"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {t.nav.about}
                </Link>
                <Link
                  href="/contacts"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-light uppercase tracking-wide transition-colors py-3 px-4 ${
                    pathname === "/contacts"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {t.nav.contacts}
                </Link>
              </nav>

              {/* Footer */}
              <div className="pt-8 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image src="/logo.png" alt="INZU SMART" width={200} height={200} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
