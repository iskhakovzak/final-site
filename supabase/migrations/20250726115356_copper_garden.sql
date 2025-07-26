-- ===== SUPABASE DATABASE SETUP =====

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT DEFAULT 'photo',
    image TEXT,
    video TEXT,
    thumbnail TEXT,
    description TEXT,
    year INTEGER DEFAULT EXTRACT(year FROM NOW()),
    client TEXT DEFAULT 'Portfolio',
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio_items
CREATE POLICY "Public can view portfolio items" 
    ON portfolio_items FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can insert portfolio items" 
    ON portfolio_items FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update portfolio items" 
    ON portfolio_items FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Authenticated users can delete portfolio items" 
    ON portfolio_items FOR DELETE 
    TO authenticated 
    USING (true);

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true);

-- Create storage policies
CREATE POLICY "Public can view media files" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media files" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update media files" 
    ON storage.objects FOR UPDATE 
    TO authenticated 
    USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete media files" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id = 'media');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_portfolio_items_updated_at 
    BEFORE UPDATE ON portfolio_items 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO portfolio_items (title, category, type, image, description, featured) VALUES
('Vogue Editorial', 'photo', 'editorial', 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/public/media/photos/vogue-editorial.jpg', 'Fashion editorial for Vogue magazine', true),
('Djafariy Campaign', 'photo', 'commercial', 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/public/media/photos/djafariy-campaign.jpg', 'Commercial campaign for Djafariy brand', true),
('Elle Magazine', 'photo', 'editorial', 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/public/media/photos/elle-magazine.jpg', 'Editorial feature for Elle magazine', false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_type ON portfolio_items(type);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_featured ON portfolio_items(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_created_at ON portfolio_items(created_at DESC);