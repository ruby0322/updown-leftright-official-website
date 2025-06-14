"use server"

import type {
  Item,
  ItemWithImages,
  Testimonial
} from '@/types/models'
import { createClient } from './server'

/**
 * Get all active testimonials ordered by display_order
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getTestimonials:', error)
    return []
  }
}

/**
 * Get items by type with their images from storage
 */
export async function getItems(type?: 'student_work' | 'teaching_photo' | 'class_photo', limit?: number): Promise<ItemWithImages[]> {
  try {
    const supabase = await createClient()
    
    // Get items
    let query = supabase
      .from('items')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (type) {
      query = query.eq('type', type)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data: items, error: itemsError } = await query

    if (itemsError || !items) {
      console.error('Error fetching items:', itemsError)
      return []
    }

    // Get images for each item
    const itemsWithImages = await Promise.all(
      items.map(async (item) => {
        const { data: files, error: storageError } = await supabase
          .storage
          .from('images')
          .list(item.id)
        console.log('files', files)

        if (storageError) {
          console.error(`Error fetching images for item ${item.id}:`, storageError)
          return {
            ...item,
            images: []
          }
        }

        const images = files.filter((file) => file.name !== '.emptyFolderPlaceholder').map((file, index) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('images')
            .getPublicUrl(`${item.id}/${file.name}`)
          console.log(`${item.id}/${file.name}`)
          console.log('publicUrl', publicUrl)
          return {
            id: `${item.id}-${index}`,
            image_url: publicUrl,
            alt_text: item.title,
            is_primary: index === 0,
            display_order: index,
            item_id: item.id,
            created_at: file.created_at,
            updated_at: file.updated_at
          }
        })

        return {
          ...item,
          images
        }
      })
    )
    console.log(itemsWithImages)
    return itemsWithImages as ItemWithImages[]
  } catch (error) {
    console.error('Error in getItems:', error)
    return []
  }
}

/**
 * Get featured items by type
 */
export async function getFeaturedItems(type?: 'student_work' | 'teaching_photo' | 'class_photo', limit?: number): Promise<ItemWithImages[]> {
  try {
    const supabase = await createClient()
    
    // Get items
    let query = supabase
      .from('items')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })

    if (type) {
      query = query.eq('type', type)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data: items, error: itemsError } = await query

    if (itemsError || !items) {
      console.error('Error fetching featured items:', itemsError)
      return []
    }

    // Get images for each item from storage
    const itemsWithImages = await Promise.all(
      items.map(async (item) => {
        const { data: files, error: storageError } = await supabase
          .storage
          .from('images')
          .list(item.id)

        if (storageError) {
          console.error(`Error fetching images for featured item ${item.id}:`, storageError)
          return {
            ...item,
            images: []
          }
        }

        const images = files.filter((file) => file.name !== '.emptyFolderPlaceholder').map((file, index) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('images')
            .getPublicUrl(`${item.id}/${file.name}`)
          
          return {
            id: `${item.id}-${index}`,
            image_url: publicUrl,
            alt_text: item.title,
            is_primary: index === 0,
            display_order: index,
            item_id: item.id,
            created_at: file.created_at,
            updated_at: file.updated_at
          }
        })

        return {
          ...item,
          images
        }
      })
    )

    return itemsWithImages as ItemWithImages[]
  } catch (error) {
    console.error('Error in getFeaturedItems:', error)
    return []
  }
}

/**
 * Get teaching photos specifically
 */
export async function getTeachingPhotos(limit?: number): Promise<ItemWithImages[]> {
  return getItems('teaching_photo', limit)
}

/**
 * Get featured teaching photos
 */
export async function getFeaturedTeachingPhotos(limit?: number): Promise<ItemWithImages[]> {
  return getFeaturedItems('teaching_photo', limit)
}

/**
 * Get class photos specifically
 */
export async function getClassPhotos(limit?: number): Promise<ItemWithImages[]> {
  return getItems('class_photo', limit)
}

/**
 * Get featured class photos
 */
export async function getFeaturedClassPhotos(limit?: number): Promise<ItemWithImages[]> {
  return getFeaturedItems('class_photo', limit)
}

/**
 * Get student works
 */
export async function getStudentWorks(featuredOnly: boolean = false, limit?: number): Promise<ItemWithImages[]> {
  if (featuredOnly) {
    return getFeaturedItems('student_work', limit)
  }
  return getItems('student_work', limit)
}

/**
 * Get featured student works only
 */
export async function getFeaturedStudentWorks(limit?: number): Promise<ItemWithImages[]> {
  return getFeaturedItems('student_work', limit)
}

/**
 * Get a single item by ID with its images from storage
 */
export async function getItemById(id: string): Promise<ItemWithImages | null> {
  try {
    const supabase = await createClient()
    
    // Get the item details
    const { data: item, error: itemError } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (itemError || !item) {
      console.error('Error fetching item by ID:', itemError)
      return null
    }

    // Get all images from the item's folder in storage
    const { data: files, error: storageError } = await supabase
      .storage
      .from('images')
      .list(id)

    if (storageError) {
      console.error('Error fetching images from storage:', storageError)
      return null
    }

    // Convert storage files to ItemImage format
    const images = files.map((file, index) => {
      const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(`${id}/${file.name}`)

      return {
        id: `${id}-${index}`,
        image_url: publicUrl,
        alt_text: item.title,
        is_primary: index === 0,
        display_order: index,
        item_id: id,
        created_at: file.created_at,
        updated_at: file.updated_at
      }
    })

    return {
      ...item,
      images
    } as ItemWithImages
  } catch (error) {
    console.error('Error in getItemById:', error)
    return null
  }
}

// Export types for use in components
export type { Item, ItemWithImages, Testimonial }
