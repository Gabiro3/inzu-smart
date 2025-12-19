import { Skeleton } from "@/components/ui/skeleton"

export default function ContactsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <Skeleton className="w-5 h-5 mt-1 flex-shrink-0 rounded" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <Skeleton className="w-5 h-5 mt-1 flex-shrink-0 rounded" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-64" />
        </div>
      </div>
    </div>
  )
}

