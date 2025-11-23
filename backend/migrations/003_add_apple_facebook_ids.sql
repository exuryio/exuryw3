-- Add Apple and Facebook ID columns to users table
-- Migration: 003_add_apple_facebook_ids.sql

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS apple_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS facebook_id VARCHAR(255) UNIQUE;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_apple_id ON users(apple_id);
CREATE INDEX IF NOT EXISTS idx_users_facebook_id ON users(facebook_id);

