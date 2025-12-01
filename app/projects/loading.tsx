"use client"

import { PropertyCardSkeleton } from "@/components/property-card-skeleton"

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mx-auto">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Properties</span>
          </div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200/80 rounded-full w-1/2 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-200/80 rounded-full w-2/3 mx-auto animate-pulse" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
