-- Seed data for testing
-- WARNING: Only use in development environment!

-- Insert sample users
INSERT INTO users (id, wallet_address, hedera_account_id, nft_id, name, bio, location, genre, verified, follower_count, total_earnings, stream_count, collaboration_count, avatar_url, cover_image_url)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0x1234567890123456789012345678901234567890', '0.0.100001', '0.0.123456', 'Kwame Beats', 'Creating authentic Afrobeats from the streets of Accra. Collaborated with 50+ artists.', 'Accra, Ghana', 'Afrobeats', true, 2340, 450.32, 12450, 23, 'https://api.dicebear.com/7.x/avataaars/svg?seed=kwame', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'),
  
  ('b1ffcd99-8d1c-5fg9-cc7e-7cc0ce491b22', '0x2345678901234567890123456789012345678901', '0.0.100002', '0.0.234567', 'Amara Voice', 'Soulful voice from Lagos, spreading love through music. Featured on 15 international playlists.', 'Lagos, Nigeria', 'Afro Soul', true, 5670, 823.45, 34520, 18, 'https://api.dicebear.com/7.x/avataaars/svg?seed=amara', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800'),
  
  ('c2ggde00-0e2d-6hh0-dd8f-8dd1df502c33', '0x3456789012345678901234567890123456789012', '0.0.100003', '0.0.345678', 'DJ Simba', 'East African sound ambassador. Mixing traditional beats with modern hip-hop.', 'Nairobi, Kenya', 'Genge/Hip-Hop', true, 3890, 612.90, 28340, 31, 'https://api.dicebear.com/7.x/avataaars/svg?seed=simba', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800')
ON CONFLICT (id) DO NOTHING;

-- Insert sample tracks
INSERT INTO tracks (id, artist_id, title, genre, description, plays, earnings, tags)
VALUES 
  ('d3hhef11-1f3e-7ii1-ee9g-9ee2eg613d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'African Sunrise', 'Afrobeats', 'Feel-good morning vibes with traditional drums', 3200, 45.20, ARRAY['danceable', 'morning', 'traditional']),
  
  ('e4iifg22-2g4f-8jj2-ff0h-0ff3fh724e55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Street Rhythms', 'Afrobeats', 'Capturing the energy of Accra streets', 2800, 38.50, ARRAY['energetic', 'street', 'urban']),
  
  ('f5jjgh33-3h5g-9kk3-gg1i-1gg4gi835f66', 'b1ffcd99-8d1c-5fg9-cc7e-7cc0ce491b22', 'Lagos Nights', 'Afro Soul', 'Smooth soulful melodies inspired by Lagos nightlife', 8200, 120.50, ARRAY['soulful', 'night', 'emotional'])
ON CONFLICT (id) DO NOTHING;

-- Insert sample activities
INSERT INTO activities (user_id, type, related_track_id, amount, action)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'stream', 'd3hhef11-1f3e-7ii1-ee9g-9ee2eg613d44', 0.12, 'Track was played'),
  ('b1ffcd99-8d1c-5fg9-cc7e-7cc0ce491b22', 'earning', 'f5jjgh33-3h5g-9kk3-gg1i-1gg4gi835f66', 0.45, 'Stream revenue earned')
ON CONFLICT DO NOTHING;

-- Update user stream counts
UPDATE users SET stream_count = (SELECT COUNT(*) FROM streams WHERE track_id IN (SELECT id FROM tracks WHERE artist_id = users.id));

