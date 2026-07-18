import type { DishItem } from '../types'

export const dishes: DishItem[] = [
  {
    id: 1,
    name: "Tagine d'Agneau",
    description:
      "Agneau confit aux pruneaux d'Orient et amandes torréfiées, infusé au safran pur de Taliouine.",
    price: 280,
    category: 'Plats',
    badge: 'Populaire',
    image:
      'https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784305510/agneau_gjqzwj.webp',
  },
  {
    id: 2,
    name: 'Salades Marocaines',
    description:
      "Assortiment de 6 salades traditionnelles cuites et crues, parfumées à l'huile d'olive vierge.",
    price: 150,
    category: 'Entrées',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80',
  },
  {
    id: 3,
    name: 'Pastilla de Pigeon',
    description:
      'Feuilleté traditionnel sucré-salé aux amandes, cannelle et effiloché de pigeon impérial.',
    price: 210,
    category: 'Entrées',
    badge: 'Signature',
    image:
      'https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784305867/t%C3%A9l%C3%A9chargement_kewz7a.webp',
  },
  {
    id: 4,
    name: 'Couscous Royal',
    description:
      'Semoule fine aux sept légumes, servis avec bœuf tendre, merguez et brochettes d\'agneau.',
    price: 320,
    category: 'Plats',
    badge: 'Populaire',
    image:
      'https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784304986/Couscous-marocain_d9flbh.webp',
  },
  // {
  //   id: 5,
  //   name: "Salade d'Oranges",
  //   description:
  //     "Tranches d'oranges à la cannelle, eau de fleur d'oranger et éclats de menthe fraîche.",
  //   price: 90,
  //   category: 'Desserts',
  //   image:
  //     'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=900&q=80',
  // },
  {
    id: 6,
    name: 'Cornes de Gazelle',
    description:
      "Pâtisserie fine à la pâte d'amande, fleur d'oranger et sucre glace, façonnée à la main.",
    price: 110,
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=900&q=80',
  },
  {
    id: 7,
    name: 'Tanjia Marrakchia',
    description:
      "Épaule de bœuf mijotée pendant 12h à l'ancienne dans une jarre en terre cuite, épices confites.",
    price: 290,
    category: 'Plats',
    badge: 'Signature',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80',
  },
  {
    id: 8,
    name: 'Signature Marrakech',
    description:
      "Cocktail rafraîchissant à base de menthe fraîche, grenade et une touche secrète d'épices douces.",
    price: 140,
    category: 'Boissons',
    image:
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=80',
  },
  {
    id: 9,
    name: 'Thé à la Menthe Royal',
    description:
      "Thé vert de Chine infusé à la menthe fraîche du jardin, servi selon le rituel marocain.",
    price: 60,
    category: 'Boissons',
    image:
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&q=80',
  },
  {
    id: 5,
    name: "Côtelettes d'Agneau Grillées",
    description:
      "Côtelettes d'Agneau Grillées",
    price: 310,
    category: 'Plats',
    badge: 'Populaire',
    image:
      'https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784305283/C%C3%B4telettes-d_agneau-%C3%A0-l_ail-noir_nwtvph.webp',
  },
]

export const menuCategories = ['Tous', 'Entrées', 'Plats', 'Desserts', 'Boissons'] as const

export const laCarte = {
  incontournables: [
    { name: 'Harira Traditionnelle', price: 95 },
    { name: 'Briouates Assorties', price: 120 },
    { name: 'Tanjia Marrakchia', price: 290 },
  ],
  desserts: [
    { name: 'Cornes de Gazelle', price: 110 },
    { name: 'Pastilla au Lait', price: 105 },
    { name: 'Thé à la Menthe Royal', price: 60 },
  ],
}

export const popularDishes = dishes.filter((d) => d.badge === 'Populaire').concat(dishes[2])
