# 🚀 Quick Start Guide - BeatHive.Africa

Get the frontend MVP running in 5 minutes!

## ⚡ Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

That's it! The app will open at `http://localhost:3000` 🎉

## 🎮 Testing the MVP

### 1. **Home Page** (`/`)
- View the landing page with feature showcase
- Click "Start Exploring" to go to Discover page
- See statistics and how it works section

### 2. **Discover Artists** (`/discover`)
- Browse 6 African artist profiles
- Use the search bar to find artists by name or location
- Filter by genre (Afrobeats, Afro Soul, etc.)
- Check out the AI-powered recommendations at the top
- Click any artist card to view their profile

### 3. **Artist Profile** (Click any artist)
- View detailed artist information
- See their tracks and earnings
- Check out their Creator Identity NFT
- View statistics (followers, streams, collabs)

### 4. **Connect Wallet** (Click "Connect Wallet" button)
- Simulates Hedera wallet connection
- Mock wallet address is generated
- Unlocks Upload and Dashboard features

### 5. **Upload Content** (`/upload`)
- Upload audio file and cover image
- Fill in track details
- Submit to see upload simulation
- Watch the blockchain registration process

### 6. **Dashboard** (`/dashboard`)
- View your earnings and analytics
- See revenue trends over time
- Check wallet balance
- View recent activity feed
- See your Creator NFT identity

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion
- **Beautiful Icons**: Using Lucide React
- **Modern Color Scheme**: Orange (Primary) + Green (Secondary)
- **Accessible**: Built with accessibility in mind

## 🔄 Mock Data

The MVP uses realistic mock data located in `src/data/mockData.js`:

- **6 African Artists**: From Ghana, Nigeria, Kenya, South Africa, and Uganda
- **18 Tracks**: With play counts and earnings
- **AI Recommendations**: 95%, 88%, and 82% compatibility scores
- **Revenue Data**: 7 months of earnings history
- **Recent Activity**: 5 recent activities

## 🎯 What's Next?

To make this production-ready, you need to:

1. **Read** `BACKEND_REQUIREMENTS.md` for complete backend guide
2. **Implement** Hedera wallet integration (HashConnect/Blade)
3. **Build** the backend API following the documentation
4. **Connect** frontend to real API endpoints
5. **Deploy** to production

## 📝 Making Changes

### Update Mock Data
Edit `src/data/mockData.js` to change:
- Artist profiles
- Track information
- AI recommendations
- Activity feed

### Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ }
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: { port: 3001 }
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 📚 Project Structure

```
src/
├── components/       # Reusable components
│   ├── Layout.jsx   # Page wrapper
│   ├── Navbar.jsx   # Top navigation
│   └── Footer.jsx   # Footer
├── pages/           # Main pages
│   ├── HomePage.jsx
│   ├── DiscoverPage.jsx
│   ├── ProfilePage.jsx
│   ├── UploadPage.jsx
│   └── DashboardPage.jsx
├── store/           # State management
│   └── useStore.js  # Zustand store
├── data/            # Mock data
│   └── mockData.js
├── App.jsx          # Routes
└── main.jsx         # Entry point
```

## 🎉 Demo Walkthrough

1. **Open** `http://localhost:3000`
2. **Click** "Start Exploring" on home page
3. **Browse** artists and click "Kwame Beats"
4. **Go back** and click "Connect Wallet" in navbar
5. **Navigate** to Upload page
6. **Fill** the form and submit
7. **View** success message
8. **Go to** Dashboard to see analytics

## 🏆 For Hackathon Judges

This MVP demonstrates:
- ✅ Complete UI/UX for all core features
- ✅ Hedera wallet integration (UI ready)
- ✅ NFT identity concept (visual mockup)
- ✅ AI matching recommendations (UI + logic)
- ✅ Revenue tracking & analytics
- ✅ Upload workflow with blockchain simulation
- ✅ Responsive, modern design
- ✅ Ready for backend integration

**Next Step**: Follow `BACKEND_REQUIREMENTS.md` to build the full platform!

---

Built with ❤️ for African Creators | Hedera Africa Hackathon 2025

