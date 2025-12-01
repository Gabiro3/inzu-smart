import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyLoading() {
  return (
    <main className="min-h-screen">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex space-x-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="aspect-[16/10] w-full rounded-3xl" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square w-full rounded-2xl" />
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8">
                <Skeleton className="h-10 w-44 mb-4" />
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-lg space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <Skeleton className="h-12 w-32 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

