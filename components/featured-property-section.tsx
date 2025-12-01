"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Car, Wine } from "lucide-react"
import Link from "next/link"
import { COMPANY_INFO } from "@/lib/constants"

interface FeaturedProperty {
  id: string
  title: string
  location: string
  price: string
  discountedPrice?: string
  image: string
  bedrooms: number
  bathrooms: number
  area: string
  parkingSpaces: number
  barAreas: number
  description: string
}

interface FeaturedPropertySectionProps {
  property: FeaturedProperty
}

export function FeaturedPropertySection({ property }: FeaturedPropertySectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span className="text-emerald-500 font-medium">Featured property</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{property.title}</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-5 h-5" />
                <span>{property.location}</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Bed className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{property.bedrooms} Bedrooms</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Bath className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{property.bathrooms} Bathrooms</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Parking Space</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Wine className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{property.barAreas} Bar areas</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-gray-900">{property.price}</p>
                {property.discountedPrice && <p className="text-gray-500">Discounted price</p>}
              </div>
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full text-lg"
                onClick={() => window.open(COMPANY_INFO.calendlyLink, "_blank")}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
