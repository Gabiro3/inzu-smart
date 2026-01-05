"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MapPin, Bed, Bath, Car, DollarSign } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import type { Property } from "@/lib/types/property"

type PropertyDetailViewProps = {
  property: Property
  onEdit: () => void
  onDelete: () => void
  onImageClick?: (index: number) => void
}

export function PropertyDetailView({ property, onEdit, onDelete, onImageClick }: PropertyDetailViewProps) {
  const [api, setApi] = useState<CarouselApi>()
  const allImages = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index)
    }
  }

  const scrollToImage = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  return (
    <>
      <div className="space-y-6 w-full">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit} className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={onDelete} className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Hero Slideable Carousel */}
{allImages.length > 0 && (
  <div className="w-full">
    <Carousel
      setApi={setApi}
      className="w-full"
      opts={{ align: "start" }}
    >
      <CarouselContent>
        {allImages.map((image, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* Image */}
              <div
                className="relative h-[320px] lg:h-[460px] w-full overflow-hidden rounded-2xl cursor-pointer group"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Description / Meta */}
              <div className="flex flex-col justify-between p-2 lg:p-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed line-clamp-6">
                    {property.description || "No description available."}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{property.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold">{property.priceLabel}</span>
                  </div>
                </div>
              </div>

            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {allImages.length > 1 && (
        <>
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="-right-6" />
        </>
      )}
    </Carousel>
  </div>
)}


        {/* Property Details */}
        <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Property Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Bed className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-semibold">{property.area}</p>
                </div>
              </div>
              {property.category && (
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold capitalize">{property.category.replace("-", " ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{property.description || "No description available."}</p>
          </div>

          {property.features && property.features.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <div className="space-y-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="border-l-2 border-emerald-500 pl-4">
                    <p className="font-semibold">{feature.title}</p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  )
}

