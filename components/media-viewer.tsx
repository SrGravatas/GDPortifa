"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MediaViewer({
  isOpen,
  onClose,
  media = [],
  initialIndex = 0,
}: {
  isOpen: boolean
  onClose: () => void
  media: Array<{ url: string; title?: string; type?: "image" | "video" }>
  initialIndex?: number
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Reset index when media changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [initialIndex, isOpen])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      goToNext()
    } else if (e.key === "ArrowLeft") {
      goToPrev()
    } else if (e.key === "Escape") {
      onClose()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Verificar se o media existe e tem itens
  if (!media || media.length === 0) {
    return null
  }

  // Garantir que o índice atual está dentro dos limites do array
  const safeIndex = Math.min(Math.max(0, currentIndex), media.length - 1)
  const currentMedia = media[safeIndex]

  // Verificar se currentMedia existe antes de acessar suas propriedades
  if (!currentMedia) {
    return null
  }

  const isVideo =
    currentMedia.url?.endsWith(".mp4") || currentMedia.url?.endsWith(".webm") || currentMedia.type === "video"

  const goToNext = () => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-background/95 backdrop-blur-md border-none">
        <div className="relative w-full h-full flex flex-col">
          {/* Header with title and close button */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium">
              {currentMedia.title || `Media ${currentIndex + 1} of ${media.length}`}
            </h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="z-50">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Media content */}
          <div className="flex-1 relative flex items-center justify-center p-4 min-h-[300px]">
            {isVideo ? (
              <video
                src={currentMedia.url}
                controls
                className="max-h-[80vh] max-w-full object-contain"
                autoPlay
                preload="metadata"
                aria-label={currentMedia.title || `Media ${currentIndex + 1} of ${media.length}`}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                <img
                  src={currentMedia.url || "/placeholder.svg"}
                  alt={currentMedia.title || "Media"}
                  className="max-h-[80vh] max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=1080&width=1920"
                  }}
                />
              </div>
            )}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center p-4 border-t">
            <Button variant="outline" size="icon" onClick={goToPrev} disabled={currentIndex === 0}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="text-sm">
              {currentIndex + 1} of {media.length}
            </div>

            <Button variant="outline" size="icon" onClick={goToNext} disabled={currentIndex === media.length - 1}>
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
