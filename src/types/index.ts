export type MenuCategory = 'Entrées' | 'Plats' | 'Desserts' | 'Boissons'

export interface DishItem {
  id: number
  name: string
  description: string
  price: number
  category: MenuCategory
  image: string
  badge?: 'Populaire' | 'Signature' | 'Nouveau'
}

export type GalleryCategory = 'Restaurant' | 'Patio' | 'Club' | 'Show' | 'Cuisine'

export interface GalleryItem {
  id: number
  src: string
  alt: string
  category: GalleryCategory
  aspect?: 'square' | 'portrait' | 'tall' | 'wide'
}

export type BlogCategory = 'Gastronomie' | 'Art de vivre' | 'Spectacles' | 'Marrakech'

export interface Article {
  id: number
  slug: string
  category: BlogCategory
  tag: string
  title: string
  excerpt: string
  body: string[]
  author: string
  authorRole: string
  date: string
  readTime: number
  image: string
  featured?: boolean
}

export interface Review {
  id: number
  name: string
  location: string
  rating: number
  quote: string
  initials: string
}

export interface EventItem {
  id: number
  title: string
  subtitle: string
  date: string
  time: string
  description: string
  image: string
  tag: string
}

export interface ReservationFormData {
  name: string
  email: string
  date: string
  time: string
  guests: number
  table: string
  occasion?: string
}

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export interface BookMenuItem {
  name: string
  description?: string
  price?: string
  prices?: string[]
  tag?: 'veg' | 'spicy'
}

export interface BookMenuPageData {
  variant?: 'cover' | 'toc'
  section?: string
  title: string
  subtitle?: string
  tagline?: string
  note?: string
  priceColumns?: string[]
  items: BookMenuItem[]
}
