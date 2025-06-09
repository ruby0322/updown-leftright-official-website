-- Database Schema for 上下左兒童美術教室
-- This file contains the SQL commands to create tables in Supabase

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  text TEXT NOT NULL,
  avatar VARCHAR(10),
  bg_color VARCHAR(50) DEFAULT 'bg-brand-secondary-200',
  text_color VARCHAR(50) DEFAULT 'text-brand-secondary-700',
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create items table (for both student works and course records)
CREATE TABLE items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('student_work', 'teaching_photo', 'class_photo')),
  author_name VARCHAR(100),
  author_age VARCHAR(10),
  technique VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create item_images table for multiple images per item
CREATE TABLE item_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(200),
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_testimonials_active_order ON testimonials(is_active, display_order);
CREATE INDEX idx_items_type_active_order ON items(type, is_active, display_order);
CREATE INDEX idx_items_featured ON items(is_featured, is_active);
CREATE INDEX idx_item_images_item_id ON item_images(item_id);
CREATE INDEX idx_item_images_primary ON item_images(item_id, is_primary);

-- Enable Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on testimonials" ON testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on items" ON items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on item_images" ON item_images
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO testimonials (name, role, text, avatar, display_order) VALUES
('小寶媽媽', '學生家長', '小卡老師非常有耐心，我家小寶從害羞不敢畫畫，到現在每天都期待上美術課！', '媽', 1),
('小花爸爸', '學生家長', '老師會根據每個孩子的特質調整教學方式，讓孩子在快樂中學習藝術。', '爸', 2),
('小明媽媽', '學生家長', '課程內容豐富有趣，孩子不只學會畫畫技巧，更重要的是培養了創造力！', '媽', 3);

-- Insert sample items
INSERT INTO items (title, description, type, author_name, author_age, technique, is_featured, display_order) VALUES
('彩虹城堡', '小寶利用豐富的色彩創造了一座夢幻的彩虹城堡，展現了他對色彩的敏銳度和豐富的想像力。', 'student_work', '小寶', '6歲', '水彩', true, 1),
('快樂的小魚', '小花畫出了海底世界中快樂游動的小魚，細膩的筆觸和生動的表情展現了她對生命的觀察。', 'student_work', '小花', '7歲', '彩色筆', true, 2),
('專心作畫時光', '孩子們沉浸在創作的世界中，每個人都專注於自己的作品。', 'teaching_photo', NULL, NULL, NULL, true, 1),
('創作討論時間', '孩子們圍成圓圈，分享自己的創作想法和靈感。', 'class_photo', NULL, NULL, NULL, true, 1);

-- Insert sample item images
INSERT INTO item_images (item_id, image_url, alt_text, is_primary, display_order) VALUES
((SELECT id FROM items WHERE title = '彩虹城堡'), '/placeholder.svg?height=300&width=300', '彩虹城堡正面', true, 1),
((SELECT id FROM items WHERE title = '彩虹城堡'), '/placeholder.svg?height=300&width=300', '彩虹城堡細節', false, 2),
((SELECT id FROM items WHERE title = '快樂的小魚'), '/placeholder.svg?height=300&width=300', '快樂的小魚', true, 1),
((SELECT id FROM items WHERE title = '專心作畫時光'), '/placeholder.svg?height=400&width=800', '學生專心作畫', true, 1),
((SELECT id FROM items WHERE title = '創作討論時間'), '/placeholder.svg?height=300&width=300', '課堂花絮', true, 1); 