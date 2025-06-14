"use client"

import { Camera, ChevronLeft, Palette } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { ClickableImage, ImageViewer } from "@/components/image-viewer"
import CoursesSkeleton from "@/components/skeletons/courses-skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  getClassPhotos,
  getStudentWorks
} from "@/lib/supabase/actions"

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
  const [studentWorks, setStudentWorks] = useState<ItemData[]>([])
  const [classItems, setClassItems] = useState<ItemData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

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
    <div className="min-h-screen bg-gradient-to-br from-brand-primary-50 via-white to-brand-secondary-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-brand-primary-100/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-brand-primary-300 text-brand-primary-600 hover:bg-brand-primary-50 hover:border-brand-primary-400 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                返回首頁
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-primary-700 via-brand-primary-600 to-brand-secondary-600 bg-clip-text text-transparent mb-4">
            課程紀錄
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            記錄每一個創意瞬間，見證孩子們的藝術成長之路
          </p>
          
          {/* Usage Instructions */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-secondary-50 to-brand-primary-50 px-6 py-3 rounded-full border border-brand-primary-200/50">
            <svg className="w-5 h-5 text-brand-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-brand-primary-700 font-medium text-sm">
              <span className="hidden sm:inline">點擊任意圖片可放大查看，支援多張照片瀏覽</span>
              <span className="sm:hidden">輕觸圖片可放大查看更多照片</span>
            </span>
          </div>
        </div>

        {/* Student Works */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-primary-100 rounded-lg">
              <Palette className="h-6 w-6 text-brand-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">學生作品展示</h2>
          </div>
          
          {studentWorks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {studentWorks.map((item) => (
                <Card 
                  key={item.id} 
                  className="group overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer"
                  onClick={() => openImageViewer(item, 0)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <ClickableImage
                        item={item}
                        imageIndex={0}
                        width={400}
                        height={400}
                        className="aspect-square rounded-lg"
                        onImageClick={openImageViewer}
                      />
                      
                      {/* Multiple Images Indicator */}
                      {item.images && item.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          {item.images.length}
                        </div>
                      )}
                      
                      {/* Click to View Indicator */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.title}</h3>
                        {item.author_name && (
                          <p className="text-xs text-brand-primary-200">
                            {item.author_name} {item.author_age && `(${item.author_age})`}
                          </p>
                        )}
                        {item.technique && (
                          <p className="text-xs text-brand-secondary-200 mt-1">
                            {item.technique}
                          </p>
                        )}
                        <p className="text-xs text-gray-300 mt-2 opacity-80">
                          點擊查看{item.images && item.images.length > 1 ? `全部 ${item.images.length} 張照片` : '大圖'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-brand-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-12 w-12 text-brand-primary-400" />
              </div>
              <p className="text-gray-500 text-lg">暫無學生作品</p>
            </div>
          )}
        </section>

        {/* Class Photos */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-secondary-100 rounded-lg">
              <Camera className="h-6 w-6 text-brand-secondary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">更多課堂花絮</h2>
          </div>
          
          {classItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {classItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="group overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer"
                  onClick={() => openImageViewer(item, 0)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <ClickableImage
                        item={item}
                        imageIndex={0}
                        width={400}
                        height={400}
                        className="aspect-square rounded-lg"
                        onImageClick={openImageViewer}
                      />
                      
                      {/* Multiple Images Indicator */}
                      {item.images && item.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          {item.images.length}
                        </div>
                      )}
                      
                      {/* Click to View Indicator */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-xs text-gray-200 line-clamp-2 mb-2">{item.description}</p>
                        )}
                        <p className="text-xs text-gray-300 opacity-80">
                          點擊查看{item.images && item.images.length > 1 ? `全部 ${item.images.length} 張照片` : '大圖'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-brand-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-12 w-12 text-brand-secondary-400" />
              </div>
              <p className="text-gray-500 text-lg">暫無課堂照片</p>
            </div>
          )}
        </section>

        {/* Return Home Button */}
        <div className="text-center">
          
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
