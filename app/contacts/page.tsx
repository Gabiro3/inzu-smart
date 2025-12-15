"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { COMPANY_INFO } from "@/lib/constants"
import { Phone, Mail } from "lucide-react"

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase tracking-wide">
            Contacts
          </h1>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold mb-2">Phone</p>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-gray-700 hover:text-black transition-colors block"
                >
                  {COMPANY_INFO.phone}
                </a>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-gray-700 hover:text-black transition-colors block"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold mb-2">Email</p>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

