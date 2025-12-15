"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import type { Property } from "@/lib/types/property"

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/property/${property.id}`}>
      <div
        className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up cursor-pointer"
        style={{ animationDelay: `${index * 0.1}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 transition-all duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="text-white transform transition-transform duration-500"
              style={{ transform: isHovered ? "translateY(0)" : "translateY(20px)" }}
            >
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">{property.title}</h3>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm uppercase tracking-wide">{property.location}</span>
              </div>
            </div>
          </div>

          <div
            className={`absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-500 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <ArrowRight className="w-5 h-5 text-gray-800" />
          </div>
        </div>
      </div>
    </Link>
  )
}
