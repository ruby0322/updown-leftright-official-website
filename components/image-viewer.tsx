"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import * as React from "react"

interface ItemImage {
  id: string
  image_url: string
  alt_text: string | null
  is_primary: boolean | null
  display_order: number | null
}

interface ItemData {
  id: string
  title: string
  description: string | null
  author_name: string | null
  author_age: string | null
  technique: string | null
  type: string
  images: ItemImage[]
}

interface ImageViewerProps {
  item: ItemData
  initialImageIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function ImageViewer({ item, initialImageIndex = 0, isOpen, onClose }: ImageViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(initialImageIndex)

  // Sort images by display_order, with primary image first if no display_order
  const sortedImages = React.useMemo(() => {
    if (!item?.images?.length) return []
    
    return [...item.images].sort((a, b) => {
      // Primary image comes first if no display_order
      if (a.is_primary && !b.is_primary) return -1
      if (!a.is_primary && b.is_primary) return 1
      
      // Then sort by display_order
      const orderA = a.display_order ?? 999
      const orderB = b.display_order ?? 999
      return orderA - orderB
    })
  }, [item?.images])

  React.useEffect(() => {
    setCurrentImageIndex(initialImageIndex)
  }, [initialImageIndex])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          event.preventDefault()
          setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : sortedImages.length - 1))
          break
        case "ArrowRight":
          event.preventDefault()
          setCurrentImageIndex((prev) => (prev < sortedImages.length - 1 ? prev + 1 : 0))
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, sortedImages.length])

  // Early return if no images available
  if (!sortedImages.length) {
    return null
  }

  const currentImage = sortedImages[currentImageIndex]

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : sortedImages.length - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev < sortedImages.length - 1 ? prev + 1 : 0))
  }

  if (!currentImage) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-white/95 border-none overflow-hidden">
        <DialogTitle asChild>
          <VisuallyHidden>
            {item.title || `Image ${currentImageIndex + 1} of ${sortedImages.length}`}
          </VisuallyHidden>
        </DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-black hover:text-black hover:bg-white/20 backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Buttons */}
          {sortedImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-black hover:text-black hover:bg-white/20 backdrop-blur-sm"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-black hover:text-black hover:bg-white/20 backdrop-blur-sm"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Image Container with Overlay Info */}
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
            <div className="relative max-w-full max-h-full">
              <Image
                src={currentImage.image_url || "/placeholder.svg"}
                alt={currentImage.alt_text || item.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[95vh] object-contain"
                priority
              />
              
              {/* Overlay Info at Bottom of Image */}
              {(item.title || item.description || item.author_name) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 sm:p-6">
                  <div className="space-y-2">
                    {item.title && (
                      <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                        {item.title}
                      </h3>
                    )}
                    {item.author_name && item.author_age && (
                      <p className="text-rose-300 font-medium text-sm sm:text-base">
                        {item.author_name} ({item.author_age})
                      </p>
                    )}
                    {item.technique && (
                      <p className="text-blue-300 font-medium text-sm sm:text-base">
                        {item.technique}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-gray-200 leading-relaxed text-sm sm:text-base max-w-3xl">
                        {item.description}
                      </p>
                    )}
                    {sortedImages.length > 1 && (
                      <p className="text-xs sm:text-sm text-gray-400 pt-2">
                        {currentImageIndex + 1} / {sortedImages.length}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ClickableImageProps {
  item: ItemData
  imageIndex?: number
  width: number
  height: number
  className?: string
  onImageClick?: (item: ItemData, imageIndex: number) => void
}

export function ClickableImage({
  item,
  imageIndex = 0,
  width,
  height,
  className,
  onImageClick,
}: ClickableImageProps) {
  // Sort images same way as in ImageViewer
  const sortedImages = React.useMemo(() => {
    if (!item?.images?.length) return []
    
    return [...item.images].sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1
      if (!a.is_primary && b.is_primary) return 1
      
      const orderA = a.display_order ?? 999
      const orderB = b.display_order ?? 999
      return orderA - orderB
    })
  }, [item?.images])

  // Early return if no images available
  if (!sortedImages.length) {
    return null
  }

  const image = sortedImages[imageIndex]
  
  if (!image) return null

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer group transition-transform hover:scale-105",
        className,
      )}
      onClick={() => onImageClick?.(item, imageIndex)}
    >
      <Image
        src={image.image_url || "/placeholder.svg"}
        alt={image.alt_text || item.title}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 rounded-full p-2">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
