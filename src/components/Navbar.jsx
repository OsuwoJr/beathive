import { Link, useNavigate } from 'react-router-dom'
import { Music, Search, Upload, LayoutDashboard, Wallet } from 'lucide-react'
import useStore from '../store/useStore'

export default function Navbar() {
  const { user, isWalletConnected, connectWallet, disconnectWallet } = useStore()
  const navigate = useNavigate()

  const handleWalletConnect = () => {
    if (isWalletConnected) {
      disconnectWallet()
      navigate('/')
    } else {
      // Simulate wallet connection
      const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`
      connectWallet(mockAddress)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 gradient-bg rounded-lg transform group-hover:scale-110 transition-transform">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">BeatHive.Africa</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/discover" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
              <span className="font-medium">Discover</span>
            </Link>
            
            {isWalletConnected && (
              <>
                <Link to="/upload" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Upload</span>
                </Link>
                
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </>
            )}
          </div>

          {/* Wallet Connect Button */}
          <button
            onClick={handleWalletConnect}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
              isWalletConnected
                ? 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                : 'btn-primary'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="hidden sm:inline">
              {isWalletConnected 
                ? `${user.accountId}` 
                : 'Connect Wallet'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

