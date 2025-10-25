import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, DollarSign, Play, Users, Music2, 
  Calendar, ArrowUp, ArrowDown, Download, ExternalLink,
  Wallet, Award, Activity, Vote, MapPin, Shield, Users as UsersIcon
} from 'lucide-react'
import useStore from '../store/useStore'
import { recentActivity, dashboardStats, hackathonFeatures } from '../data/mockData'

export default function DashboardPage() {
  const { user } = useStore()
  const [timeRange, setTimeRange] = useState('7d')

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600">
            Please connect your wallet to view your dashboard
          </p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: 'Total Earnings',
      value: dashboardStats.totalEarnings,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Total Streams',
      value: dashboardStats.totalStreams.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: Play,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Followers',
      value: dashboardStats.followers.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Active Collabs',
      value: dashboardStats.activeCollabs,
      change: '+2',
      trend: 'up',
      icon: Music2,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ]

  const earnings = dashboardStats.earningsHistory

  const maxEarning = Math.max(...earnings.map(e => e.amount))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's how your content is performing</p>
        </motion.div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-2 mb-6">
          {['24h', '7d', '30d', '90d', 'All'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Earnings Chart */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Earnings Overview</h2>
              <button className="flex items-center space-x-2 text-sm text-primary-600 font-semibold hover:text-primary-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            <div className="space-y-4">
              {earnings.map((item, index) => (
                <motion.div
                  key={item.month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 text-sm font-semibold text-gray-600">{item.month}</div>
                  <div className="flex-grow">
                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.amount / maxEarning) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="h-full gradient-bg rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right font-bold text-gray-900">${item.amount}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Average/Month</div>
                  <div className="text-xl font-bold text-gray-900">
                    ${(earnings.reduce((sum, e) => sum + e.amount, 0) / earnings.length).toFixed(0)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Best Month</div>
                  <div className="text-xl font-bold text-green-600">${maxEarning}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Growth</div>
                  <div className="text-xl font-bold text-blue-600">+68%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="space-y-6">
            <div className="card p-6 gradient-bg text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Wallet className="w-6 h-6" />
                <h3 className="text-xl font-bold">My Wallet</h3>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-200 mb-1">Account ID</div>
                <div className="font-mono text-sm break-all">{user.accountId}</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-200">Available Balance</span>
                  <span className="text-2xl font-bold">$2,345.67</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-200">Pending</span>
                  <span className="font-semibold">$123.45</span>
                </div>
              </div>

              <button className="w-full bg-white text-primary-600 px-4 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Withdraw Funds</span>
              </button>
            </div>

            {/* NFT Identity */}
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-primary-600" />
                <h3 className="text-lg font-bold">Creator NFT</h3>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center text-white">
                  <Music2 className="w-16 h-16 mx-auto mb-3" />
                  <div className="text-lg font-bold">{user.name}</div>
                  <div className="text-sm opacity-80">Creator Identity</div>
                </div>
              </div>

              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View on HashScan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hackathon Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Award className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">🏆 Hackathon Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Vote className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">DAO Governance</span>
              </div>
              <p className="text-sm text-purple-600">Community voting & proposals</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Street Nodes</span>
              </div>
              <p className="text-sm text-blue-600">DePIN IoT recording hubs</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">AI Guardian</span>
              </div>
              <p className="text-sm text-green-600">Copyright protection</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <UsersIcon className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">Troublers</span>
              </div>
              <p className="text-sm text-orange-600">Street talent verification</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'earning' || activity.type === 'stream' 
                      ? 'bg-green-100 text-green-600'
                      : activity.type === 'vote'
                      ? 'bg-purple-100 text-purple-600'
                      : activity.type === 'node'
                      ? 'bg-blue-100 text-blue-600'
                      : activity.type === 'copyright'
                      ? 'bg-red-100 text-red-600'
                      : activity.type === 'troublers'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  
                  <div>
                    <div className="font-semibold">
                      {activity.artist}
                      {activity.track && ` - ${activity.track}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.action || `${activity.type === 'stream' ? 'Stream' : 'Earning'}`}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {activity.amount && (
                    <div className="font-bold text-green-600">+${activity.amount}</div>
                  )}
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

