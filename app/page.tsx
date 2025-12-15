import { Navbar } from "@/components/navbar"
import { VerticalProjectsSection } from "@/components/vertical-projects-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <VerticalProjectsSection />
    </main>
  )
}
