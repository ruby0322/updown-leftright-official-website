"use server"

import type {
    Item,
    ItemWithImages,
    Testimonial
} from '@/types/database'
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
 * Get items by type with their images
 */
export async function getItems(type?: 'student_work' | 'teaching_photo' | 'class_photo', limit?: number): Promise<ItemWithImages[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('items')
      .select(`
        *,
        images:item_images(*)
      `)
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (type) {
      query = query.eq('type', type)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching items:', error)
      return []
    }

    return (data as ItemWithImages[]) || []
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
    let query = supabase
      .from('items')
      .select(`
        *,
        images:item_images(*)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })

    if (type) {
      query = query.eq('type', type)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching featured items:', error)
      return []
    }

    return (data as ItemWithImages[]) || []
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
 * Get a single item by ID with its images
 */
export async function getItemById(id: string): Promise<ItemWithImages | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        images:item_images(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching item by ID:', error)
      return null
    }

    return data as ItemWithImages
  } catch (error) {
    console.error('Error in getItemById:', error)
    return null
  }
}

// Export types for use in components
export type { Item, ItemWithImages, Testimonial }
