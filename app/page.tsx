import { Navbar } from "@/components/navbar"
import { VerticalProjectsSection } from "@/components/vertical-projects-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <VerticalProjectsSection />
      <Footer />
    </main>
  )
}
