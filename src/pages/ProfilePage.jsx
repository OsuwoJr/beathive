import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, Users, Music2, TrendingUp, ExternalLink, 
  Play, DollarSign, Verified, Award, Copy, Share2, Heart, CheckCircle2
} from 'lucide-react'
import { mockArtists } from '../data/mockData'

export default function ProfilePage() {
  const { id } = useParams()
  const artist = mockArtists.find(a => a.id === parseInt(id))

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Artist Not Found</h2>
          <p className="text-gray-600">The artist you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="relative h-80">
        <img 
          src={artist.coverImage} 
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <img 
                src={artist.avatar} 
                alt={artist.name}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-2xl"
              />
              
              <div className="flex-grow text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold">{artist.name}</h1>
                  {artist.verified && (
                    <Verified className="w-8 h-8 text-blue-400 fill-current" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-gray-200">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{artist.location}</span>
                  </div>
                  <span>•</span>
                  <span className="font-semibold">{artist.genre}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>NFT ID: {artist.nftId}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="btn-primary flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Follow</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <span>Statistics</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Followers</span>
                  </div>
                  <span className="font-bold text-lg">{artist.followers.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Total Streams</span>
                  </div>
                  <span className="font-bold text-lg">{artist.streamsCount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Music2 className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Collaborations</span>
                  </div>
                  <span className="font-bold text-lg">{artist.collaborations}</span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Total Earnings</span>
                  </div>
                  <span className="font-bold text-lg text-secondary-600">${artist.totalEarnings}</span>
                </div>
              </div>
            </div>

            {/* NFT Identity Card */}
            <div className="card p-6 gradient-bg text-white">
              <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Creator Identity NFT</span>
              </h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-200 mb-1">Hedera Token ID</div>
                <div className="flex items-center justify-between">
                  <code className="font-mono">{artist.nftId}</code>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                  <span>Verified Creator</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                  <span>Copyright Protected</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-secondary-300" />
                  <span>Blockchain Verified</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View on HashScan</span>
              </button>
            </div>

            {/* About */}
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">{artist.bio}</p>
            </div>
          </div>

          {/* Right Column - Tracks */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-2xl flex items-center space-x-2">
                  <Music2 className="w-6 h-6 text-primary-600" />
                  <span>Released Tracks</span>
                </h3>
                <span className="text-sm text-gray-500">{artist.tracks.length} tracks</span>
              </div>

              <div className="space-y-3">
                {artist.tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex items-center space-x-4 flex-grow">
                      <button className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-5 h-5 ml-1" />
                      </button>
                      
                      <div className="flex-grow">
                        <h4 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">
                          {track.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>{track.plays.toLocaleString()} plays</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-secondary-600 font-semibold">${track.earnings}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Heart className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Share2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Collaboration CTA */}
              <div className="mt-8 p-6 gradient-bg text-white rounded-2xl">
                <h4 className="text-xl font-bold mb-2">Want to collaborate?</h4>
                <p className="text-gray-100 mb-4">
                  Connect with {artist.name} and create something amazing together.
                </p>
                <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Start Collaboration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

