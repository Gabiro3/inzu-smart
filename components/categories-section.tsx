"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CATEGORIES } from "@/lib/constants"

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Categories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete range of architectural and construction services accessible through our AI-powered platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm opacity-90 mb-4 line-clamp-2">{category.description}</p>
                <Button variant="ghost" className="text-white hover:bg-white/20 p-0 h-auto">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
