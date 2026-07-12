import { Link } from 'react-router-dom'

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
    <footer className="bg-surface-container-highest border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-md max-w-container-max mx-auto">
        <div className="space-y-4">
          <div className="font-display-lg text-headline-md text-primary">Comptoir Darna</div>
          <p className="font-body-md text-on-surface-variant">
            Fusion harmonieuse de la gastronomie et de la fête au cœur de Marrakech.
          </p>
          <div className="flex gap-4 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-primary hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {s.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-on-surface">Explorez</h4>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-on-surface">Informations</h4>
          <ul className="space-y-2">
            {infoLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-lg text-on-surface">Contact</h4>
          <p className="font-body-md text-on-surface-variant">
            Avenue Echouhada, Hivernage,
            <br />
            Marrakech 40000, Maroc
          </p>
          <p className="font-body-md text-on-surface-variant">
            <a href="tel:+212524437702" className="hover:text-primary transition-colors">
              +212 (0) 5 24 43 77 02
            </a>
          </p>
          <p className="font-body-md text-on-surface-variant">
            <a href="mailto:contact@comptoirdarna.com" className="hover:text-primary transition-colors">
              contact@comptoirdarna.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-outline-variant/30 py-6 text-center">
        <p className="font-body-md text-on-surface-variant/70 text-sm">
          © {new Date().getFullYear()} Comptoir Darna Marrakech. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
