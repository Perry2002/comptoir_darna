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
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784296250/chef_uftbd7.webp',
  },
  {
    id: 2,
    name: 'Cheffe Fatima',
    bio: 'Spécialiste de la pâtisserie fine et des desserts de l\'Atlas.',
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784296539/chef2_h99fam.webp',
  },
  {
    id: 3,
    name: 'Chef Yassin',
    bio: 'L\'innovateur, fusionnant techniques modernes et saveurs ancestrales.',
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784296537/chef3_zyednj.webp',
  },
]
