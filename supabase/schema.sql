-- CampusCart Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE listing_status AS ENUM ('active', 'sold', 'expired');
CREATE TYPE listing_category AS ENUM ('furniture', 'books', 'electronics', 'misc');

-- Campuses table
CREATE TABLE campuses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  email_domains TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial campuses
INSERT INTO campuses (name, code, email_domains) VALUES
  ('London School of Economics', 'lse', ARRAY['lse.ac.uk']),
  ('Bennett University', 'bennett', ARRAY['bennett.edu.in']),
  ('SPIT Mumbai', 'spit', ARRAY['spit.ac.in']);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  campus_id UUID REFERENCES campuses(id),
  role user_role DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listings table
CREATE TABLE listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  category listing_category NOT NULL,
  campus_id UUID NOT NULL REFERENCES campuses(id),
  residence TEXT,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status listing_status DEFAULT 'active',
  leaving_soon BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_listings_campus ON listings(campus_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_created_by ON listings(created_by);
CREATE INDEX idx_messages_listing ON messages(listing_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE campuses ENABLE ROW LEVEL SECURITY;

-- Campuses: Anyone can read
CREATE POLICY "Campuses are viewable by everyone" ON campuses
  FOR SELECT USING (true);

-- Users: Users can read all profiles, update own
CREATE POLICY "Users can view all profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Listings: Users can only see listings from their campus
CREATE POLICY "Users can view listings from their campus" ON listings
  FOR SELECT USING (
    campus_id IN (
      SELECT campus_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can create listings" ON listings
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    campus_id IN (SELECT campus_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can update own listings" ON listings
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own listings" ON listings
  FOR DELETE USING (auth.uid() = created_by);

-- Messages: Users can only see messages they sent or received
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update messages they received" ON messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) VALUES ('listings', 'listings', true);

-- Storage policies
CREATE POLICY "Anyone can view listing images" ON storage.objects
  FOR SELECT USING (bucket_id = 'listings');

CREATE POLICY "Authenticated users can upload listing images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'listings' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own listing images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'listings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own listing images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'listings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to auto-expire listings
CREATE OR REPLACE FUNCTION expire_old_listings()
RETURNS void AS $$
BEGIN
  UPDATE listings
  SET status = 'expired'
  WHERE status = 'active'
    AND expires_at IS NOT NULL
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;
