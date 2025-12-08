"use client"

import { useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin } from "lucide-react"
import type { Property } from "@/lib/types/property"

interface PropertyDetailModalProps {
  property: Property
  isOpen: boolean
  onClose: () => void
}

export function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const container = scrollContainerRef.current
    if (!container) return

    const updateScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }

    // Initial update with delay to ensure DOM is ready
    const timeout = setTimeout(updateScrollButtons, 100)
    container.addEventListener("scroll", updateScrollButtons)
    window.addEventListener("resize", updateScrollButtons)

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        scroll("left")
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        scroll("right")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      clearTimeout(timeout)
      container.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", updateScrollButtons)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, property])

  if (!isOpen) return null

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 md:top-8 right-4 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Close"
      >
        <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Scroll Container */}
      <div className="w-full h-[90vh] overflow-hidden relative">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        )}

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="w-full max-h-[90vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex h-[90vh]">
            {/* First Panel - Project Info */}
            <div className="min-w-full h-[90vh] flex items-center justify-center snap-start overflow-y-auto">
              <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 max-w-4xl w-full">
                <div className="text-white space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4">{property.title}</h2>
                    <div className="flex items-center text-gray-300 mb-6">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span className="text-base md:text-xl">{property.location}</span>
                    </div>
                  </div>

                  {(property.bedrooms || property.bathrooms || property.area) && (
                    <div className="grid grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
                      {property.bedrooms && (
                        <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                          <Bed className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                          <div>
                            <p className="text-xl md:text-2xl font-bold">{property.bedrooms}</p>
                            <p className="text-xs md:text-sm text-gray-400">Bedrooms</p>
                          </div>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                          <Bath className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                          <div>
                            <p className="text-xl md:text-2xl font-bold">{property.bathrooms}</p>
                            <p className="text-xs md:text-sm text-gray-400">Bathrooms</p>
                          </div>
                        </div>
                      )}
                      {property.area && (
                        <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                          <Square className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                          <div>
                            <p className="text-xl md:text-2xl font-bold">{property.area}</p>
                            <p className="text-xs md:text-sm text-gray-400">Area</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <p className="text-2xl md:text-3xl font-bold mb-4">{property.priceLabel}</p>
                    {property.description && (
                      <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">{property.description}</p>
                    )}
                  </div>

                  {property.features && property.features.length > 0 && (
                    <div className="space-y-4 pt-6 md:pt-8 border-t border-white/20">
                      <h3 className="text-xl md:text-2xl font-bold mb-4">Features</h3>
                      {property.features.map((feature, index) => (
                        <div key={index} className="space-y-1">
                          <h4 className="text-lg md:text-xl font-semibold">{feature.title}</h4>
                          <p className="text-sm md:text-base text-gray-400">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image Panels */}
            {images.map((image, index) => (
              <div key={index} className="min-w-full h-[90vh] flex items-center justify-center snap-start">
                <div className="w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-auto h-auto max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
                    style={{
                      maxWidth: "min(95vw, 1600px)",
                      maxHeight: "85vh",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

