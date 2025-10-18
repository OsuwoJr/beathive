# 🎵 BeatHive.Africa - Powering Africa's Creators with AI + Hedera

A decentralized, AI-powered ecosystem where African street musicians, dancers, and creators earn fairly, collaborate transparently, and own their digital identity.

## 🌟 Features

- **Digital Identity NFT**: Verifiable creator passport on Hedera blockchain
- **AI Collab Matching**: Smart recommendations connecting artists by style, region, and goals
- **Instant Micropayments**: Real-time revenue via Hedera smart contracts
- **DePIN Recording Nodes**: Community recording hubs across African cities
- **Creator DAO**: Governance tokens for platform voting and decisions
- **Copyright Guardian**: AI-powered protection against unauthorized use

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A modern web browser
- (Optional) Hedera testnet wallet for full functionality

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
beathive-africa/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/            # Main application pages
│   │   ├── HomePage.jsx
│   │   ├── DiscoverPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── UploadPage.jsx
│   │   └── DashboardPage.jsx
│   ├── store/            # State management (Zustand)
│   │   └── useStore.js
│   ├── data/             # Mock data for MVP
│   │   └── mockData.js
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Tech Stack

### Frontend
- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons
- **Zustand**: Lightweight state management

### Design System
- Custom color palette (Primary: Orange, Secondary: Green)
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Accessibility-focused components

## 🌍 Current Features (MVP)

### ✅ Implemented
- Landing page with feature showcase
- Artist discovery with search and filters
- AI-powered collaboration matching
- Detailed artist profiles with NFT identity
- Content upload interface
- Revenue dashboard with analytics
- Wallet connection UI (mock)
- Responsive design

### 🔄 Mock Data
The MVP uses realistic mock data to demonstrate functionality:
- 6 sample African artists with profiles
- Track collections with play counts and earnings
- AI matching recommendations
- Recent activity feeds
- Revenue analytics

## 🔗 Navigation

- **Home** (`/`) - Landing page and feature overview
- **Discover** (`/discover`) - Browse artists, search, AI recommendations
- **Profile** (`/profile/:id`) - Artist profile pages with tracks and stats
- **Upload** (`/upload`) - Content upload interface (requires wallet)
- **Dashboard** (`/dashboard`) - Revenue analytics and activity (requires wallet)

## 🎯 For Hedera Africa Hackathon 2025

This project is built for **Track 4: AI & DePIN** with cross-track potential in:
- Track 2: DLT for Operations
- Track 3: Immersive Experience

### Problem Solved
African street creators face exploitation, lack of transparent monetization, limited access to funding, and poor digital identity protection.

### Solution
BeatHive.Africa provides a decentralized platform with AI matching, blockchain-verified ownership, instant micropayments, and community governance.

## 🛠️ Backend Integration Guide

See `BACKEND_REQUIREMENTS.md` for detailed backend setup instructions.

## 📝 License

MIT License - Built with ❤️ for African Creators

## 🤝 Contributing

This project is part of The Troublers Street Talent Initiative. We welcome contributions that support African creators!

## 📧 Contact

For questions about this hackathon submission, reach out via GitHub issues.

---

**Built for Hedera Africa Hackathon 2025** | Powered by Hedera DLT

