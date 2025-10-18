-- BeatHive Database Schema
-- Run this file to create all necessary tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(42) UNIQUE NOT NULL,
  hedera_account_id VARCHAR(20) UNIQUE NOT NULL,
  nft_id VARCHAR(20) UNIQUE,
  name VARCHAR(100) DEFAULT 'New Creator',
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  location VARCHAR(100),
  genre VARCHAR(50),
  verified BOOLEAN DEFAULT FALSE,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  follower_count INTEGER DEFAULT 0,
  stream_count INTEGER DEFAULT 0,
  collaboration_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  genre VARCHAR(50),
  description TEXT,
  audio_ipfs_hash VARCHAR(100),
  cover_ipfs_hash VARCHAR(100),
  nft_id VARCHAR(20) UNIQUE,
  plays INTEGER DEFAULT 0,
  earnings DECIMAL(10, 2) DEFAULT 0,
  tags TEXT[],
  duration INTEGER,
  file_size INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Track collaborators table
CREATE TABLE IF NOT EXISTS track_collaborators (
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  revenue_share DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (track_id, user_id)
);

-- Streams table
CREATE TABLE IF NOT EXISTS streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  listener_id UUID REFERENCES users(id) ON DELETE SET NULL,
  earning_amount DECIMAL(10, 4) DEFAULT 0,
  played_at TIMESTAMP DEFAULT NOW()
);

-- Followers table
CREATE TABLE IF NOT EXISTS followers (
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  related_track_id UUID REFERENCES tracks(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2),
  action TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  hedera_tx_id VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_hedera_account ON users(hedera_account_id);
CREATE INDEX IF NOT EXISTS idx_tracks_artist ON tracks(artist_id);
CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks(genre);
CREATE INDEX IF NOT EXISTS idx_streams_track ON streams(track_id);
CREATE INDEX IF NOT EXISTS idx_streams_listener ON streams(listener_id);
CREATE INDEX IF NOT EXISTS idx_activities_user ON activities(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id, created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tracks_updated_at BEFORE UPDATE ON tracks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collaborators_updated_at BEFORE UPDATE ON track_collaborators
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

