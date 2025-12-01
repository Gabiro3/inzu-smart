"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function PropertyCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
      <Skeleton className="h-64 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex space-x-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

