import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { PropertiesSection } from "@/components/properties-section"
import { FeaturedPropertySection } from "@/components/featured-property-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { VideoCTASection } from "@/components/video-cta-section"
import { Footer } from "@/components/footer"
import { FEATURED_PROPERTY } from "@/lib/constants"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <PropertiesSection />
      <FeaturedPropertySection property={FEATURED_PROPERTY} />
      <TestimonialsSection />
      <FAQSection />
      <VideoCTASection />
      <Footer />
    </main>
  )
}
