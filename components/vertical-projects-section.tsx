"use client"

import { useEffect, useState } from "react"
import { PropertyCardVertical } from "./property-card-vertical"
import { PropertyCardSkeleton } from "./property-card-skeleton"
import type { Property } from "@/lib/types/property"

export function VerticalProjectsSection() {
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
        setProperties(payload?.data ?? [])
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
    <section className="pt-20 pb-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        {error && (
          <p className="mb-6 text-center text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="space-y-0 py-12 md:py-24">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-center py-16 md:py-32">
                  <PropertyCardSkeleton />
                </div>
              ))
            : properties.map((property, index) => (
                <PropertyCardVertical key={property.id} property={property} index={index} />
              ))}
        </div>
      </div>
    </section>
  )
}

