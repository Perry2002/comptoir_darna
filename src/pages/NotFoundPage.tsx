import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-margin-mobile bg-surface">
      <span className="font-display-lg text-primary text-7xl md:text-9xl mb-4">404</span>
      <h1 className="font-headline-lg text-on-surface mb-4">Cette page s'est égarée dans la médina</h1>
      <p className="font-body-md text-on-surface-variant max-w-md mb-8">
        La page que vous cherchez n'existe pas ou a été déplacée. Revenez à l'accueil pour
        continuer votre exploration de Comptoir Darna.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg" icon="home">
          Retour à l'accueil
        </Button>
      </Link>
    </div>
  )
}
