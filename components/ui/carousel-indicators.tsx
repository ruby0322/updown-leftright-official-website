"use client"

import { useCarousel } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import * as React from "react"

interface CarouselIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
}

export function CarouselIndicators({ count, className, ...props }: CarouselIndicatorsProps) {
  const { api } = useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const handleClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api],
  )

  return (
    <div className={cn("flex justify-center gap-1 mt-4", className)} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            selectedIndex === index ? "bg-rose-400" : "bg-rose-200",
          )}
          onClick={() => handleClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
