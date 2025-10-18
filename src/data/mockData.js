export const mockArtists = [
  {
    id: 1,
    name: "Kwame Beats",
    location: "Accra, Ghana",
    genre: "Afrobeats",
    followers: 2340,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kwame",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    bio: "Creating authentic Afrobeats from the streets of Accra. Collaborated with 50+ artists.",
    totalEarnings: "450.32",
    streamsCount: 12450,
    collaborations: 23,
    nftId: "0.0.123456",
    tracks: [
      { id: 1, title: "African Sunrise", plays: 3200, earnings: "45.20" },
      { id: 2, title: "Street Rhythms", plays: 2800, earnings: "38.50" },
      { id: 3, title: "Unity Dance", plays: 2100, earnings: "29.80" }
    ]
  },
  {
    id: 2,
    name: "Amara Voice",
    location: "Lagos, Nigeria",
    genre: "Afro Soul",
    followers: 5670,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amara",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    bio: "Soulful voice from Lagos, spreading love through music. Featured on 15 international playlists.",
    totalEarnings: "823.45",
    streamsCount: 34520,
    collaborations: 18,
    nftId: "0.0.234567",
    tracks: [
      { id: 4, title: "Lagos Nights", plays: 8200, earnings: "120.50" },
      { id: 5, title: "Mother Africa", plays: 6300, earnings: "95.20" },
      { id: 6, title: "Love & Light", plays: 4100, earnings: "58.30" }
    ]
  },
  {
    id: 3,
    name: "DJ Simba",
    location: "Nairobi, Kenya",
    genre: "Genge/Hip-Hop",
    followers: 3890,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=simba",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    bio: "East African sound ambassador. Mixing traditional beats with modern hip-hop.",
    totalEarnings: "612.90",
    streamsCount: 28340,
    collaborations: 31,
    nftId: "0.0.345678",
    tracks: [
      { id: 7, title: "Nairobi Hustle", plays: 5600, earnings: "82.40" },
      { id: 8, title: "Safari Vibes", plays: 4200, earnings: "61.30" },
      { id: 9, title: "Unity Anthem", plays: 3800, earnings: "55.90" }
    ]
  },
  {
    id: 4,
    name: "Zara Melody",
    location: "Cape Town, South Africa",
    genre: "Afro Jazz",
    followers: 4520,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zara",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    bio: "Jazz fusion artist blending traditional African instruments with contemporary sounds.",
    totalEarnings: "734.12",
    streamsCount: 31200,
    collaborations: 25,
    nftId: "0.0.456789",
    tracks: [
      { id: 10, title: "Table Mountain Blues", plays: 6800, earnings: "98.50" },
      { id: 11, title: "Township Tales", plays: 5200, earnings: "76.80" },
      { id: 12, title: "Rainbow Nation", plays: 4500, earnings: "65.40" }
    ]
  },
  {
    id: 5,
    name: "Kofi Drummer",
    location: "Kumasi, Ghana",
    genre: "Traditional/Fusion",
    followers: 1890,
    verified: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kofi",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800",
    bio: "Master drummer preserving Ashanti rhythms while creating new fusion sounds.",
    totalEarnings: "234.56",
    streamsCount: 8920,
    collaborations: 12,
    nftId: "0.0.567890",
    tracks: [
      { id: 13, title: "Ancestral Drums", plays: 2100, earnings: "32.40" },
      { id: 14, title: "Modern Traditions", plays: 1800, earnings: "28.90" },
      { id: 15, title: "Cultural Fusion", plays: 1500, earnings: "22.50" }
    ]
  },
  {
    id: 6,
    name: "Fatima Strings",
    location: "Kampala, Uganda",
    genre: "Afro Pop",
    followers: 2760,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    bio: "Guitar virtuoso bringing fresh sounds to East African pop music scene.",
    totalEarnings: "456.78",
    streamsCount: 19340,
    collaborations: 19,
    nftId: "0.0.678901",
    tracks: [
      { id: 16, title: "Pearl Dreams", plays: 4200, earnings: "62.30" },
      { id: 17, title: "Kampala Sunrise", plays: 3600, earnings: "53.40" },
      { id: 18, title: "East Side Story", plays: 2900, earnings: "42.80" }
    ]
  }
]

export const aiRecommendations = [
  {
    id: 1,
    artistId: 2,
    reason: "Your styles match perfectly",
    compatibility: 95,
    potentialCollaborators: ["Kwame Beats", "DJ Simba"]
  },
  {
    id: 2,
    artistId: 4,
    reason: "Similar fan base in Cape Town",
    compatibility: 88,
    potentialCollaborators: ["Amara Voice", "Zara Melody"]
  },
  {
    id: 3,
    artistId: 6,
    reason: "Complementary music styles",
    compatibility: 82,
    potentialCollaborators: ["Fatima Strings", "Kofi Drummer"]
  }
]

export const recentActivity = [
  { id: 1, type: "stream", artist: "Kwame Beats", track: "African Sunrise", amount: "0.12", time: "2 hours ago" },
  { id: 2, type: "collab", artist: "Amara Voice", action: "started collaboration", time: "5 hours ago" },
  { id: 3, type: "earning", artist: "DJ Simba", track: "Nairobi Hustle", amount: "0.45", time: "1 day ago" },
  { id: 4, type: "follower", artist: "Zara Melody", action: "followed you", time: "2 days ago" },
  { id: 5, type: "stream", artist: "Kofi Drummer", track: "Ancestral Drums", amount: "0.08", time: "3 days ago" }
]

