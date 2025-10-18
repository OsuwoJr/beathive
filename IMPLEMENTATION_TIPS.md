# 💡 Implementation Tips for Backend Development

Quick tips and code snippets to speed up your backend development.

## 🎯 Top Priority APIs to Build First

### Week 1: Core Foundation
1. **User Authentication**
   - Wallet connection endpoint
   - JWT token generation
   - Basic user profile CRUD

2. **Content Management**
   - Track upload to IPFS
   - Basic track listing
   - Track details retrieval

### Week 2: Blockchain Integration
3. **Hedera Integration**
   - Creator NFT minting
   - Track NFT minting
   - Basic wallet interactions

### Week 3: Advanced Features
4. **AI Recommendations**
   - Simple matching algorithm
   - Genre-based recommendations
   - Location-based suggestions

5. **Revenue System**
   - Track plays/streams
   - Basic earnings calculation
   - Dashboard stats

## 🔌 Frontend API Integration Points

Once your backend is ready, update these files:

### 1. Update API Base URL
Create `src/config/api.js`:
```javascript
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000/api'

export const api = {
  // Auth
  connectWallet: (data) => fetch(`${API_BASE_URL}/auth/connect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  // Users
  getUser: (id) => fetch(`${API_BASE_URL}/users/${id}`),
  updateUser: (id, data, token) => fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }),
  
  // Tracks
  uploadTrack: (formData, token) => fetch(`${API_BASE_URL}/tracks/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  }),
  
  searchArtists: (params) => fetch(`${API_BASE_URL}/artists/search?${new URLSearchParams(params)}`),
  
  // AI
  getRecommendations: (userId) => fetch(`${API_BASE_URL}/ai/recommendations/${userId}`),
  
  // Dashboard
  getDashboard: (userId, token) => fetch(`${API_BASE_URL}/dashboard/${userId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
}
```

### 2. Update Store to Use Real API
Modify `src/store/useStore.js`:
```javascript
import { create } from 'zustand'
import { api } from '../config/api'

const useStore = create((set) => ({
  user: null,
  token: null,
  isWalletConnected: false,
  
  connectWallet: async (walletAddress, signature) => {
    try {
      const response = await api.connectWallet({ walletAddress, signature })
      const data = await response.json()
      
      set({ 
        isWalletConnected: true, 
        user: data.user,
        token: data.token
      })
      
      // Store token in localStorage
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      console.error('Wallet connection failed:', error)
      throw error
    }
  },
  
  disconnectWallet: () => {
    localStorage.removeItem('token')
    set({ 
      isWalletConnected: false, 
      user: null,
      token: null
    })
  },
}))

export default useStore
```

### 3. Replace Mock Data in Pages
In each page component, replace:
```javascript
// Old (mock data)
import { mockArtists } from '../data/mockData'

// New (real API)
import { api } from '../config/api'
import { useState, useEffect } from 'react'

function DiscoverPage() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await api.searchArtists({ genre: selectedGenre })
        const data = await response.json()
        setArtists(data.results)
      } catch (error) {
        console.error('Failed to fetch artists:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArtists()
  }, [selectedGenre])
  
  // Rest of component...
}
```

## 🔐 Hedera Wallet Integration (Frontend)

### Using HashConnect
```bash
npm install hashconnect
```

```javascript
// src/services/hashconnect.js
import { HashConnect } from 'hashconnect'

let hashconnect
let appMetadata = {
  name: "BeatHive.Africa",
  description: "Decentralized platform for African creators",
  icon: "https://beathive.africa/logo.png"
}

export async function initHashConnect() {
  hashconnect = new HashConnect(true) // true for testnet
  
  await hashconnect.init(appMetadata)
  
  hashconnect.pairingEvent.on((pairingData) => {
    console.log('Paired:', pairingData)
  })
  
  return hashconnect
}

export async function connectWallet() {
  if (!hashconnect) await initHashConnect()
  
  const state = await hashconnect.connect()
  const pairingString = hashconnect.generatePairingString(state, "testnet", false)
  
  return { state, pairingString }
}

export async function signMessage(message) {
  // Sign message for authentication
  const result = await hashconnect.sendTransaction(
    hashconnect.hcData.topic,
    message
  )
  return result
}
```

Update Navbar to use real wallet connection:
```javascript
// src/components/Navbar.jsx
import { connectWallet, signMessage } from '../services/hashconnect'

const handleWalletConnect = async () => {
  try {
    const { state, pairingString } = await connectWallet()
    
    // Show QR code or pairing string to user
    // After pairing, sign a message
    const signature = await signMessage("BeatHive Authentication")
    
    // Send to backend
    await store.connectWallet(state.accountId, signature)
  } catch (error) {
    console.error('Wallet connection failed:', error)
    alert('Failed to connect wallet')
  }
}
```

## 🗄️ Backend Quick Setup (Node.js + Express)

### Basic Server Structure
```javascript
// server.js
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/tracks', require('./routes/tracks'))
app.use('/api/artists', require('./routes/artists'))
app.use('/api/ai', require('./routes/ai'))
app.use('/api/dashboard', require('./routes/dashboard'))

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: err.message
    }
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
```

### Sample Auth Route
```javascript
// routes/auth.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { Client } = require('@hashgraph/sdk')

router.post('/connect', async (req, res) => {
  try {
    const { walletAddress, signature, accountId } = req.body
    
    // Verify signature (implement verification logic)
    // const isValid = await verifySignature(walletAddress, signature)
    // if (!isValid) return res.status(401).json({ error: 'Invalid signature' })
    
    // Check if user exists, if not create
    let user = await db.users.findOne({ walletAddress })
    
    if (!user) {
      // Mint Creator Identity NFT
      const nftId = await mintCreatorNFT(accountId)
      
      user = await db.users.create({
        walletAddress,
        accountId,
        nftId,
        name: 'New Creator'
      })
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, accountId: user.accountId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          accountId: user.accountId,
          nftId: user.nftId,
          name: user.name
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'AUTH_ERROR', message: error.message }
    })
  }
})

module.exports = router
```

## 📦 IPFS Integration Example

```javascript
// services/ipfs.js
const { create } = require('ipfs-http-client')

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      process.env.IPFS_API_KEY + ':' + process.env.IPFS_API_SECRET
    ).toString('base64')}`
  }
})

async function uploadToIPFS(file) {
  const result = await ipfs.add(file)
  return result.path // Returns IPFS hash
}

async function getFromIPFS(hash) {
  const chunks = []
  for await (const chunk of ipfs.cat(hash)) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

module.exports = { uploadToIPFS, getFromIPFS }
```

## 🤖 Simple AI Matching Algorithm

```javascript
// services/aiMatching.js

function calculateCompatibility(user1, user2) {
  let score = 0
  
  // Genre match (40%)
  if (user1.genre === user2.genre) score += 40
  else if (areRelatedGenres(user1.genre, user2.genre)) score += 20
  
  // Location proximity (30%)
  if (user1.location.country === user2.location.country) score += 30
  else if (user1.location.region === user2.location.region) score += 15
  
  // Similar follower count (20%)
  const followerRatio = Math.min(user1.followers, user2.followers) / 
                        Math.max(user1.followers, user2.followers)
  score += followerRatio * 20
  
  // Collaboration history (10%)
  const commonCollabs = getCommonCollaborators(user1, user2)
  score += Math.min(commonCollabs.length * 5, 10)
  
  return Math.round(score)
}

function getRecommendations(userId, limit = 3) {
  const user = getUser(userId)
  const allUsers = getAllUsers().filter(u => u.id !== userId)
  
  const scored = allUsers.map(u => ({
    user: u,
    compatibility: calculateCompatibility(user, u),
    reason: generateReason(user, u)
  }))
  
  return scored
    .sort((a, b) => b.compatibility - a.compatibility)
    .slice(0, limit)
}

function generateReason(user1, user2) {
  if (user1.genre === user2.genre) {
    return "Your styles match perfectly"
  } else if (user1.location.city === user2.location.city) {
    return `Both based in ${user1.location.city}`
  } else {
    return "Complementary music styles"
  }
}

module.exports = { getRecommendations }
```

## 🔒 JWT Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'NO_TOKEN', message: 'Authentication required' }
    })
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
      })
    }
    
    req.user = user
    next()
  })
}

module.exports = { authenticateToken }
```

## 📊 Database Schema (PostgreSQL)

```sql
-- Run these in order

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(42) UNIQUE NOT NULL,
  hedera_account_id VARCHAR(20) UNIQUE NOT NULL,
  nft_id VARCHAR(20) UNIQUE,
  name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  location VARCHAR(100),
  genre VARCHAR(50),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  genre VARCHAR(50),
  description TEXT,
  audio_ipfs_hash VARCHAR(100),
  cover_ipfs_hash VARCHAR(100),
  nft_id VARCHAR(20) UNIQUE,
  plays INTEGER DEFAULT 0,
  earnings DECIMAL(10,2) DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE track_collaborators (
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  revenue_share DECIMAL(5,2),
  PRIMARY KEY (track_id, user_id)
);

CREATE TABLE streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  listener_id UUID REFERENCES users(id) ON DELETE SET NULL,
  earning_amount DECIMAL(10,4),
  played_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE followers (
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20),
  related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  related_track_id UUID REFERENCES tracks(id) ON DELETE SET NULL,
  amount DECIMAL(10,2),
  action TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tracks_artist ON tracks(artist_id);
CREATE INDEX idx_tracks_genre ON tracks(genre);
CREATE INDEX idx_streams_track ON streams(track_id);
CREATE INDEX idx_activities_user ON activities(user_id, created_at DESC);
```

## 🚀 Deployment Quick Guide

### Backend (Heroku)
```bash
# Install Heroku CLI, then:
heroku create beathive-api
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret
heroku config:set HEDERA_ACCOUNT_ID=0.0.xxxxx
# ... set other env vars
git push heroku main
```

### Frontend (Vercel)
```bash
# Install Vercel CLI, then:
vercel
# Follow prompts
# Set environment variable: VITE_API_URL=https://beathive-api.herokuapp.com/api
```

## ✅ Testing Checklist

- [ ] User can connect Hedera wallet
- [ ] User profile is created and NFT minted
- [ ] User can upload audio file
- [ ] File is stored on IPFS
- [ ] Track NFT is minted
- [ ] Track appears in discovery page
- [ ] Search and filters work
- [ ] AI recommendations load
- [ ] Profile page shows correct data
- [ ] Plays are tracked
- [ ] Earnings are calculated
- [ ] Dashboard shows correct stats
- [ ] Revenue can be withdrawn

## 🎉 You're Ready!

Follow this guide alongside `BACKEND_REQUIREMENTS.md` and you'll have a fully functional platform. Good luck with the hackathon! 🚀

---

Questions? Create an issue on GitHub or reach out to the team.

