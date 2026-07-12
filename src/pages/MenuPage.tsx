import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import { CardSkeletonGrid } from '../components/ui/Skeleton'
import OpenBookMenu from '../components/menu/OpenBookMenu'
import { dishes, menuCategories } from '../data/menu'
import { bookMenuPages } from '../data/bookMenu'
import type { MenuCategory } from '../types'

type FilterValue = (typeof menuCategories)[number]

const stats = [
  { icon: 'favorite', value: '112k', label: 'Abonnés' },
  { icon: 'group', value: '105k', label: 'Visiteurs' },
  { icon: 'star', value: '11.5k', label: 'Avis' },
]

const highlights = [
  { icon: 'restaurant', title: 'Entrée Chef', subtitle: "Choix du chef du jour" },
  { icon: 'dinner_dining', title: 'Tajine Légumes', subtitle: 'Le choix du chef' },
  { icon: 'ramen_dining', title: 'Couscous Royale', subtitle: 'Tradition royale' },
  { icon: 'icecream', title: 'Dessert', subtitle: 'Chocolat sensationnel' },
  { icon: 'bakery_dining', title: 'Pastilla au Poulet & Amandes', subtitle: 'Sucrée-salée raffinée' },
  { icon: 'auto_awesome', title: 'Le Magic Marrakech', subtitle: "Cocktail signature de la maison" },
]

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Tous')
  // Simulates an initial fetch of the menu from the backend (see ROADMAP Phase 2).
  const [loading] = useState(false)
  const [pdfNotice, setPdfNotice] = useState(false)

  const filteredDishes = useMemo(() => {
    if (activeFilter === 'Tous') return dishes
    return dishes.filter((d) => d.category === (activeFilter as MenuCategory))
  }, [activeFilter])

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <section className="relative h-[420px] md:h-[560px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1600&q=80"
            alt="Chef préparant un plat au Comptoir Darna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-white">
          <span className="font-label-lg text-primary-fixed tracking-widest uppercase mb-4 block text-xs">
            Saveurs de Marrakech
          </span>
          <h1 className="font-display-lg text-3xl md:text-[64px] mb-8 max-w-2xl leading-tight">
            Notre Menu est votre choix
          </h1>
          <a href="#carte">
            <Button variant="primary" size="lg" icon="restaurant_menu" iconPosition="right">
              Consulter le Menu
            </Button>
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto flex flex-wrap justify-center items-center gap-10 md:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" aria-hidden="true">
                  {s.icon}
                </span>
              </div>
              <div>
                <div className="font-display-lg text-2xl text-on-surface">{s.value}</div>
                <div className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C'est délicieux ! */}
      <section className="relative py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-6 xl:gap-12">
          {/* Left rotating dish photo */}
          <motion.div
            className="hidden md:block flex-shrink-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full overflow-hidden border-8 border-white shadow-xl"
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
          >
            <img
              src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=700&q=80"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="max-w-2xl text-center">
            <h2 className="font-display-lg text-3xl md:text-headline-lg text-primary mb-6">
              C'est délicieux !
            </h2>
            <p className="font-body-md text-on-surface-variant mb-12 max-w-xl mx-auto">
              Découvrez une sélection méticuleuse de nos créations les plus prisées, où chaque
              bouchée allie avec brio tradition marocaine et modernité.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 text-left">
              {highlights.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                    aria-hidden="true"
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </span>
                  <div>
                    <p className="font-label-lg text-on-surface">{item.title}</p>
                    <p className="font-body-md text-on-surface-variant text-sm">{item.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right rotating dish photo — offset downward for a less rigid, more organic feel */}
          <motion.div
            className="hidden md:block flex-shrink-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full overflow-hidden border-8 border-white shadow-xl md:translate-y-8 lg:translate-y-10"
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
          >
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section
        id="carte"
        className="sticky top-[68px] z-40 bg-surface-container-low/90 backdrop-blur-sm py-6 mb-12 border-y border-outline-variant/30"
      >
        <div
          className="flex justify-center flex-wrap gap-3 px-margin-mobile"
          role="tablist"
          aria-label="Filtrer le menu par catégorie"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              className={
                activeFilter === cat
                  ? 'bg-primary text-on-primary px-6 md:px-8 py-3 rounded-full font-label-lg shadow-lg transition-all'
                  : 'bg-surface text-on-surface-variant border border-outline-variant px-6 md:px-8 py-3 rounded-full font-label-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-all'
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
        {loading ? (
          <CardSkeletonGrid count={6} />
        ) : filteredDishes.length === 0 ? (
          <EmptyState
            icon="restaurant"
            title="Aucun plat dans cette catégorie"
            description="Essayez une autre catégorie ou consultez le menu complet."
            action={
              <Button variant="secondary" onClick={() => setActiveFilter('Tous')}>
                Voir tous les plats
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish, i) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                  exit={{ opacity: 0, y: -16 }}
                  className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-outline-variant/30"
                >
                  <div className="h-56 md:h-64 overflow-hidden relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {dish.badge && (
                      <div className="absolute top-4 left-4">
                        <Badge tone={dish.badge === 'Signature' ? 'tertiary' : 'secondary'}>
                          {dish.badge}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 text-center">
                    <h3 className="font-headline-md text-primary mb-2">{dish.name}</h3>
                    <p className="font-body-md text-on-surface-variant mb-4 line-clamp-2">
                      {dish.description}
                    </p>
                    <span className="font-headline-md text-secondary">{dish.price} MAD</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* La Carte de Saison (open book) */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display-lg text-2xl md:text-headline-lg text-primary">
              La Carte de Saison
            </h2>
            <p className="font-body-md text-on-surface-variant">
              L'histoire de notre cuisine à travers les pages du temps — feuilletez pour tout
              découvrir.
            </p>
          </div>

          <OpenBookMenu pages={bookMenuPages} />

          <p className="text-center text-xs italic text-on-surface-variant/60 mt-8 max-w-lg mx-auto">
            Tous nos prix sont exprimés en Dirhams (MAD) et incluent les taxes de service. La
            carte évolue selon les saisons et l'inspiration de notre chef.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/reservation">
              <Button variant="primary" size="md" fullWidth>
                Réserver ma table
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="md"
              icon="download"
              title="Le menu PDF sera bientôt disponible au téléchargement"
              onClick={() => setPdfNotice(true)}
            >
              Télécharger le menu (PDF)
            </Button>
          </div>
          {pdfNotice && (
            <p role="status" className="text-center text-xs text-on-surface-variant/70 mt-3">
              Le PDF du menu arrive très bientôt — en attendant, la carte complète est juste
              au-dessus.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
