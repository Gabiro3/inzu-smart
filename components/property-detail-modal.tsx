"use client"

import { useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
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
  const imageWrapperRef = useRef<HTMLDivElement>(null)

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

    const timeout = setTimeout(updateScrollButtons, 100)
    container.addEventListener("scroll", updateScrollButtons)
    window.addEventListener("resize", updateScrollButtons)

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
            {/* First Panel - Property Info (Title and Location Only) */}
            <div className="min-w-full h-[90vh] flex items-center justify-center snap-start overflow-y-auto">
              <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 max-w-4xl w-full">
                <div className="text-white space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 uppercase tracking-wide">
                      {property.title}
                    </h2>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span className="text-base md:text-xl uppercase tracking-wide">
                        {property.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Panels with Description */}
            {images.map((image, index) => (
              <div
  key={index}
  className="min-w-full h-[90vh] snap-start"
>
  <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[6.5fr_3.5fr] gap-6 px-4 md:px-8 lg:px-16">

    {/* IMAGE (65%) */}
    <div
      ref={imageWrapperRef}
      className="relative h-full w-full overflow-hidden rounded-2xl bg-black cursor-zoom-in"
      onClick={() => {
        const el = imageWrapperRef.current
        if (!el) return
        el.requestFullscreen?.()
      }}
    >
      <img
        src={image || "/placeholder.svg"}
        alt={`${property.title} - Image ${index + 1}`}
        className="
          w-full
          h-full
          object-cover
          scale-[1.03]
          transition-transform
          duration-700
          ease-out
        "
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10 pointer-events-none" />
    </div>

    {/* DESCRIPTION (35%) */}
    <div
      className="
        h-full
        flex
        flex-col
        justify-center
        text-white
        space-y-4
        lg:pl-6
        overflow-y-auto
        scrollbar-thin-modern
      "
    >
      <div className="max-w-md space-y-1">
        <h3 className="text-xl md:text-2xl font-semibold">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-300 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{property.location}</span>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-md">
        {property.description || "No description available."}
      </p>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 max-w-md">
        {property.bedrooms && (
          <div>
            <p className="text-xs text-gray-400">Bedrooms</p>
            <p className="font-semibold text-sm">{property.bedrooms}</p>
          </div>
        )}
        {property.bathrooms && (
          <div>
            <p className="text-xs text-gray-400">Bathrooms</p>
            <p className="font-semibold text-sm">{property.bathrooms}</p>
          </div>
        )}
        {property.area && (
          <div>
            <p className="text-xs text-gray-400">Area</p>
            <p className="font-semibold text-sm">{property.area}</p>
          </div>
        )}
      </div>
    </div>

  </div>
</div>


            ))}

          </div>
        </div>
      </div>
    </div>
  )
}
