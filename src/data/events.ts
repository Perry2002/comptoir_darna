import type { EventItem } from '../types'

export const events: EventItem[] = [
  {
    id: 1,
    title: 'Le Souktronic',
    subtitle: 'Fusion Orient & Électronique',
    date: 'Chaque Vendredi',
    time: '22h00 — 03h00',
    description:
      'Notre événement signature qui fusionne tradition soukie et électronique moderne. DJ résidents et invités internationaux transforment Comptoir Darna en une expérience sonore et visuelle unique.',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
    tag: 'Régulier',
  },
  {
    id: 2,
    title: 'Art & Show',
    subtitle: 'Danse Orientale & Gnawa Live',
    date: 'Chaque Samedi',
    time: '21h00 — 23h00',
    description:
      'Un voyage sensoriel complet : danseuses orientales, musiciens Gnawa en live, contorsionnistes et cracheurs de feu. Le grand spectacle de Marrakech chaque samedi soir.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    tag: 'Régulier',
  },
  {
    id: 3,
    title: 'Le Grand Show',
    subtitle: 'Soirée de Gala Mensuelle',
    date: 'Dernier Samedi du mois',
    time: '20h30 — Minuit',
    description:
      "Une édition exceptionnelle du spectacle avec troupe élargie, costumes de scène, artistes invités et menu dégustation spécial élaboré par notre chef pour l'occasion.",
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    tag: 'Spécial',
  },
  {
    id: 4,
    title: 'Nuit du Thé',
    subtitle: 'Cérémonie Traditionnelle & Jazz Marocain',
    date: 'Chaque Jeudi',
    time: '19h00 — 22h00',
    description:
      "Une soirée plus intimiste autour de la cérémonie du thé à la menthe, avec musique jazz marocaine en live. Idéal pour une soirée d'affaires ou un dîner romantique.",
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80',
    tag: 'Régulier',
  },
]
