# 🎯 Complete Setup Guide - BeatHive.Africa

Follow these steps **in order** to get your full application running with backend and frontend connected.

---

## ✅ Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL installed and running
- [ ] Git installed
- [ ] A Hedera testnet account (we'll create this)
- [ ] IPFS account (Infura or Pinata - we'll set this up)
- [ ] A code editor (VS Code recommended)
- [ ] 2-3 hours of time to complete setup

---

## 📋 PART 1: Database Setup (30 minutes)

### Step 1.1: Install PostgreSQL

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer, choose default settings
3. Remember the password you set for `postgres` user
4. Port: 5432 (default)

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 1.2: Create Database

Open PostgreSQL command line or use pgAdmin:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE beathive_db;

# Create user (optional, for security)
CREATE USER beathive_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE beathive_db TO beathive_user;

# Exit
\q
```

### Step 1.3: Verify Database Connection

```bash
psql -U postgres -d beathive_db -c "SELECT version();"
```

You should see PostgreSQL version information. ✅

---

## 🌐 PART 2: Hedera Setup (20 minutes)

### Step 2.1: Create Hedera Testnet Account

1. Go to https://portal.hedera.com/
2. Sign up for a free account
3. Navigate to "Testnet" section
4. Click "Create Account"
5. **SAVE THESE VALUES:**
   - Account ID (e.g., `0.0.12345678`)
   - Private Key (starts with `302e020100...`)
   - Public Key

### Step 2.2: Fund Your Account

1. Go to https://portal.hedera.com/faucet
2. Enter your Account ID
3. Request test HBAR (you'll get 10,000 test HBAR)
4. Wait 30 seconds

### Step 2.3: Verify Account

```bash
# You can check your balance at:
# https://hashscan.io/testnet/account/YOUR_ACCOUNT_ID
```

---

## 📦 PART 3: IPFS Setup (15 minutes)

### Step 3.1: Create Infura Account (Recommended)

1. Go to https://infura.io/
2. Sign up for free account
3. Create new project
4. Select "IPFS"
5. **SAVE THESE VALUES:**
   - Project ID
   - Project Secret
   - API Endpoint: `https://ipfs.infura.io:5001`

### Alternative: Use Pinata

1. Go to https://pinata.cloud/
2. Sign up for free account
3. Go to API Keys
4. Create new key
5. **SAVE THESE VALUES:**
   - API Key
   - API Secret

---

## 🔧 PART 4: Backend Setup (45 minutes)

### Step 4.1: Install Backend Dependencies

```bash
cd backend
npm install
```

Wait for all packages to install (this may take 5-10 minutes).

### Step 4.2: Create Environment File

```bash
# Copy the example file
cp env.example .env
```

### Step 4.3: Configure .env File

Open `backend/.env` in your editor and fill in ALL values:

```env
# Server Configuration
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000

# Database Configuration (use your values from Step 1.2)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/beathive_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=beathive_db
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD

# JWT Configuration (generate a random string)
JWT_SECRET=YOUR_RANDOM_SECRET_HERE_MAKE_IT_LONG_AND_COMPLEX
JWT_EXPIRES_IN=7d

# Hedera Configuration (from Step 2.1)
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=YOUR_ACCOUNT_ID
HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY
HEDERA_TREASURY_ID=YOUR_ACCOUNT_ID
HEDERA_TREASURY_KEY=YOUR_PRIVATE_KEY

# IPFS Configuration (from Step 3.1)
IPFS_API_URL=https://ipfs.infura.io:5001
IPFS_PROJECT_ID=YOUR_INFURA_PROJECT_ID
IPFS_PROJECT_SECRET=YOUR_INFURA_PROJECT_SECRET
IPFS_GATEWAY=https://ipfs.io/ipfs/

# Payment Configuration
STREAM_PAYMENT_AMOUNT=0.01
PLATFORM_FEE_PERCENTAGE=2

# File Upload Limits (bytes)
MAX_AUDIO_SIZE=104857600
MAX_IMAGE_SIZE=10485760

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**IMPORTANT:** Replace ALL placeholder values!

### Step 4.4: Run Database Migrations

```bash
npm run migrate
```

You should see:
```
✅ Database connection established
✅ Tables created successfully
✅ All migrations completed!
```

### Step 4.5: (Optional) Seed Sample Data

For testing purposes, add sample data:

```bash
npm run migrate -- --seed
```

This adds 3 sample artists and tracks to your database.

### Step 4.6: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ Database connection established successfully
✅ Database synced
🚀 BeatHive Backend running on port 4000
📡 Environment: development
🌐 Frontend URL: http://localhost:3000
🔗 API URL: http://localhost:4000/api

✨ Ready to power African creators!
```

✅ **Backend is now running!** Keep this terminal open.

---

## 🎨 PART 5: Frontend Setup (20 minutes)

### Step 5.1: Install Frontend Dependencies

Open a **NEW terminal** (keep backend running):

```bash
cd ..
npm install
```

### Step 5.2: Create Frontend Environment File

```bash
# Create .env file in root directory
echo "VITE_API_URL=http://localhost:4000/api" > .env
```

### Step 5.3: Update Frontend API Configuration

Create `src/config/api.js`:

```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// API helper functions
export const api = {
  // Auth
  connectWallet: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Users
  getUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  // Artists
  searchArtists: async (params) => {
    const response = await fetch(`${API_BASE_URL}/artists/search?${new URLSearchParams(params)}`);
    return response.json();
  },

  // Tracks
  uploadTrack: async (formData, token) => {
    const response = await fetch(`${API_BASE_URL}/tracks/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    return response.json();
  },

  // AI
  getRecommendations: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/ai/recommendations/${userId}`);
    return response.json();
  },

  // Dashboard
  getDashboard: async (userId, token) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};
```

### Step 5.4: Start Frontend Server

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

✅ **Frontend is now running!**

---

## 🔗 PART 6: Connect Frontend to Backend (30 minutes)

### Step 6.1: Update Store to Use Real API

Edit `src/store/useStore.js`:

```javascript
import { create } from 'zustand'
import { api } from '../config/api'

const useStore = create((set) => ({
  user: null,
  token: null,
  isWalletConnected: false,
  
  connectWallet: async (walletAddress, signature, accountId) => {
    try {
      const data = await api.connectWallet({ 
        walletAddress, 
        signature, 
        accountId 
      });
      
      if (data.success) {
        set({ 
          isWalletConnected: true, 
          user: data.data.user,
          token: data.data.token
        });
        
        localStorage.setItem('token', data.data.token);
        return data;
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  },
  
  disconnectWallet: () => {
    localStorage.removeItem('token');
    set({ 
      isWalletConnected: false, 
      user: null,
      token: null
    });
  },

  // Load token from localStorage on init
  initialize: () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          set({
            isWalletConnected: true,
            user: data.data.user,
            token
          });
        }
      });
    }
  }
}));

// Initialize store
useStore.getState().initialize();

export default useStore;
```

### Step 6.2: Update Discover Page

Edit `src/pages/DiscoverPage.jsx` to use real API:

```javascript
import { useState, useEffect } from 'react'
// ... other imports
import { api } from '../config/api'

export default function DiscoverPage() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  useEffect(() => {
    async function fetchArtists() {
      try {
        setLoading(true)
        const data = await api.searchArtists({ 
          q: searchTerm, 
          genre: selectedGenre 
        })
        
        if (data.success) {
          setArtists(data.data.results)
        }
      } catch (error) {
        console.error('Failed to fetch artists:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArtists()
  }, [searchTerm, selectedGenre])

  // Rest of component...
}
```

---

## ✅ PART 7: Testing Everything (30 minutes)

### Test 7.1: Backend Health Check

Open browser to: `http://localhost:4000/health`

You should see:
```json
{
  "success": true,
  "message": "BeatHive API is running",
  "timestamp": "2025-10-18T..."
}
```

### Test 7.2: Frontend Loading

Open browser to: `http://localhost:3000`

You should see the BeatHive landing page.

### Test 7.3: Test Wallet Connection

1. Click "Connect Wallet" button
2. For testing, modify Navbar to use mock connection:

```javascript
const handleWalletConnect = async () => {
  if (isWalletConnected) {
    disconnectWallet()
    navigate('/')
  } else {
    // Mock connection for testing
    const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`
    const mockAccountId = '0.0.100000'
    
    await connectWallet(mockAddress, 'mock_signature', mockAccountId)
  }
}
```

3. Click connect - should create account in database
4. Check PostgreSQL:

```bash
psql -U postgres -d beathive_db -c "SELECT * FROM users;"
```

You should see your newly created user!

### Test 7.4: Test Artist Discovery

1. Go to `/discover`
2. If you seeded data, you should see 3 artists
3. Try searching and filtering

### Test 7.5: Test Upload (Manual)

1. Click "Upload" (must be connected)
2. Select an audio file and image
3. Fill in details
4. Submit
5. Check database:

```bash
psql -U postgres -d beathive_db -c "SELECT * FROM tracks;"
```

---

## 🚀 PART 8: Deployment (Optional - 60 minutes)

### Step 8.1: Deploy Backend to Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create beathive-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_secret
heroku config:set HEDERA_OPERATOR_ID=your_account_id
heroku config:set HEDERA_OPERATOR_KEY=your_private_key
heroku config:set IPFS_PROJECT_ID=your_project_id
heroku config:set IPFS_PROJECT_SECRET=your_secret
# ... set all other env vars

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main

# Run migrations
heroku run npm run migrate
```

### Step 8.2: Deploy Frontend to Vercel

```bash
cd ..

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Set environment variable: VITE_API_URL=https://beathive-api.herokuapp.com/api
```

---

## 📝 PART 9: Troubleshooting

### Problem: Database connection failed

**Solution:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list  # Mac

# Test connection
psql -U postgres -c "SELECT version();"
```

### Problem: Backend won't start

**Solution:**
1. Check all .env values are filled
2. Check PostgreSQL is running
3. Check port 4000 is not in use:
```bash
# Windows
netstat -ano | findstr :4000

# Mac/Linux
lsof -i :4000
```

### Problem: Hedera NFT minting fails

**Solution:**
1. Check account has sufficient HBAR
2. Verify private key is correct
3. Check Hedera testnet status
4. Try without NFT minting first (backend handles this gracefully)

### Problem: IPFS upload fails

**Solution:**
1. Verify Infura credentials
2. Check project hasn't reached free tier limits
3. Try Pinata as alternative
4. Check file sizes are within limits

### Problem: Frontend shows CORS error

**Solution:**
Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: '*',  // For testing only!
  credentials: true
}));
```

---

## 🎯 Next Steps Checklist

After setup is complete:

- [ ] Test all API endpoints with Postman
- [ ] Integrate HashConnect for real wallet connection
- [ ] Test file uploads with real audio files
- [ ] Test revenue distribution
- [ ] Add more sample artists
- [ ] Customize AI matching algorithm
- [ ] Set up monitoring (Sentry)
- [ ] Configure production environment
- [ ] Prepare demo for hackathon
- [ ] Record demo video

---

## 📞 Need Help?

Common issues and solutions:

1. **Port already in use**: Change PORT in .env
2. **Database authentication failed**: Check password in DATABASE_URL
3. **Module not found**: Run `npm install` again
4. **Hedera errors**: Verify account ID and private key
5. **IPFS timeout**: Check internet connection and credentials

---

## 🎉 Congratulations!

If you've completed all steps, you now have:

✅ Full backend API running
✅ PostgreSQL database set up
✅ Hedera blockchain integration
✅ IPFS file storage
✅ Frontend connected to backend
✅ Working authentication
✅ AI matching system
✅ Revenue tracking
✅ Complete BeatHive platform!

**You're ready to win the Hedera Africa Hackathon! 🏆**

---

## 📚 Additional Resources

- [Hedera Documentation](https://docs.hedera.com/)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [PostgreSQL Guide](https://www.postgresql.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)

---

**Time to completion: 3-4 hours**
**Difficulty: Intermediate**
**Stack: React + Node.js + PostgreSQL + Hedera + IPFS**

Good luck! 🚀🎵🌍

