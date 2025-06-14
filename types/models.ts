import type { Database } from './database'

export type Item = Database['public']['Tables']['items']['Row']

export type ItemImage = Database['public']['Tables']['item_images']['Row']

export type ItemWithImages = Item & {
  images: ItemImage[]
}

export type Testimonial = Database['public']['Tables']['testimonials']['Row'] 