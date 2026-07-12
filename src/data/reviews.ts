import type { Review } from '../types'

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    location: 'Paris, France',
    rating: 5,
    initials: 'JD',
    quote:
      "Une soirée inoubliable ! Les saveurs du tajine d'agneau étaient exceptionnelles, et le spectacle de danse a ajouté une touche magique à notre dîner.",
  },
  {
    id: 2,
    name: 'Sarah Miller',
    location: 'London, UK',
    rating: 5,
    initials: 'SM',
    quote:
      "L'ambiance est tout simplement unique. C'est l'endroit parfait pour découvrir le vrai Marrakech festif. Les cocktails sont créatifs et délicieux.",
  },
  {
    id: 3,
    name: 'Omar Alami',
    location: 'Casablanca, Maroc',
    rating: 5,
    initials: 'OA',
    quote:
      "Un incontournable. Le service est impeccable, les plats sont servis avec une présentation digne d'un palace. Je reviendrai à coup sûr.",
  },
]
