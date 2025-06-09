# Database Setup Guide

This document explains the database schema and setup for the 上下左兒童美術教室 (Up Down Left Children's Art Studio) website.

## Database Schema

The application uses Supabase as the backend database with the following tables:

### 1. `testimonials` - 家長與學生推薦
Stores testimonials from parents and students.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | VARCHAR(100) | Name of the person giving testimonial |
| `role` | VARCHAR(50) | Role (e.g., "學生家長") |
| `text` | TEXT | Testimonial content |
| `avatar` | VARCHAR(10) | Avatar text (e.g., "媽", "爸") |
| `bg_color` | VARCHAR(50) | Background color class |
| `text_color` | VARCHAR(50) | Text color class |
| `rating` | INTEGER | Star rating (1-5) |
| `is_active` | BOOLEAN | Whether to display this testimonial |
| `display_order` | INTEGER | Order for display |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

### 2. `course_records` - 課程紀錄
Stores teaching photos and class photos.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title` | VARCHAR(200) | Photo title |
| `description` | TEXT | Photo description |
| `image_url` | TEXT | Supabase storage public URL |
| `alt_text` | VARCHAR(200) | Alt text for accessibility |
| `category` | VARCHAR(50) | 'teaching' or 'class_photos' |
| `is_active` | BOOLEAN | Whether to display this record |
| `display_order` | INTEGER | Order for display |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

### 3. `student_works` - 學生作品
Stores student artwork information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title` | VARCHAR(200) | Artwork title |
| `description` | TEXT | Artwork description |
| `image_url` | TEXT | Supabase storage public URL |
| `alt_text` | VARCHAR(200) | Alt text for accessibility |
| `author_name` | VARCHAR(100) | Student name |
| `author_age` | VARCHAR(10) | Student age |
| `technique` | VARCHAR(100) | Art technique used |
| `is_featured` | BOOLEAN | Whether to feature this work |
| `is_active` | BOOLEAN | Whether to display this work |
| `display_order` | INTEGER | Order for display |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

### 4. `gallery_highlights` - 畫廊重點展示
Stores gallery section images (hero and preview images).

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title` | VARCHAR(200) | Image title |
| `description` | TEXT | Image description |
| `image_url` | TEXT | Supabase storage public URL |
| `alt_text` | VARCHAR(200) | Alt text for accessibility |
| `category` | VARCHAR(50) | 'hero' or 'preview' |
| `is_active` | BOOLEAN | Whether to display this image |
| `display_order` | INTEGER | Order for display |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

## Setup Instructions

### 1. Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your project URL and anon key

### 2. Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Schema
Execute the SQL commands in `database-schema.sql` in your Supabase SQL editor to create all tables, indexes, and policies.

### 4. Setup Storage
1. In Supabase dashboard, go to Storage
2. Create a bucket named `images`
3. Set the bucket to public
4. Upload your images and get the public URLs

### 5. Insert Sample Data
The schema file includes sample data inserts. Update the `image_url` fields with your actual Supabase storage URLs.

## Server Actions Usage

The application includes server actions in `lib/supabase/actions.ts` for fetching data:

### Testimonials
```typescript
import { getTestimonials } from '@/lib/supabase/actions'

// Get all active testimonials
const testimonials = await getTestimonials()
```

### Course Records
```typescript
import { 
  getCourseRecords, 
  getTeachingPhotos, 
  getClassPhotos 
} from '@/lib/supabase/actions'

// Get all course records
const allRecords = await getCourseRecords()

// Get only teaching photos
const teachingPhotos = await getTeachingPhotos()

// Get only class photos
const classPhotos = await getClassPhotos()
```

### Student Works
```typescript
import { 
  getStudentWorks, 
  getFeaturedStudentWorks 
} from '@/lib/supabase/actions'

// Get all student works
const allWorks = await getStudentWorks()

// Get only featured works
const featuredWorks = await getFeaturedStudentWorks()
```

### Gallery Highlights
```typescript
import { 
  getGalleryHero, 
  getGalleryPreviews 
} from '@/lib/supabase/actions'

// Get hero image
const heroImage = await getGalleryHero()

// Get preview images
const previewImages = await getGalleryPreviews()
```

## Image Storage

All images should be stored in Supabase Storage:

1. **Bucket**: Create a public bucket named `images`
2. **Structure**: Organize images in folders:
   - `images/teaching/` - Teaching photos
   - `images/class-photos/` - Class photos  
   - `images/student-works/` - Student artwork
   - `images/gallery/` - Gallery images

3. **URLs**: Use the public URLs from Supabase storage in the `image_url` fields

## Row Level Security (RLS)

The database uses Row Level Security with policies that allow:
- **Public read access** to all active records (`is_active = true`)
- **No public write access** (admin access required for data management)

## Data Management

To manage data:
1. Use Supabase dashboard for direct database access
2. Create an admin interface (future enhancement)
3. Use the Supabase API directly for bulk operations

## Migration from Static Data

The existing data from `data.json` has been structured to match the database schema. When migrating:

1. Upload all images to Supabase storage
2. Update the database records with the correct storage URLs
3. Ensure `display_order` values maintain the desired sequence
4. Set `is_active = true` for all records you want to display 