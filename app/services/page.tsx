"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SERVICES } from "@/lib/constants"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { translations, getServiceDescription, getServiceName } from "@/lib/i18n/translations"

export default function ServicesPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Grid Layout with Logo in Middle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Left Column - First 2 services */}
            <div className="space-y-12 md:space-y-16 md:col-span-1">
              {SERVICES.slice(0, 2).map((service) => (
                <div key={service.id} className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                    {getServiceName(service.slug, language)}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {getServiceDescription(service.slug, language)}
                  </p>
                </div>
              ))}
            </div>

            {/* Middle Column - Logo */}
            <div className="flex items-center justify-center md:col-span-1 order-3 md:order-2">
                <Image
                  src="/logo.png"
                  alt="INZU SMART"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
            </div>

            {/* Right Column - Last 3 services */}
            <div className="space-y-12 md:space-y-16 md:col-span-1 order-2 md:order-3">
              {SERVICES.slice(2).map((service) => (
                <div key={service.id} className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                    {getServiceName(service.slug, language)}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {getServiceDescription(service.slug, language)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

