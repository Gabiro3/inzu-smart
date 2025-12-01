"use client"

import { Button } from "@/components/ui/button"
import { Bed, Bath, Car } from "lucide-react"
import { HERO_CONTENT, COMPANY_INFO } from "@/lib/constants"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="text-white space-y-8 animate-fade-in-up">
            <div className="space-y-2">
              <p className="text-lg opacity-90">{HERO_CONTENT.location}</p>
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">{HERO_CONTENT.title}</h1>
              <p className="text-xl opacity-90 max-w-lg">{HERO_CONTENT.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3"
                onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
              >
                Book a Consultation
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-3 bg-transparent"
                onClick={() => window.location.href = "/about"}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <img
                src="/images/contrast_villa.jpg"
                alt="Futuristic Haven"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />

              {/* Property Info Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="grid grid-cols-3 gap-6 flex-1">
                    {HERO_CONTENT.features.map((feature, index) => (
                      <div key={index} className="text-center">
                        <div className="flex justify-center mb-2">
                          {feature.icon === "bed" && <Bed className="w-6 h-6 text-gray-600" />}
                          {feature.icon === "bath" && <Bath className="w-6 h-6 text-gray-600" />}
                          {feature.icon === "car" && <Car className="w-6 h-6 text-gray-600" />}
                        </div>
                        <p className="font-semibold text-lg">
                          {feature.value} {feature.label.split(" ")[1] || feature.label}
                        </p>
                        <p className="text-sm text-gray-600">{feature.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-right ml-6">
                    <p className="text-3xl font-bold">{HERO_CONTENT.price}</p>
                    <p className="text-sm text-gray-600">{HERO_CONTENT.priceLabel}</p>
                    <Button 
                      className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6"
                      onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
