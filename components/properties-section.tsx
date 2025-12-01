"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PropertyCard } from "./property-card"
import { PropertyCardSkeleton } from "./property-card-skeleton"
import type { Property } from "@/lib/types/property"

export function PropertiesSection() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProperties() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/properties", { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }
        const payload = await response.json()
        setProperties((payload?.data ?? []).slice(0, 6))
      } catch (err) {
        if ((err as Error).name === "AbortError") return
        console.error(err)
        setError("Unable to load properties right now.")
      } finally {
        setIsLoading(false)
      }
    }

    loadProperties()

    return () => controller.abort()
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Properties</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Discover inspiring designed homes.</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated homes where elegance, style, and comfort unite.
          </p>
        </div>

        {error && (
          <p className="mb-6 text-center text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => <PropertyCardSkeleton key={index} />)
            : properties.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <span>View All Properties</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
