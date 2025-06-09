"use client"
import { ClickableImage, ImageViewer } from "@/components/image-viewer"
import CoursesSkeleton from "@/components/skeletons/courses-skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CarouselIndicators } from "@/components/ui/carousel-indicators"
import {
    getClassPhotos,
    getStudentWorks,
    getTeachingPhotos
} from "@/lib/supabase/actions"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ItemData {
  id: string
  title: string
  description: string | null
  author_name: string | null
  author_age: string | null
  technique: string | null
  type: string
  images: {
    id: string
    image_url: string
    alt_text: string | null
    is_primary: boolean | null
    display_order: number | null
  }[]
}

export default function CourseRecordsPage() {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [teachingItems, setTeachingItems] = useState<ItemData[]>([])
  const [studentWorks, setStudentWorks] = useState<ItemData[]>([])
  const [classItems, setClassItems] = useState<ItemData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Fetch teaching photos
        const teachingData = await getTeachingPhotos()
        setTeachingItems(teachingData)

        // Fetch student works
        const studentWorksData = await getStudentWorks()
        setStudentWorks(studentWorksData)

        // Fetch class photos
        const classPhotosData = await getClassPhotos()
        setClassItems(classPhotosData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const openImageViewer = (item: ItemData, imageIndex: number) => {
    setSelectedItem(item)
    setSelectedImageIndex(imageIndex)
    setViewerOpen(true)
  }

  // Show skeleton while loading
  if (isLoading) {
    return <CoursesSkeleton />
  }

  return (
    <div className="min-h-screen bg-brand-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">上下左兒童美術教室</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">課程紀錄</h1>

        {/* Teaching Photos */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">教學現場</h2>
          {teachingItems.length > 0 && (
            <div className="relative mx-auto max-w-4xl px-12">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {teachingItems.map((item) => (
                    <CarouselItem key={item.id}>
                      <ClickableImage
                        item={item}
                        imageIndex={0}
                        width={800}
                        height={400}
                        className="aspect-video"
                        onImageClick={openImageViewer}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end pointer-events-none">
                        <div className="p-6 text-white">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="text-sm opacity-90">{item.description?.slice(0, 50)}...</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
                <CarouselIndicators count={teachingItems.length} />
              </Carousel>
            </div>
          )}
        </section>

        {/* Student Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">學生作品展示</h2>
          {studentWorks.length > 0 && (
            <div className="relative mx-auto max-w-4xl px-12">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {studentWorks.map((item) => (
                    <CarouselItem key={item.id}>
                      <Card className="bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <ClickableImage
                              item={item}
                              imageIndex={0}
                              width={300}
                              height={300}
                              className="h-64"
                              onImageClick={openImageViewer}
                            />
                            <div className="flex flex-col justify-center">
                              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                              <p className="text-gray-600 mb-2">
                                {item.author_name} ({item.author_age})
                              </p>
                              <p className="text-gray-600">{item.description?.slice(0, 100)}...</p>
                              <Button
                                variant="link"
                                className="text-brand-secondary-500 p-0 h-auto mt-2 justify-start"
                                onClick={() => openImageViewer(item, 0)}
                              >
                                查看詳細 →
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
                <CarouselIndicators count={studentWorks.length} />
              </Carousel>
            </div>
          )}
        </section>

        {/* More Photos */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">更多課堂花絮</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classItems.map((item) => (
              <ClickableImage
                key={item.id}
                item={item}
                imageIndex={0}
                width={300}
                height={300}
                className="aspect-square"
                onImageClick={openImageViewer}
              />
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="border-rose-300 text-rose-500 hover:bg-rose-50">
              返回首頁
            </Button>
          </Link>
        </div>
      </div>

      {/* Image Viewer */}
      {selectedItem && (
        <ImageViewer
          item={selectedItem}
          initialImageIndex={selectedImageIndex}
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  )
}
