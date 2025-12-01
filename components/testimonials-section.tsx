"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import { TESTIMONIALS } from "@/lib/constants"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const currentTestimonial = TESTIMONIALS[currentIndex]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">What our clients say</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <blockquote className="text-xl leading-relaxed mb-6">"{currentTestimonial.content}"</blockquote>
                <div>
                  <p className="font-semibold text-lg">{currentTestimonial.name}</p>
                  <p className="text-gray-400">{currentTestimonial.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex space-x-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-emerald-500" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <img
                src={currentTestimonial.image || "/placeholder.svg"}
                alt={currentTestimonial.name}
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />

              {/* Decorative border */}
              <div className="absolute -inset-4 border-2 border-emerald-500/30 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
