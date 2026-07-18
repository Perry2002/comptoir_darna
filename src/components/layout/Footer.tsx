import { Link } from 'react-router-dom'
import { FooterScallopDivider } from '../HeroScallopDivider'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/menu', label: 'Menu' },
  { to: '/experience', label: 'Expérience' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const infoLinks = [
  { to: '/mentions-legales', label: 'Mentions Légales' },
  { to: '/confidentialite', label: 'Politique de Confidentialité' },
]

const socials = [
  { icon: 'photo_camera', label: 'Instagram', href: '#' },
  { icon: 'face_nod', label: 'Facebook', href: '#' },
  { icon: 'language', label: 'Site partenaire', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Image de fond + assombrissement pour la lisibilité du texte clair */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784395342/16_n3hcu0.webp"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/70 to-black/85" />
      </div>

      {/* Arches en haut du footer — miroir du HeroScallopDivider, même couleur
          que le fond de la dernière section de la home (Témoignages, #f7f3ee) */}
      <FooterScallopDivider />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-md max-w-container-max mx-auto pt-16 md:pt-20">
        <div className="space-y-4">
          <div className="font-display-lg text-headline-md text-white">Comptoir Darna</div>
          <p className="font-body-md text-white/75">
            Fusion harmonieuse de la gastronomie et de la fête au cœur de Marrakech.
          </p>
          <div className="flex gap-4 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-white hover:text-secondary-fixed-dim hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {s.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-white">Explorez</h4>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-body-md text-white/75 hover:text-secondary-fixed-dim hover:translate-x-1 transition-all block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-white">Informations</h4>
          <ul className="space-y-2">
            {infoLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-body-md text-white/75 hover:text-secondary-fixed-dim hover:translate-x-1 transition-all block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-white">Contact</h4>
          <p className="font-body-md text-white/75">
            Avenue Echouhada, Hivernage,
            <br />
            Marrakech 40000, Maroc
          </p>
          <p className="font-body-md text-white/75">
            <a href="tel:+212524437702" className="hover:text-secondary-fixed-dim transition-colors">
              +212 (0) 5 24 43 77 02
            </a>
          </p>
          <p className="font-body-md text-white/75">
            <a href="mailto:contact@comptoirdarna.com" className="hover:text-secondary-fixed-dim transition-colors">
              contact@comptoirdarna.com
            </a>
          </p>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15 py-6 text-center">
        <p className="font-body-md text-white/50 text-sm">
          © {new Date().getFullYear()} Comptoir Darna Marrakech. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}