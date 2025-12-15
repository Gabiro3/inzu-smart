import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Service Not Found</h1>
        <p className="text-gray-600">The service you're looking for doesn't exist.</p>
        <Link href="/services">
          <Button className="mt-4">View All Services</Button>
        </Link>
      </div>
    </div>
  )
}

