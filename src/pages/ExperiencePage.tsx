import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import ScrollScrubHero from '../components/ParallaxVideoHero'
import { galleryItems, galleryFilters } from '../data/gallery'
import type { GalleryCategory } from '../types'

type FilterValue = (typeof galleryFilters)[number]

const aspectClass: Record<NonNullable<(typeof galleryItems)[number]['aspect']>, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
  wide: 'aspect-[4/3] sm:col-span-2',
}

export default function ExperiencePage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Tout')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(() => {
    if (activeFilter === 'Tout') return galleryItems
    return galleryItems.filter((g) => g.category === (activeFilter as GalleryCategory))
  }, [activeFilter])

  function openLightbox(id: number) {
    const index = filtered.findIndex((g) => g.id === id)
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function showRelative(delta: number) {
    setLightboxIndex((prev) => {
      if (prev === null) return prev
      const next = (prev + delta + filtered.length) % filtered.length
      return next
    })
  }

  const activeImage = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <ScrollScrubHero
         framesBasePath="/videos/experience-hero-frames"
         frameCount={155}
         frameExtension="jpg"
         title="L'Expérience"
         subtitle="Une fusion envoûtante de gastronomie, de musique et d'art de vivre au cœur de la ville rouge."
       />

      {/* Filters */}
      <section className="py-stack-lg bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface mb-4">
            Galerie
          </h2>
          <div className="inline-block bg-primary px-6 py-2 mb-10 rounded-full">
            <p className="text-on-primary font-label-lg uppercase tracking-wider text-xs md:text-sm">
              Laissez-vous transporter dans l'univers sensoriel du Comptoir Darna
            </p>
          </div>
          <div
            className="flex flex-wrap justify-center items-center gap-4 md:gap-8 border-b border-outline-variant/30 pb-6"
            role="tablist"
            aria-label="Filtrer la galerie"
          >
            {galleryFilters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                className={
                  activeFilter === f
                    ? 'bg-primary text-on-primary px-6 py-2 rounded-full font-label-lg uppercase transition-all text-xs md:text-sm'
                    : 'text-on-surface-variant hover:text-primary font-label-lg uppercase transition-colors text-xs md:text-sm'
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {filtered.length === 0 ? (
          <EmptyState
            icon="photo_library"
            title="Aucune photo dans cette catégorie"
            description="Choisissez un autre filtre pour continuer l'exploration."
            action={
              <Button variant="secondary" onClick={() => setActiveFilter('Tout')}>
                Voir toute la galerie
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onClick={() => openLightbox(item.id)}
                  className={`group relative overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    aspectClass[item.aspect ?? 'square']
                  }`}
                  aria-label={`Agrandir : ${item.alt}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    >
                      zoom_in
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-stack-lg bg-surface-container-low text-center relative overflow-hidden">
        <div className="absolute inset-0 zellij-pattern" aria-hidden="true" />
        <div className="relative z-10 px-margin-mobile">
          <h2 className="font-display-lg text-3xl md:text-display-lg text-primary mb-6">
            Réservez votre Voyage
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
            Rejoignez-nous pour une soirée inoubliable où chaque instant est une célébration.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/reservation">
              <Button variant="primary" size="lg">
                Table de Dîner
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Événement Privé
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.alt}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              aria-label="Fermer"
            >
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">close</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                showRelative(-1)
              }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white"
              aria-label="Photo précédente"
            >
              <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                chevron_left
              </span>
            </button>
            <motion.img
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                showRelative(1)
              }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white"
              aria-label="Photo suivante"
            >
              <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}