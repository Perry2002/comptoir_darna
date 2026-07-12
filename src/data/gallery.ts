import type { GalleryItem } from '../types'

export const galleryItems: GalleryItem[] = [
  { id: 1, category: 'Cuisine', aspect: 'square', alt: 'Tajine présenté avec citrons confits et olives', src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=900&q=80' },
  { id: 2, category: 'Show', aspect: 'portrait', alt: 'Lanterne marocaine projetant des motifs de lumière', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80' },
  { id: 3, category: 'Club', aspect: 'tall', alt: 'Préparation d\'un cocktail au bar', src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=80' },
  { id: 4, category: 'Club', aspect: 'square', alt: 'Ambiance festive et musicale au club', src: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=900&q=80' },
  { id: 5, category: 'Restaurant', aspect: 'wide', alt: 'Détail architectural du plafond en plâtre sculpté', src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80' },
  { id: 6, category: 'Restaurant', aspect: 'square', alt: 'Table dressée avec linge fin et verrerie', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80' },
  { id: 7, category: 'Show', aspect: 'square', alt: 'Musicien jouant du oud sur scène', src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80' },
  { id: 8, category: 'Patio', aspect: 'portrait', alt: 'Enseigne du Comptoir Darna illuminée la nuit', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80' },
  { id: 9, category: 'Patio', aspect: 'tall', alt: 'Terrasse et patio de nuit avec éclairage chaleureux', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80' },
  { id: 10, category: 'Cuisine', aspect: 'square', alt: 'Pâtisseries marocaines dressées sur assiette', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
  { id: 11, category: 'Show', aspect: 'square', alt: 'Spectacle de danse orientale', src: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=900&q=80' },
  { id: 12, category: 'Restaurant', aspect: 'square', alt: 'Salle principale du restaurant', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80' },
]

export const galleryFilters = ['Tout', 'Restaurant', 'Patio', 'Club', 'Show', 'Cuisine'] as const
