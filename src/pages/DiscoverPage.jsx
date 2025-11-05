import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, Filter, MapPin, TrendingUp, Users, 
  Verified, Sparkles, Music2, Heart, ExternalLink 
} from 'lucide-react'
import { mockArtists, aiRecommendations } from '../data/mockData'

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  
  const genres = ['all', 'Afrobeats', 'Afro Soul', 'Genge/Hip-Hop', 'Afro Jazz', 'Traditional/Fusion', 'Afro Pop']
  
  const filteredArtists = mockArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || artist.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Creators</h1>
            <p className="text-xl text-gray-100 mb-8">
              Find talented African artists and discover your next collaboration
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by artist name, location, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold">AI-Powered Matches</h2>
            <span className="text-sm text-gray-500">(Based on your style & interests)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiRecommendations.map((rec) => {
              const artist = rec.artist
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-6 border-2 border-purple-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img src={artist.avatar} alt={artist.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h3 className="font-bold">{artist.name}</h3>
                        <p className="text-sm text-gray-500">{artist.genre}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{rec.compatibility}%</div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{rec.reason}</p>
                  <Link 
                    to={`/profile/${artist.id}`}
                    className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-gray-50 sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Filter by Genre:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              All Artists <span className="text-gray-500 text-lg">({filteredArtists.length})</span>
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Sorted by popularity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/profile/${artist.id}`} className="block card group">
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={artist.coverImage} 
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Genre Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                      {artist.genre}
                    </div>

                    {/* Avatar */}
                    <div className="absolute -bottom-8 left-6">
                      <img 
                        src={artist.avatar} 
                        alt={artist.name}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-12">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">
                            {artist.name}
                          </h3>
                          {artist.verified && (
                            <Verified className="w-5 h-5 text-blue-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{artist.location}</span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Heart className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-gray-900 font-bold">
                          <Users className="w-4 h-4" />
                          <span>{(artist.followers / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-gray-900 font-bold">
                          <Music2 className="w-4 h-4" />
                          <span>{artist.tracks.length}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Tracks</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-gray-900 font-bold">
                          <TrendingUp className="w-4 h-4" />
                          <span>{artist.collaborations}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Collabs</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredArtists.length === 0 && (
            <div className="text-center py-20">
              <Music2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No artists found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

