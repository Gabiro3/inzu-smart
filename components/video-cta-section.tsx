"use client"

import { Button } from "@/components/ui/button"
import { COMPANY_INFO } from "@/lib/constants"

export function VideoCTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/contrast_villa.jpg"
          alt="INZU SMART Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl lg:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
          Building smarter, living better.
        </h2>

        <Button 
          className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold"
          onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
        >
          Book a Consultation
        </Button>
      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 text-white py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-8 font-semibold">SMART, AFFORDABLE, AND CULTURALLY RELEVANT HOUSING ACROSS AFRICA</span>
          <span className="mx-8 font-semibold">AI-POWERED ARCHITECTURAL DESIGN AND CONSTRUCTION SOLUTIONS</span>
          <span className="mx-8 font-semibold">SMART, AFFORDABLE, AND CULTURALLY RELEVANT HOUSING ACROSS AFRICA</span>
          <span className="mx-8 font-semibold">AI-POWERED ARCHITECTURAL DESIGN AND CONSTRUCTION SOLUTIONS</span>
        </div>
      </div>
    </section>
  )
}
