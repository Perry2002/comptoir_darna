import type { Article, BlogCategory } from '../types'

export const articles: Article[] = [
  {
    id: 1,
    slug: 'secrets-couscous-royal',
    category: 'Gastronomie',
    tag: 'Cuisine',
    title: 'Les Secrets du Couscous Royal',
    excerpt:
      "Derrière chaque grain de semoule se cache une tradition centenaire. Notre chef nous révèle les gestes ancestraux qui font du couscous royal de Comptoir Darna un plat d'exception.",
    body: [
      "La semoule fine est roulée à la main chaque matin avant l'ouverture. Ce geste, transmis de génération en génération, est le fondement de tout le reste. Sans lui, rien n'est possible.",
      "L'agneau de l'Atlas est sélectionné chaque semaine selon des critères stricts : l'âge, la provenance, la couleur de la chair. Nous travaillons avec le même éleveur depuis 1999.",
      "Les sept légumes — carotte, navet, courgette, pois chiche, oignon, tomate et courge — ne cuisent jamais en même temps. Chacun a son moment, sa durée, sa place dans le plat.",
    ],
    author: 'Fatima Benali',
    authorRole: 'Chef de Cuisine',
    date: '15 Juin 2026',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80',
    featured: true,
  },
  {
    id: 2,
    slug: 'nuit-gnawa-hivernage',
    category: 'Spectacles',
    tag: 'Musique',
    title: "Une Nuit Gnawa dans l'Hivernage",
    excerpt:
      "Les maâlems, ces maîtres de la musique Gnawa, transforment chaque soir la scène du Comptoir Darna en un espace de transe et de guérison. Rencontre avec des gardiens d'une tradition millénaire.",
    body: [
      "La musique Gnawa est née de l'esclavage et de la déportation. Elle porte en elle la mémoire d'un peuple, la force d'une résistance. La jouer n'est pas seulement un acte artistique — c'est un acte de transmission.",
      "Le maâlem Hamid arrive toujours deux heures avant le spectacle. Il prépare ses krakeb, ces castagnettes métalliques, avec un soin minutieux. Chaque instrument doit chanter juste.",
      "Quand la nuit tombe sur l'Hivernage, la scène devient un espace hors du temps. Les touristes et les Marrakchis se retrouvent dans la même émotion. C'est cela, la magie du Gnawa.",
    ],
    author: 'Youssef El Fassi',
    authorRole: 'Directeur Artistique',
    date: '8 Juin 2026',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    featured: true,
  },
  {
    id: 3,
    slug: 'art-de-vivre-hivernage',
    category: 'Art de vivre',
    tag: 'Lifestyle',
    title: "L'Art de Vivre à l'Hivernage",
    excerpt:
      "Entre les jardins de la Mamounia et l'avenue Echouhada, le quartier de l'Hivernage concentre l'essence du luxe marrakchi. Une promenade dans le quartier qui abrite Comptoir Darna depuis 1999.",
    body: [
      "L'Hivernage doit son nom aux hivernants européens du début du XXe siècle qui fuyaient les rigueurs du Nord. Ils construisirent ici leurs villas, leurs jardins, leurs clubs. Cette mémoire est toujours là.",
      "Aujourd'hui, le quartier mêle ambassades et restaurants gastronomiques, jardins privés et hôtels de légende. C'est un Marrakech différent du médina — plus secret, plus résidentiel, tout aussi envoûtant.",
    ],
    author: 'Sara Kettani',
    authorRole: 'Rédactrice',
    date: '1 Juin 2026',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  },
  {
    id: 4,
    slug: 'safran-taliouine-or-rouge',
    category: 'Gastronomie',
    tag: 'Ingrédients',
    title: "Le Safran de Taliouine, l'Or Rouge du Souss",
    excerpt:
      "À 1 600 mètres d'altitude dans les montagnes du Souss-Massa, les pistils du Crocus sativus sont récoltés à la main au lever du jour. Celui que nous utilisons vient directement des coopératives de femmes de Taliouine.",
    body: [
      "La récolte du safran dure trois semaines en octobre. Chaque fleur ne s'ouvre qu'une fois, quelques heures seulement. Les femmes des coopératives se lèvent à l'aube pour ne pas manquer ce moment.",
      "Un kilo de safran demande 150 000 fleurs et 400 heures de travail. C'est la raison pour laquelle il vaut plus cher que l'or. Et c'est la raison pour laquelle nous n'en utilisons qu'une pincée — mais une pincée vraie, pas un substitut.",
    ],
    author: 'Fatima Benali',
    authorRole: 'Chef de Cuisine',
    date: '22 Mai 2026',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80',
  },
  {
    id: 5,
    slug: 'souktronic-origines',
    category: 'Spectacles',
    tag: 'Événement',
    title: 'Souktronic : Quand le Souk Rencontre la Nuit',
    excerpt:
      "Né d'une conversation entre un DJ berlinois et notre directeur artistique en 2018, le Souktronic est devenu l'événement incontournable des vendredis soir marrakchis. L'histoire d'une rencontre.",
    body: [
      "L'idée était simple : prendre les sons du souk — les marteaux des ferronniers, les chants des vendeurs, les appels à la prière lointains — et en faire la matière première d'une nuit électronique.",
      "La première édition rassembla une centaine de personnes. Aujourd'hui, il faut réserver plusieurs semaines à l'avance. Mais l'esprit est resté le même : une porte ouverte entre deux mondes.",
    ],
    author: 'Youssef El Fassi',
    authorRole: 'Directeur Artistique',
    date: '10 Mai 2026',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
  },
  {
    id: 6,
    slug: 'pastilla-histoire',
    category: 'Gastronomie',
    tag: 'Histoire',
    title: 'La Pastilla, un Héritage Andalou',
    excerpt:
      "Sucrée-salée, feuilletée, parfumée à la cannelle — la pastilla est l'un des plats les plus complexes de la cuisine marocaine. Son histoire remonte à l'Andalousie du XVe siècle.",
    body: [
      "Les Maures chassés d'Espagne en 1492 emportèrent avec eux leurs recettes, leurs saveurs, leur art de table. La bastela — devenue pastilla au Maroc — était l'un de ces trésors culinaires exilés.",
      "La version aux pigeons est la plus traditionnelle. Chez Comptoir Darna, nous la préparons aussi aux fruits de mer et au lait — des déclinaisons modernes qui respectent l'équilibre originel.",
    ],
    author: 'Karim Bensouda',
    authorRole: 'Chef Pâtissier',
    date: '28 Avril 2026',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&q=80',
  },
  {
    id: 7,
    slug: 'jardins-marrakech-botanique',
    category: 'Marrakech',
    tag: 'Culture',
    title: 'Les Jardins Secrets de Marrakech',
    excerpt:
      "Derrière les murs ocre de la médina se cachent des paradis de verdure où le temps semble suspendu. Une exploration des jardins qui ont inspiré l'univers végétal de Comptoir Darna.",
    body: [
      "Le jardin, en arabe classique, est un espace de contemplation autant que de production. Il reflète la vision islamique d'un paradis terrestre : de l'eau, de l'ombre, des parfums.",
      "La Mamounia voisine possède l'un des plus anciens jardins de Marrakech. Oliviers centenaires, rosiers de Damas, orangers amers — leurs essences imprègnent l'air du quartier de l'Hivernage.",
    ],
    author: 'Sara Kettani',
    authorRole: 'Rédactrice',
    date: '15 Avril 2026',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  },
]

export const blogCategories: BlogCategory[] = ['Gastronomie', 'Art de vivre', 'Spectacles', 'Marrakech']

export const artDeRecevoir = [
  {
    id: 1,
    title: 'Le Restaurant',
    description:
      'Une scène gastronomique où les plats traditionnels sont réinventés avec une touche de modernité.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=80',
    span: 'wide' as const,
  },
  {
    id: 2,
    title: 'Accueil Chaleureux',
    description: 'La générosité marocaine incarnée par un service attentionné et discret.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    span: 'narrow' as const,
  },
  {
    id: 3,
    title: 'Le Patio',
    description: 'Un oasis de sérénité sous les étoiles de Marrakech.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    span: 'narrow' as const,
  },
  {
    id: 4,
    title: 'Spectacles & Rythmes',
    description: 'Vivez l\'effervescence de nos soirées animées par des artistes talentueux.',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1000&q=80',
    span: 'wide' as const,
  },
]
