import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import Button from '../ui/Button'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/menu', label: 'Menu' },
  { to: '/experience', label: 'Expérience' },
  { to: '/reservation', label: 'Réservation' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'bg-surface/90 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300',
        scrolled ? 'shadow-sm' : 'shadow-none'
      )}
    >
      <nav
        className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto"
        aria-label="Navigation principale"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-display-lg text-headline-md text-primary tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/logocompt.png" alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
          <span></span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'font-label-lg text-on-surface-variant hover:text-primary transition-colors pb-1',
                  isActive && 'text-primary border-b-2 border-primary'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/reservation">
            <Button variant="primary" size="sm">
              Réserver
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-on-surface"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out bg-surface border-t border-outline-variant/30',
          menuOpen ? 'max-h-[420px]' : 'max-h-0'
        )}
      >
        <div className="flex flex-col px-margin-mobile py-4 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'font-label-lg py-3 px-2 rounded-lg text-on-surface-variant transition-colors',
                  isActive ? 'text-primary bg-primary/5' : 'hover:bg-surface-container-low'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/reservation" onClick={() => setMenuOpen(false)} className="mt-3">
            <Button variant="primary" size="md" fullWidth>
              Réserver
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
