"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { COMPANY_INFO } from "@/lib/constants"
import { useLanguage } from "@/contexts/language-context"
import { translations, getCompanyInfo } from "@/lib/i18n/translations"
import Image from "next/image"

export default function AboutPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const companyInfo = getCompanyInfo(language)
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Image src="/logo.png" alt="Inzu Smart" width={300} height={300} />
          </div>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              {companyInfo.tagline}
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            {companyInfo.purpose}
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-wide">
            {t.about.companyOverview}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.about.founded} {COMPANY_INFO.founded}, {COMPANY_INFO.name} {t.about.companyDescription} {COMPANY_INFO.locations}, {t.about.companyAim}
            </p>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-wide">
            {t.about.designPhilosophy}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {companyInfo.designPhilosophy}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">
                {t.about.vision}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {companyInfo.vision}
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">
                {t.about.mission}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {companyInfo.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <Button
            className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-3 uppercase tracking-wide text-lg"
            onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
          >
            {t.common.bookConsultation}
          </Button>
        </div>
      </section>
    </main>
  )
}
