# BeatHive Backend API

Complete backend server for BeatHive.Africa platform.

## 📁 Project Structure

```
backend/
├── config/              # Configuration files
│   ├── database.js      # Database configuration
│   ├── hedera.js        # Hedera client setup
│   └── ipfs.js          # IPFS client setup
├── controllers/         # Request handlers
│   ├── authController.js
│   ├── userController.js
│   ├── trackController.js
│   ├── artistController.js
│   ├── aiController.js
│   ├── dashboardController.js
│   ├── activityController.js
│   └── paymentController.js
├── middleware/          # Express middleware
│   ├── auth.js          # Authentication
│   ├── errorHandler.js  # Error handling
│   ├── rateLimiter.js   # Rate limiting
│   ├── upload.js        # File upload
│   └── validation.js    # Input validation
├── models/              # Database models
│   ├── index.js
│   ├── User.js
│   ├── Track.js
│   ├── Collaborator.js
│   ├── Stream.js
│   ├── Activity.js
│   ├── Follower.js
│   └── Transaction.js
├── routes/              # API routes
│   ├── auth.js
│   ├── users.js
│   ├── tracks.js
│   ├── artists.js
│   ├── ai.js
│   ├── dashboard.js
│   ├── activity.js
│   └── payments.js
├── services/            # Business logic
│   ├── hederaService.js
│   ├── ipfsService.js
│   ├── aiMatchingService.js
│   └── revenueService.js
├── migrations/          # Database setup
│   ├── createTables.sql
│   ├── seedData.sql
│   └── runMigrations.js
├── utils/               # Helper functions
│   └── response.js
├── server.js            # Main entry point
├── package.json
└── env.example          # Environment template
```

## 🚀 Quick Start

See the main SETUP_GUIDE.md in the root directory for complete setup instructions.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/connect` - Connect wallet and login
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id` - Update profile
- `GET /api/users/:id/stats` - Get user statistics

### Tracks
- `POST /api/tracks/upload` - Upload new track
- `GET /api/tracks/:id` - Get track details
- `POST /api/tracks/:id/play` - Record stream
- `GET /api/tracks/user/:userId` - Get user's tracks

### Artists
- `GET /api/artists/search` - Search artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/trending` - Get trending artists

### AI
- `GET /api/ai/recommendations/:userId` - Get AI recommendations
- `GET /api/ai/collaborators/:trackId` - Suggest collaborators

### Dashboard
- `GET /api/dashboard/:userId` - Get dashboard stats

### Activity
- `GET /api/activity/:userId` - Get user activity

### Payments
- `POST /api/payments/withdraw` - Withdraw funds
- `GET /api/payments/transactions` - Get transaction history

## 🔒 Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## 📝 Response Format

All API responses follow this format:
```json
{
  "success": true/false,
  "data": { ... },
  "error": { "code": "...", "message": "..." },
  "timestamp": "2025-10-18T10:30:00.000Z"
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run migrations
npm run migrate

# Run with seed data (development only)
npm run migrate -- --seed

# Start development server
npm run dev

# Start production server
npm start
```

## 🌐 Environment Variables

Copy `env.example` to `.env` and fill in your values.

## 📦 Dependencies

- express - Web framework
- sequelize - ORM
- @hashgraph/sdk - Hedera integration
- ipfs-http-client - IPFS storage
- jsonwebtoken - Authentication
- multer - File uploads
- And more...

---

Built for Hedera Africa Hackathon 2025

