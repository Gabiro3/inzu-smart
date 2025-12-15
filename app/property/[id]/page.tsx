import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin } from "lucide-react"
import { getPropertyById } from "@/lib/data/properties"
import { PropertyCarousel } from "./_components/property-carousel"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header - Only Title and Location */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wide">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg uppercase tracking-wide">{property.location}</span>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="max-w-6xl mx-auto">
            <PropertyCarousel
              images={property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]}
              propertyTitle={property.title}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
