import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ReservationPage from './pages/ReservationPage'
import ExperiencePage from './pages/ExperiencePage'
import BlogPage from './pages/BlogPage'
import ArtShowPage from './pages/ArtShowPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './components/ui/ScrollToTop'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-surface text-on-surface">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/art-show" element={<ArtShowPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
