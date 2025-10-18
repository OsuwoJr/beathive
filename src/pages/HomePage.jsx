import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Music, Sparkles, TrendingUp, Shield, Users, Zap, 
  Globe, Award, ArrowRight, Play 
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by Hedera DLT + AI</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Powering Africa's Creators<br />
              <span className="text-secondary-300">with AI + Blockchain</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
              A decentralized platform where street musicians, dancers, and creators 
              earn fairly, collaborate transparently, and own their digital identity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/discover" className="group flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { label: 'Active Creators', value: '2,340+' },
                { label: 'Total Earnings', value: '$450K+' },
                { label: 'Collaborations', value: '1,200+' },
                { label: 'Countries', value: '15+' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for <span className="gradient-text">African Creators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to thrive as an independent artist in the Web3 era
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Digital Identity NFT',
                description: 'Your verifiable creator passport on Hedera. Store your history, collaborations, and achievements.',
                color: 'text-blue-600',
                bg: 'bg-blue-50'
              },
              {
                icon: Sparkles,
                title: 'AI Collab Matching',
                description: 'Smart recommendations connect you with artists who match your style, region, and goals.',
                color: 'text-purple-600',
                bg: 'bg-purple-50'
              },
              {
                icon: TrendingUp,
                title: 'Instant Micropayments',
                description: 'Get paid per stream, download, or remix. Revenue splits automatically via smart contracts.',
                color: 'text-green-600',
                bg: 'bg-green-50'
              },
              {
                icon: Globe,
                title: 'DePIN Recording Nodes',
                description: 'Access community recording hubs across African cities. Every upload is blockchain-verified.',
                color: 'text-orange-600',
                bg: 'bg-orange-50'
              },
              {
                icon: Users,
                title: 'Creator DAO',
                description: 'Vote on platform features, funding, and spotlight challenges using governance tokens.',
                color: 'text-pink-600',
                bg: 'bg-pink-50'
              },
              {
                icon: Zap,
                title: 'Copyright Guardian',
                description: 'AI-powered protection detects and flags unauthorized use of your work across the network.',
                color: 'text-yellow-600',
                bg: 'bg-yellow-50'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 hover:scale-105 transition-transform"
              >
                <div className={`${feature.bg} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and own your creative journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Link your Hedera wallet in seconds' },
              { step: '02', title: 'Create Profile', desc: 'Mint your Creator Identity NFT' },
              { step: '03', title: 'Upload Content', desc: 'Share your music and get discovered' },
              { step: '04', title: 'Earn & Collaborate', desc: 'Get paid instantly and connect with others' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-primary-300"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Africa's Creator Revolution
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Be part of a community that values transparency, fairness, and creative ownership. 
            Your music, your rules.
          </p>
          <Link to="/discover" className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

