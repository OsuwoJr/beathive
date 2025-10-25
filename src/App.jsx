import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DiscoverPage from './pages/DiscoverPage'
import ProfilePage from './pages/ProfilePage'
import UploadPage from './pages/UploadPage'
import DashboardPage from './pages/DashboardPage'
import GovernancePage from './pages/GovernancePage'
import StreetNodesPage from './pages/StreetNodesPage'
import CopyrightProtectionPage from './pages/CopyrightProtectionPage'
import TroublersPage from './pages/TroublersPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="governance" element={<GovernancePage />} />
          <Route path="street-nodes" element={<StreetNodesPage />} />
          <Route path="copyright" element={<CopyrightProtectionPage />} />
          <Route path="troublers" element={<TroublersPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

