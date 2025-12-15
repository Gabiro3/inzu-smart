"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

type ImageModalProps = {
  images: string[]
  currentIndex: number | null
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  propertyTitle: string
}

export function ImageModal({ images, currentIndex, onClose, onPrevious, onNext, propertyTitle }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        onPrevious()
      } else if (e.key === "ArrowRight" && images.length > 1) {
        onNext()
      }
    }

    if (currentIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentIndex, images.length, onClose, onNext, onPrevious])

  return (
    <Dialog open={currentIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-black/95 border-none">
        <DialogTitle className="sr-only">
          {propertyTitle} - Image {currentIndex !== null ? currentIndex + 1 : 1}
        </DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {currentIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${propertyTitle} - Full size ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPrevious()
                    }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNext()
                    }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

