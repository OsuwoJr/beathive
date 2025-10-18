import { Music, Twitter, Github, Globe, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 gradient-bg rounded-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BeatHive.Africa</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering African street creators through decentralized AI and Hedera DLT. 
              Own your music, collaborate transparently, earn fairly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-500 transition-colors">Discover Artists</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">AI Matching</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">DePIN Nodes</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Hedera Network</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center space-x-1">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for African Creators • Powered by Hedera DLT</span>
          </p>
          <p className="mt-2">© 2025 BeatHive.Africa. Part of The Troublers Street Talent Initiative.</p>
        </div>
      </div>
    </footer>
  )
}

