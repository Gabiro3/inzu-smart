"use client"

import { useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { ImageModal } from "@/app/admin/_components/image-modal"

type PropertyCarouselProps = {
  images: string[]
  propertyTitle: string
}

export function PropertyCarousel({ images, propertyTitle }: PropertyCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  if (!images || images.length === 0) {
    return null
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const goToPreviousImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
    }
  }

  const goToNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length)
    }
  }

  const scrollToImage = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  return (
    <>
      <div className="space-y-4 mb-8">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl cursor-pointer group"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${propertyTitle} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Click to view full size
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          )}
        </Carousel>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer border-2 border-transparent hover:border-emerald-500 transition-colors"
                onClick={() => scrollToImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${propertyTitle} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 150px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Size Image Modal */}
      <ImageModal
        images={images}
        currentIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onPrevious={goToPreviousImage}
        onNext={goToNextImage}
        propertyTitle={propertyTitle}
      />
    </>
  )
}

