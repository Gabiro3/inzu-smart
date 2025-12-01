"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { COMPANY_INFO } from "@/lib/constants"
import { Building2, Users, Target, Lightbulb, Globe, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>About {COMPANY_INFO.name}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Building smarter, living better.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {COMPANY_INFO.purpose}
            </p>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-3"
              onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
            >
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Company Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Founded in {COMPANY_INFO.founded}, {COMPANY_INFO.name} is an architecture and construction solutions company supported by an AI-powered digital platform. Based in {COMPANY_INFO.locations}, the company aims to democratize access to smart, affordable, and culturally relevant housing across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What We Do</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The company offers a complete range of architectural and construction services, all accessible through our online platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Architectural Design</h3>
                <p className="text-gray-600">
                  Interior, exterior, residential, and commercial design services tailored to your needs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">3D Modeling & Rendering</h3>
                <p className="text-gray-600">
                  High-quality 3D modeling and photo-realistic rendering to visualize your project.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Cost Estimation</h3>
                <p className="text-gray-600">
                  AI-powered cost and material estimation to help you plan your project budget accurately.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Construction Consultation</h3>
                <p className="text-gray-600">
                  Expert guidance for building, buying, or selling property with project supervision and progress tracking.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Contractor Directory</h3>
                <p className="text-gray-600">
                  A digital directory connecting you to local contractors and suppliers in your area.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Learning Resources</h3>
                <p className="text-gray-600">
                  Educational resources for self-builders and young architects to enhance their skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Design Philosophy</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {COMPANY_INFO.designPhilosophy}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {COMPANY_INFO.vision}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {COMPANY_INFO.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">Who We Serve</h2>
            <p className="text-xl text-gray-600 text-center mb-8">
              {COMPANY_INFO.name} serves homeowners, developers, real estate investors, self-builders, and anyone seeking professional architectural or construction support.
            </p>
          </div>
        </div>
      </section>

      {/* Expected Impact */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Expected Impact</h2>
            <p className="text-xl text-gray-700 mb-8">
              {COMPANY_INFO.name} aims to improve housing quality, reduce construction errors, support local economies, and make professional design accessible to everyone.
            </p>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-3 text-lg"
              onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

