"use client"

import { use } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SERVICES, COMPANY_INFO } from "@/lib/constants"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { translations, getServiceDescription, getServiceTitle, getServiceName } from "@/lib/i18n/translations"

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { language } = useLanguage()
  const t = translations[language]
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">{t.services.serviceNotFound}</h1>
            <p className="text-gray-600">{t.services.serviceNotFoundDescription}</p>
            <Link href="/services">
              <Button className="mt-4">{t.services.viewAllServices}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image */}
              <div className="w-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                  {getServiceName(service.slug, language)}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {getServiceDescription(service.slug, language)}
                </p>
                <Button
                  className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-3 uppercase tracking-wide"
                  onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
                >
                  {t.common.bookConsultation}
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Content Section */}
          <div className="mt-20 pt-20 border-t border-gray-200">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">
                {t.services.whyChoose} {getServiceTitle(service.slug, language)} {t.services.services}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t.services.whyChooseDescription} {getServiceTitle(service.slug, language).toLowerCase()} {t.services.whyChooseDescriptionEnd}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t.services.contactUs}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

