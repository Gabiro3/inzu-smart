"use client"

import { useEffect, useMemo, useState } from "react"
import { Navbar } from "@/components/navbar"
import { PropertyCard } from "@/components/property-card"
import { PropertyCardSkeleton } from "@/components/property-card-skeleton"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import type { Property } from "@/lib/types/property"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/i18n/translations"

export default function ProjectsPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const controller = new AbortController()

    async function loadProperties() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/properties", { signal: controller.signal })
        if (!response.ok) throw new Error("Failed to fetch properties")
        const payload = await response.json()
        setProperties(payload?.data ?? [])
      } catch (err) {
        if ((err as Error).name === "AbortError") return
        console.error(err)
        setError("Unable to load properties. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadProperties()
    return () => controller.abort()
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || property.category === selectedCategory

      const price = property.price
      const matchesPrice =
        priceRange === "all" ||
        (price !== undefined &&
          ((priceRange === "under-500k" && price < 500000) ||
            (priceRange === "500k-1m" && price >= 500000 && price < 1000000) ||
            (priceRange === "over-1m" && price >= 1000000)))

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [properties, searchTerm, selectedCategory, priceRange])

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>{t.projects.properties}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wide">
              {t.projects.discoverAll}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.projects.exploreCollection}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12">
            <div className="grid md:grid-cols-4 gap-4">

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              >
                <option value="all">{t.projects.allCategories}</option>
                <option value="villa">Villas</option>
                <option value="apartment">Apartments</option>
                <option value="residential">Residential</option>
              </select>

              <Button className="bg-black hover:bg-gray-800 text-white rounded-none">
                <Filter className="w-4 h-4 mr-2" />
                {t.projects.applyFilters}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8">
            <p className="text-gray-600">
              {t.projects.showing} {filteredProperties.length} {t.projects.of} {properties.length} {t.projects.propertiesCount}
            </p>
            {error && (
              <p className="text-sm text-red-500 mt-2" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <PropertyCardSkeleton key={index} />)
              : filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
          </div>

          {!isLoading && filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{t.projects.noPropertiesFound}</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceRange("all")
                }}
                className="mt-4 bg-black hover:bg-gray-800 text-white rounded-none px-8"
              >
                {t.projects.clearFilters}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
