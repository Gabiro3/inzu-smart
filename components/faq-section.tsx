"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FAQ_ITEMS } from "@/lib/constants"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our AI-powered real estate solutions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed animate-fade-in-up">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
