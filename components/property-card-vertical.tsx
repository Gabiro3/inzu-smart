"use client"

import { useState, useEffect, useRef } from "react"
import { PropertyDetailModal } from "./property-detail-modal"
import type { Property } from "@/lib/types/property"

interface PropertyCardVerticalProps {
  property: Property
  index: number
}

export function PropertyCardVertical({ property, index }: PropertyCardVerticalProps) {
  const [scale, setScale] = useState(0.85)
  const [opacity, setOpacity] = useState(0.6)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number

    const updateScale = () => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight / 2
      const elementCenter = rect.top + rect.height / 2
      
      // Calculate distance from viewport center
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
      const maxDistance = viewportHeight * 0.5 // Maximum distance for full effect
      
      // Calculate scale: 1.0 at center, 0.88 at max distance (more subtle)
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
      const newScale = 1.0 - normalizedDistance * 0.12
      
      // Calculate opacity: 1.0 at center, 0.7 at max distance (more visible)
      const newOpacity = 1.0 - normalizedDistance * 0.3
      
      setScale(Math.max(0.88, newScale))
      setOpacity(Math.max(0.7, newOpacity))
    }

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      animationFrameId = requestAnimationFrame(updateScale)
    }

    // Initial update
    updateScale()

    // Update on scroll with requestAnimationFrame for smoothness
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={cardRef}
        className="flex items-center justify-center px-4 py-2 transition-all duration-500 ease-out"
        style={{
          transform: `scale(${scale})`,
          opacity: opacity,
        }}
      >
        <div className="w-full max-w-6xl mx-auto">
        <div
  className="grid grid-cols-12 items-center gap-4 md:gap-2 lg:gap-4 cursor-pointer group"
  onClick={() => setIsModalOpen(true)}
>
  {/* Left: Title + Location */}
  <div className="col-span-12 md:col-span-3">
    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-gray-900 group-hover:text-gray-700 transition-colors">
      {property.title}
    </h3>
    <p className="text-xs md:text-sm lg:text-base text-gray-600 uppercase tracking-wide">
      {property.location}
    </p>
  </div>

  {/* Center: Image */}
  <div className="col-span-12 md:col-span-5">
    <div className="aspect-[4/3] overflow-hidden rounded-sm">
      <img
        src={property.image || "/placeholder.svg"}
        alt={property.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  </div>

  {/* Right: Description */}
  <div className="col-span-12 md:col-span-4">
    {property.description && (
      <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-4 md:line-clamp-6">
        {property.description}
      </p>
    )}
  </div>
</div>

        </div>
      </div>

      <PropertyDetailModal property={property} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

