export interface Chef {
  id: number
  name: string
  bio: string
  image: string
}

export const chefs: Chef[] = [
  {
    id: 1,
    name: 'Chef Ahmed',
    bio: 'Maître des épices et gardien des secrets du Tajine traditionnel.',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&q=80',
  },
  {
    id: 2,
    name: 'Cheffe Fatima',
    bio: 'Spécialiste de la pâtisserie fine et des desserts de l\'Atlas.',
    image: 'https://images.unsplash.com/photo-1595257841889-4b26ff561d0a?w=600&q=80',
  },
  {
    id: 3,
    name: 'Chef Yassin',
    bio: 'L\'innovateur, fusionnant techniques modernes et saveurs ancestrales.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80',
  },
]
