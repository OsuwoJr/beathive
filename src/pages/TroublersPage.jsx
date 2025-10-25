import React, { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import { troublersArtists, troublersVerification } from '../data/mockData'

const TroublersPage = () => {
  const { user, token } = useStore()
  const [artists, setArtists] = useState([])
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [verificationForm, setVerificationForm] = useState({
    troublers_id: '',
    street_performance_count: 0,
    community_rating: 0
  })

  useEffect(() => {
    // Use mock data for demo
    setArtists(troublersArtists)
    setVerificationStatus(troublersVerification)
  }, [])

  const submitVerification = async (e) => {
    e.preventDefault()
    // Mock verification submission
    const newVerification = {
      id: Date.now(),
      user: { name: user?.name || 'Demo User', avatar: user?.avatar },
      troublersId: verificationForm.troublers_id,
      verificationStatus: 'pending',
      streetPerformanceCount: verificationForm.street_performance_count,
      communityRating: verificationForm.community_rating,
      verifiedAt: null
    }
    
    setArtists([newVerification, ...artists])
    setVerificationForm({ troublers_id: '', street_performance_count: 0, community_rating: 0 })
    alert('Verification request submitted! 🎭')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🎭 The Troublers Street Talent</h1>
          <p className="text-gray-600 mb-8">Verified street artists and performers from across Africa</p>
          
          {/* Verification Status */}
          {verificationStatus && (
            <div className={`rounded-lg p-4 mb-8 ${
              verificationStatus.status === 'verified' ? 'bg-green-50 border border-green-200' :
              verificationStatus.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <h3 className="font-semibold mb-2">Your Verification Status</h3>
              <p className={`${
                verificationStatus.status === 'verified' ? 'text-green-800' :
                verificationStatus.status === 'pending' ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                {verificationStatus.status === 'verified' ? '✅ Verified Street Artist' :
                 verificationStatus.status === 'pending' ? '⏳ Verification Pending' :
                 '❌ Verification Rejected'}
              </p>
              {verificationStatus.street_performance_count && (
                <p className="text-sm mt-1">
                  Street Performances: {verificationStatus.street_performance_count}
                </p>
              )}
            </div>
          )}

          {/* Verification Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Verify with The Troublers</h2>
            <form onSubmit={submitVerification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Troublers ID
                </label>
                <input
                  type="text"
                  value={verificationForm.troublers_id}
                  onChange={(e) => setVerificationForm({...verificationForm, troublers_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your Troublers ID"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Performances
                  </label>
                  <input
                    type="number"
                    value={verificationForm.street_performance_count}
                    onChange={(e) => setVerificationForm({...verificationForm, street_performance_count: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Community Rating (1-5)
                  </label>
                  <input
                    type="number"
                    value={verificationForm.community_rating}
                    onChange={(e) => setVerificationForm({...verificationForm, community_rating: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                    min="1"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Submit Verification
              </button>
            </form>
          </div>

          {/* Verified Artists */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Verified Street Artists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artists.map((artist) => (
                <div key={artist.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{artist.user?.name || 'Anonymous Artist'}</h3>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Troublers ID:</strong> {artist.troublers_id}</p>
                    <p><strong>Street Performances:</strong> {artist.street_performance_count}</p>
                    <p><strong>Community Rating:</strong> {artist.community_rating}/5</p>
                    <p><strong>Verified:</strong> {new Date(artist.verified_at).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {artists.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No verified artists found</p>
                <p className="text-sm">Be the first to get verified! 🎭</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TroublersPage
