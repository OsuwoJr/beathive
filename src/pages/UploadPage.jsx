import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, Music, Image as ImageIcon, FileAudio, 
  X, CheckCircle, AlertCircle, Sparkles, Shield, Loader
} from 'lucide-react'
import useStore from '../store/useStore'

export default function UploadPage() {
  const { user } = useStore()
  const [uploadStep, setUploadStep] = useState('form') // form, uploading, success
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Afrobeats',
    description: '',
    collaborators: '',
    tags: ''
  })
  const [audioFile, setAudioFile] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setUploadStep('uploading')
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStep('success')
    }, 3000)
  }

  const resetForm = () => {
    setUploadStep('form')
    setFormData({
      title: '',
      genre: 'Afrobeats',
      description: '',
      collaborators: '',
      tags: ''
    })
    setAudioFile(null)
    setCoverImage(null)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            You need to connect your Hedera wallet before you can upload content.
          </p>
          <button className="btn-primary">Connect Wallet</button>
        </div>
      </div>
    )
  }

  if (uploadStep === 'uploading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-primary-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Uploading to Hedera...</h2>
          <p className="text-gray-600">Your content is being registered on the blockchain</p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Uploading to IPFS</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Minting NFT on Hedera</span>
            </div>
            <div className="flex items-center justify-center space-x-2 opacity-50">
              <div className="w-4 h-4" />
              <span>Registering ownership</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (uploadStep === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Upload Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your track "{formData.title}" has been successfully uploaded and registered on Hedera blockchain.
          </p>
          
          <div className="bg-white rounded-xl p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Your track is now discoverable on the platform</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>AI will start matching you with potential collaborators</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You'll earn micropayments for every stream</span>
              </li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button onClick={resetForm} className="btn-primary flex-1">
              Upload Another
            </button>
            <button className="btn-secondary flex-1">
              View Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Upload Your Content</h1>
          <p className="text-xl text-gray-600">
            Share your music with the world and start earning
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card p-8"
        >
          {/* Audio Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3">Audio File *</label>
            {!audioFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="hidden"
                  id="audio-upload"
                  required
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <FileAudio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">Upload Audio File</p>
                  <p className="text-sm text-gray-500">MP3, WAV, or FLAC (Max 100MB)</p>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-primary-50 border-2 border-primary-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Music className="w-8 h-8 text-primary-600" />
                  <div>
                    <p className="font-semibold">{audioFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAudioFile(null)}
                  className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3">Cover Image *</label>
            {!coverImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">Upload Cover Image</p>
                  <p className="text-sm text-gray-500">JPG, PNG (Min 1000x1000px)</p>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-primary-50 border-2 border-primary-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <img src={URL.createObjectURL(coverImage)} alt="Cover" className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold">{coverImage.name}</p>
                    <p className="text-sm text-gray-600">
                      {(coverImage.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCoverImage(null)}
                  className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Track Details */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-semibold mb-2">Track Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter track title"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Genre *</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option>Afrobeats</option>
                <option>Afro Soul</option>
                <option>Genge/Hip-Hop</option>
                <option>Afro Jazz</option>
                <option>Traditional/Fusion</option>
                <option>Afro Pop</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about your track..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Collaborators</label>
              <input
                type="text"
                value={formData.collaborators}
                onChange={(e) => setFormData({ ...formData, collaborators: e.target.value })}
                placeholder="Enter wallet addresses (comma separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Smart contracts will automatically split revenue between collaborators
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g. danceable, emotional, street, traditional"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Upload Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Your Content is Protected</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>✓ Ownership registered on Hedera blockchain</li>
                  <li>✓ AI copyright guardian monitors for unauthorized use</li>
                  <li>✓ Immutable proof of creation timestamp</li>
                  <li>✓ Automatic royalty distribution via smart contracts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload to Hedera</span>
            </button>
          </div>
        </motion.form>

        {/* AI Features Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 card p-6 gradient-bg text-white"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-xl font-bold">AI-Powered Discovery</h3>
          </div>
          <p className="text-gray-100">
            Once uploaded, our AI will analyze your track and automatically match you with 
            potential collaborators, recommend it to listeners with similar tastes, and help 
            you reach your target audience across Africa.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

