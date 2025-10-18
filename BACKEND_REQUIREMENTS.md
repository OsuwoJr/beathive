# 🔧 Backend Requirements for BeatHive.Africa

This document outlines everything needed to make the backend work with the existing frontend MVP.

## 📋 Overview

The frontend is built and ready. It currently uses mock data but is structured to seamlessly integrate with a real backend. Here's what you need to implement:

## 🏗️ Architecture Overview

```
Frontend (React) ←→ REST API ←→ Backend Services ←→ Hedera Network
                         ↓
                    Database (PostgreSQL/MongoDB)
                         ↓
                    IPFS Storage
                         ↓
                    AI/ML Services
```

## 🔐 1. Authentication & Wallet Integration

### Required APIs

#### Connect Wallet
```javascript
POST /api/auth/connect
Body: {
  "walletAddress": "0x...",
  "signature": "...",
  "accountId": "0.0.xxxxx"
}
Response: {
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "walletAddress": "0x...",
    "accountId": "0.0.xxxxx",
    "nftId": "0.0.xxxxx", // Creator Identity NFT
    "createdAt": "timestamp"
  }
}
```

### Hedera Integration Needed
- **Hedera SDK**: Install `@hashgraph/sdk`
- **Wallet Connect**: Use HashConnect or Blade Wallet
- **Signature Verification**: Verify wallet ownership
- **NFT Minting**: Create Creator Identity NFT on first connection

### Implementation Steps
1. Set up Hedera testnet/mainnet connection
2. Create account service for wallet verification
3. Implement JWT authentication
4. Store user sessions

---

## 👤 2. User Profile Management

### Required APIs

#### Get User Profile
```javascript
GET /api/users/:id
Response: {
  "id": "uuid",
  "name": "Artist Name",
  "bio": "Artist bio...",
  "avatar": "ipfs://...",
  "coverImage": "ipfs://...",
  "location": "City, Country",
  "genre": "Afrobeats",
  "verified": true,
  "nftId": "0.0.xxxxx",
  "stats": {
    "followers": 2340,
    "totalEarnings": "450.32",
    "streamsCount": 12450,
    "collaborations": 23
  },
  "createdAt": "timestamp"
}
```

#### Update User Profile
```javascript
PATCH /api/users/:id
Headers: Authorization: Bearer <token>
Body: {
  "name": "New Name",
  "bio": "Updated bio",
  "location": "City, Country",
  "genre": "Afrobeats"
}
```

### Database Schema (Users Table)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
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

CREATE INDEX idx_wallet ON users(wallet_address);
CREATE INDEX idx_hedera_account ON users(hedera_account_id);
```

---

## 🎵 3. Content Upload & Storage

### Required APIs

#### Upload Track
```javascript
POST /api/tracks/upload
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: {
  "title": "Track Title",
  "genre": "Afrobeats",
  "description": "Track description",
  "audioFile": File,
  "coverImage": File,
  "collaborators": ["0.0.xxxxx", "0.0.yyyyy"], // Hedera account IDs
  "tags": ["danceable", "emotional"]
}

Response: {
  "trackId": "uuid",
  "nftId": "0.0.xxxxx", // Track NFT ID
  "ipfsHash": "Qm...",
  "status": "uploaded"
}
```

#### Get Track Details
```javascript
GET /api/tracks/:id
Response: {
  "id": "uuid",
  "title": "Track Title",
  "artist": { user_object },
  "genre": "Afrobeats",
  "description": "...",
  "audioUrl": "ipfs://...",
  "coverImageUrl": "ipfs://...",
  "nftId": "0.0.xxxxx",
  "plays": 3200,
  "earnings": "45.20",
  "collaborators": [user_objects],
  "tags": ["danceable", "emotional"],
  "createdAt": "timestamp"
}
```

### Implementation Steps

1. **IPFS Integration**
   ```bash
   npm install ipfs-http-client
   ```
   - Upload audio files to IPFS
   - Upload cover images to IPFS
   - Store IPFS hashes in database

2. **Hedera File Service** (Optional enhancement)
   - Use Hedera File Service for larger files
   - Better integration with Hedera ecosystem

3. **NFT Minting**
   - Use Hedera Token Service (HTS)
   - Mint unique NFT for each track
   - Set royalty structure in NFT metadata

4. **Smart Contracts**
   - Create smart contract for royalty splits
   - Implement automatic payment distribution
   - Handle collaborator revenue sharing

### Database Schema (Tracks Table)
```sql
CREATE TABLE tracks (
  id UUID PRIMARY KEY,
  artist_id UUID REFERENCES users(id),
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
  track_id UUID REFERENCES tracks(id),
  user_id UUID REFERENCES users(id),
  revenue_share DECIMAL(5,2), -- percentage
  PRIMARY KEY (track_id, user_id)
);

CREATE INDEX idx_artist ON tracks(artist_id);
CREATE INDEX idx_genre ON tracks(genre);
```

---

## 🔍 4. Discovery & Search

### Required APIs

#### Search Artists
```javascript
GET /api/artists/search?q=kwame&genre=afrobeats&location=ghana
Response: {
  "results": [artist_objects],
  "total": 10,
  "page": 1
}
```

#### Get All Artists (with filters)
```javascript
GET /api/artists?genre=afrobeats&sort=popularity&limit=20
Response: {
  "artists": [artist_objects],
  "total": 45,
  "page": 1
}
```

### Implementation Steps
1. Implement full-text search (PostgreSQL FTS or Elasticsearch)
2. Add filtering by genre, location
3. Sort by popularity, followers, recent activity
4. Pagination support

---

## 🤖 5. AI Matching Engine

### Required APIs

#### Get AI Recommendations
```javascript
GET /api/ai/recommendations/:userId
Response: {
  "recommendations": [
    {
      "artist": artist_object,
      "compatibility": 95,
      "reason": "Your styles match perfectly",
      "potentialCollaborators": ["Artist1", "Artist2"]
    }
  ]
}
```

### Implementation Steps

1. **Feature Extraction**
   - Extract audio features using librosa or essentia
   - Store features: tempo, key, energy, valence, etc.

2. **ML Model**
   - Use content-based filtering
   - Cosine similarity for style matching
   - Consider: genre, location, popularity, past collaborations

3. **Recommendation Engine**
   ```python
   # Example using Python/FastAPI
   from sklearn.metrics.pairwise import cosine_similarity
   import numpy as np

   def get_recommendations(user_id, top_n=3):
       # Get user's feature vector
       user_features = get_user_features(user_id)
       
       # Get all other users' features
       all_features = get_all_user_features()
       
       # Calculate similarity
       similarities = cosine_similarity([user_features], all_features)
       
       # Get top N matches
       top_indices = np.argsort(similarities[0])[-top_n:]
       
       return get_users_by_indices(top_indices)
   ```

4. **Integration Options**
   - **OpenAI API**: Use GPT-4 for natural language recommendations
   - **Hugging Face**: Use pre-trained music understanding models
   - **Custom Model**: Train on your own data

### Database Schema (AI Features)
```sql
CREATE TABLE audio_features (
  track_id UUID REFERENCES tracks(id),
  tempo FLOAT,
  key INTEGER,
  energy FLOAT,
  valence FLOAT,
  danceability FLOAT,
  feature_vector FLOAT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_preferences (
  user_id UUID REFERENCES users(id),
  preferred_genres TEXT[],
  preferred_locations TEXT[],
  collaboration_interests TEXT[],
  feature_vector FLOAT[]
);
```

---

## 💰 6. Revenue & Payments

### Required APIs

#### Get Dashboard Stats
```javascript
GET /api/dashboard/:userId
Headers: Authorization: Bearer <token>
Response: {
  "totalEarnings": "2345.67",
  "pendingEarnings": "123.45",
  "totalStreams": 45678,
  "followers": 3890,
  "activeCollabs": 12,
  "earningsHistory": [
    { "month": "Jan", "amount": 245 },
    ...
  ],
  "recentActivity": [activity_objects]
}
```

#### Record Stream/Play
```javascript
POST /api/tracks/:id/play
Headers: Authorization: Bearer <token>
Response: {
  "playId": "uuid",
  "earningAdded": "0.01"
}
```

#### Withdraw Funds
```javascript
POST /api/payments/withdraw
Headers: Authorization: Bearer <token>
Body: {
  "amount": "100.00",
  "destination": "0.0.xxxxx" // Hedera account
}
Response: {
  "transactionId": "0.0.xxxxx@timestamp",
  "status": "pending"
}
```

### Implementation Steps

1. **Micropayment System**
   - Use Hedera Token Service (HTS) for USDC/USDT
   - Or use native HBAR
   - Implement per-stream payment calculation

2. **Smart Contract for Revenue Split**
   ```solidity
   // Solidity smart contract example
   contract RevenueSplitter {
       mapping(uint256 => Collaborator[]) public trackCollaborators;
       
       struct Collaborator {
           address account;
           uint8 sharePercentage;
       }
       
       function distributeRevenue(uint256 trackId) public payable {
           Collaborator[] memory collabs = trackCollaborators[trackId];
           for (uint i = 0; i < collabs.length; i++) {
               uint256 amount = msg.value * collabs[i].sharePercentage / 100;
               payable(collabs[i].account).transfer(amount);
           }
       }
   }
   ```

3. **Database Tracking**
   ```sql
   CREATE TABLE streams (
     id UUID PRIMARY KEY,
     track_id UUID REFERENCES tracks(id),
     listener_id UUID REFERENCES users(id),
     earning_amount DECIMAL(10,4),
     played_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE transactions (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES users(id),
     type VARCHAR(20), -- 'earning', 'withdrawal', 'split'
     amount DECIMAL(10,2),
     hedera_tx_id VARCHAR(50),
     status VARCHAR(20), -- 'pending', 'completed', 'failed'
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

---

## 📊 7. Activity & Analytics

### Required APIs

#### Get Recent Activity
```javascript
GET /api/activity/:userId?limit=10
Response: {
  "activities": [
    {
      "id": "uuid",
      "type": "stream", // stream, earning, collab, follower
      "artist": user_object,
      "track": track_object,
      "amount": "0.12",
      "action": "started collaboration",
      "timestamp": "2025-10-18T10:30:00Z"
    }
  ]
}
```

### Database Schema
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(20),
  related_user_id UUID REFERENCES users(id),
  related_track_id UUID REFERENCES tracks(id),
  amount DECIMAL(10,2),
  action TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_activities ON activities(user_id, created_at DESC);
```

---

## 🛡️ 8. NFT Identity & Copyright

### Implementation Steps

1. **Creator Identity NFT**
   - Mint on user registration
   - Store: name, bio, avatar, creation date
   - Use Hedera Token Service (HTS)

2. **Track Ownership NFT**
   - Mint on each upload
   - Store: track metadata, IPFS hash, collaborators
   - Implement royalty structure

3. **Copyright Guardian**
   - Implement audio fingerprinting
   - Use services like AcoustID or build custom
   - Monitor for unauthorized use
   - Send alerts to creators

### Hedera Integration Example
```javascript
// Using Hedera SDK
const { Client, TokenCreateTransaction, TokenType } = require("@hashgraph/sdk");

async function mintCreatorNFT(accountId, metadata) {
  const client = Client.forTestnet();
  
  const transaction = await new TokenCreateTransaction()
    .setTokenName("BeatHive Creator Identity")
    .setTokenSymbol("BHCI")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(accountId)
    .setSupplyKey(client.operatorPublicKey)
    .execute(client);
    
  const receipt = await transaction.getReceipt(client);
  const tokenId = receipt.tokenId;
  
  return tokenId.toString();
}
```

---

## 🌐 9. API Structure

### Base URL
```
Development: http://localhost:4000/api
Production: https://api.beathive.africa/api
```

### Standard Response Format
```javascript
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2025-10-18T10:30:00Z"
}

// Error Response
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  },
  "timestamp": "2025-10-18T10:30:00Z"
}
```

### Authentication
```
Authorization: Bearer <jwt_token>
```

---

## 🔧 10. Technology Stack Recommendations

### Backend Framework Options
1. **Node.js + Express** (Recommended - matches frontend stack)
2. **Python + FastAPI** (Better for AI/ML features)
3. **Go + Gin** (High performance)

### Database
- **PostgreSQL** (Recommended) - Robust, good for financial data
- **MongoDB** - Flexible schema for rapid iteration

### Storage
- **IPFS** - Decentralized file storage
- **Hedera File Service** - Alternative/complement to IPFS

### Hedera Integration
- `@hashgraph/sdk` - Official Hedera SDK
- HashConnect or Blade Wallet for user authentication

### AI/ML Services
- **Option 1**: OpenAI API (fastest to implement)
- **Option 2**: Hugging Face models (open source)
- **Option 3**: Custom ML model (most control)

### Additional Services
- **Redis** - Caching and session management
- **Bull** - Job queues for async tasks
- **Socket.io** - Real-time updates

---

## 📝 11. Environment Variables Needed

Create `.env` file:
```bash
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/beathive

# Hedera
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=302...
HEDERA_PUBLIC_KEY=302...

# IPFS
IPFS_API_URL=https://ipfs.infura.io:5001
IPFS_API_KEY=your_key
IPFS_API_SECRET=your_secret

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# AI Services (Optional)
OPENAI_API_KEY=sk-...
HUGGINGFACE_API_KEY=hf_...

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 12. Deployment Checklist

### Backend Deployment
- [ ] Set up PostgreSQL database
- [ ] Deploy backend to cloud (Heroku, AWS, DigitalOcean)
- [ ] Configure environment variables
- [ ] Set up IPFS node or use Infura/Pinata
- [ ] Set up Hedera testnet/mainnet accounts
- [ ] Implement rate limiting and security
- [ ] Set up monitoring (Sentry, DataDog)
- [ ] Configure CORS for frontend domain

### Frontend Deployment
- [ ] Update API endpoints in frontend code
- [ ] Deploy to Vercel/Netlify
- [ ] Configure custom domain
- [ ] Test wallet integration
- [ ] Test all user flows

---

## 📚 13. Learning Resources

### Hedera Development
- [Hedera Docs](https://docs.hedera.com/)
- [Hedera SDK Examples](https://github.com/hashgraph/hedera-sdk-js)
- [HashConnect Docs](https://docs.hashconnect.hashpack.app/)

### IPFS Integration
- [IPFS Docs](https://docs.ipfs.tech/)
- [js-ipfs](https://github.com/ipfs/js-ipfs)

### AI/ML for Music
- [Librosa](https://librosa.org/) - Audio analysis
- [Essentia](https://essentia.upf.edu/) - Audio feature extraction

---

## 🎯 Priority Implementation Order

1. **Phase 1** (Week 1): Core Backend
   - User authentication with Hedera wallet
   - Basic CRUD for users and tracks
   - IPFS integration for file storage

2. **Phase 2** (Week 2): Blockchain Integration
   - Creator Identity NFT minting
   - Track NFT minting
   - Basic payment system

3. **Phase 3** (Week 3): Advanced Features
   - AI matching engine
   - Revenue dashboard
   - Analytics and activity tracking

4. **Phase 4** (Week 4): Polish & Deploy
   - Smart contracts for revenue split
   - Copyright guardian
   - Testing and deployment

---

## 🤝 Need Help?

The frontend is ready and waiting for your backend! Follow this guide step by step, and you'll have a fully functional platform. Good luck with the Hedera Africa Hackathon! 🚀

For questions or issues, create a GitHub issue or reach out to the team.

