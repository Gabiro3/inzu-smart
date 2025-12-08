import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Bed, Bath, Square, MapPin, Home, Lock, Leaf } from "lucide-react"
import { TESTIMONIALS } from "@/lib/constants"
import { getPropertyById } from "@/lib/data/properties"
import { ContactButton } from "./_components/contact-button"
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

  const testimonial = TESTIMONIALS[0]

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{property.location}</span>
            </div>

            {(property.bedrooms || property.bathrooms || property.area) && (
              <div className="flex items-center space-x-8 mb-8">
                {property.bedrooms && (
                  <div className="flex items-center space-x-2">
                    <Bed className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold">{property.bedrooms} Bedrooms</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center space-x-2">
                    <Bath className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold">{property.bathrooms} Bathrooms</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center space-x-2">
                    <Square className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold">{property.area}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Carousel */}
              <PropertyCarousel
                images={property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]}
                propertyTitle={property.title}
              />

              {/* Property Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Property details</h2>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                {property.features && (
                  <div className="space-y-6">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {feature.icon === "home" && <Home className="w-6 h-6 text-gray-600" />}
                          {feature.icon === "lock" && <Lock className="w-6 h-6 text-gray-600" />}
                          {feature.icon === "leaf" && <Leaf className="w-6 h-6 text-gray-600" />}
                          {!feature.icon && <Home className="w-6 h-6 text-gray-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Price Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative">
                  <p className="text-3xl font-bold mb-2">{property.priceLabel}</p>
                  <p className="text-gray-600 mb-6">Listing Price</p>
                  <ContactButton />
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-emerald-600" />
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed">"{testimonial.content}"</blockquote>
                </div>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
