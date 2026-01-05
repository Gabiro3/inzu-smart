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

{/* Property Details */}
<div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
  
  {/* Description */}
  <div className="lg:col-span-2">
    <h2 className="text-2xl font-semibold mb-4">Property Description</h2>
    <p className="text-gray-700 leading-relaxed text-lg">
      {property.description || "No description available for this property."}
    </p>
  </div>

  {/* Key Details */}
  <aside className="bg-gray-50 rounded-2xl p-6 h-fit">
    <h3 className="text-xl font-semibold mb-6">Property Details</h3>

    <div className="space-y-4">

      {property.bedrooms && (
        <div className="flex justify-between">
          <span className="text-gray-500">Bedrooms</span>
          <span className="font-semibold">{property.bedrooms}</span>
        </div>
      )}

      {property.bathrooms && (
        <div className="flex justify-between">
          <span className="text-gray-500">Bathrooms</span>
          <span className="font-semibold">{property.bathrooms}</span>
        </div>
      )}

      {property.area && (
        <div className="flex justify-between">
          <span className="text-gray-500">Area</span>
          <span className="font-semibold">{property.area}</span>
        </div>
      )}

      {property.category && (
        <div className="flex justify-between">
          <span className="text-gray-500">Category</span>
          <span className="font-semibold capitalize">
            {property.category.replace("-", " ")}
          </span>
        </div>
      )}
    </div>
  </aside>
</div>

{/* Features */}
{property.features && property.features.length > 0 && (
  <div className="max-w-6xl mx-auto mt-16">
    <h2 className="text-2xl font-semibold mb-6">Features</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {property.features.map((feature, index) => (
        <div
          key={index}
          className="border-l-4 border-emerald-500 pl-4 py-2"
        >
          <h4 className="font-semibold">{feature.title}</h4>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
)}

        </div>
      </div>

      <Footer />
    </main>
  )
}
