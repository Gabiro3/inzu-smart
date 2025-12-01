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

export default function ProjectsPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        (priceRange === "under-500k" && price < 500000) ||
        (priceRange === "500k-1m" && price >= 500000 && price < 1000000) ||
        (priceRange === "over-1m" && price >= 1000000)

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [properties, searchTerm, selectedCategory, priceRange])

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Properties</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Discover All Our Properties</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our complete collection of AI-designed real estate projects.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="villa">Villas</option>
                <option value="apartment">Apartments</option>
                <option value="residential">Residential</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Prices</option>
                <option value="under-500k">Under $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="over-1m">Over $1M</option>
              </select>

              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredProperties.length} of {properties.length} properties
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
              <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceRange("all")
                }}
                className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
