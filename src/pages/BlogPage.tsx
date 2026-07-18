import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { articles, blogCategories, artDeRecevoir } from '../data/blog'
import { submitNewsletter } from '../lib/api'
import type { Article, BlogCategory, SubmissionState } from '../types'

type FilterValue = 'Tout' | BlogCategory

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 flex items-start md:items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="bg-surface rounded-xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-80">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center"
            aria-label="Fermer l'article"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
        <div className="p-6 md:p-10">
          <div className="text-secondary font-label-sm uppercase tracking-widest text-xs mb-3">
            {article.category} · {article.tag}
          </div>
          <h2 id="article-modal-title" className="font-display-lg text-2xl md:text-headline-lg text-on-surface mb-4">
            {article.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-6">
            <span>{article.author}, {article.authorRole}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} min de lecture</span>
          </div>
          <div className="space-y-4 font-body-md text-on-surface-variant leading-relaxed">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

function NewsletterForm() {
  const [status, setStatus] = useState<SubmissionState>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') || '')
    setStatus('submitting')
    setError('')
    try {
      await submitNewsletter(email)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-2 text-primary font-label-lg py-4">
        <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
        Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.
      </div>
    )
  }

  return (
    <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit} noValidate>
      <div className="flex-1 text-left">
        <label htmlFor="newsletter-email" className="sr-only">
          Adresse email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Votre adresse email"
          aria-invalid={status === 'error'}
          className="w-full bg-surface px-6 py-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
        />
        {status === 'error' && (
          <p className="text-error text-xs mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" variant="primary" size="lg" loading={status === 'submitting'}>
        S'abonner
      </Button>
    </form>
  )
}

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Tout')
  const [openArticle, setOpenArticle] = useState<Article | null>(null)

  const filtered = useMemo(() => {
    if (activeFilter === 'Tout') return articles
    return articles.filter((a) => a.category === activeFilter)
  }, [activeFilter])

  const featured = filtered.find((a) => a.featured) ?? filtered[0]
  const rest = filtered.filter((a) => a.id !== featured?.id)

  return (
    <div className="bg-surface-container-low min-h-screen">
      {/* Hero */}
      <section className="bg-surface py-stack-lg border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="text-primary font-label-lg uppercase tracking-widest text-xs">
            Histoires &amp; Savoirs
          </span>
          <h1 className="font-display-lg text-4xl md:text-[64px] mt-4 mb-6 text-on-surface">
            Le Carnet de Darna
          </h1>
          <div className="w-24 h-px bg-primary/30 mx-auto mb-8" />
          <p className="font-body-lg text-on-surface-variant italic max-w-3xl mx-auto mb-12">
            Gastronomie, musique, histoire — les récits qui tissent l'âme de Comptoir Darna et
            des nuits de Marrakech.
          </p>
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-outline-variant/30 pt-8"
            role="tablist"
            aria-label="Filtrer les articles"
          >
            <nav className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
              {(['Tout', ...blogCategories] as FilterValue[]).map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeFilter === cat}
                  onClick={() => setActiveFilter(cat)}
                  className={
                    activeFilter === cat
                      ? 'text-primary font-label-lg border-b-2 border-primary pb-2 uppercase tracking-wider text-xs md:text-sm'
                      : 'text-on-surface-variant hover:text-primary transition-colors font-label-lg uppercase tracking-wider text-xs md:text-sm'
                  }
                >
                  {cat}
                </button>
              ))}
            </nav>
            <div className="text-on-surface-variant/70 text-label-sm">
              {filtered.length} article{filtered.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* L'Art de Recevoir bento */}
      <section className="bg-surface-container-low py-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <h2 className="font-display-lg text-3xl md:text-display-lg mb-4 text-on-surface">
              L'Art de Recevoir
            </h2>
            <p className="font-body-lg text-on-surface-variant italic">
              Une immersion sensorielle au-delà de la table.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {artDeRecevoir.map((item) => (
              <div
                key={item.id}
                className={`bg-surface rounded-lg shadow-sm overflow-hidden group cursor-default ${
                  item.span === 'wide' ? 'md:col-span-8' : 'md:col-span-4'
                }`}
              >
                <div className={item.span === 'wide' ? 'aspect-video overflow-hidden' : 'aspect-square overflow-hidden'}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display-lg text-headline-md mb-2">{item.title}</h3>
                  <p className="text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main>
        {/* Articles */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
          {filtered.length === 0 ? (
            <EmptyState
              icon="auto_stories"
              title="Aucun article dans cette catégorie"
              description="De nouveaux récits arrivent bientôt. En attendant, explorez les autres rubriques du Carnet."
              action={
                <Button variant="secondary" onClick={() => setActiveFilter('Tout')}>
                  Voir tous les articles
                </Button>
              }
            />
          ) : (
            <>
              {featured && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-16">
                  <button
                    onClick={() => setOpenArticle(featured)}
                    className="md:col-span-12 group overflow-hidden rounded-xl bg-surface-container-low shadow-sm transition-all cursor-pointer text-left"
                  >
                    <div className="relative h-72 md:h-[420px] overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-2xl">
                        <div className="text-secondary-fixed font-label-sm uppercase tracking-widest text-xs mb-3">
                          {featured.category} · {featured.tag}
                        </div>
                        <h2 className="font-display-lg text-2xl md:text-headline-lg leading-tight mb-2">
                          {featured.title}
                        </h2>
                        <p className="text-white/85 line-clamp-2">{featured.excerpt}</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <AnimatePresence mode="popLayout">
                  {rest.map((article, i) => (
                    <motion.article
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group cursor-pointer text-left"
                    >
                      <button onClick={() => setOpenArticle(article)} className="w-full text-left">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl mb-6 shadow-sm">
                          <img
                            src={article.image}
                            alt={article.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="text-secondary font-label-sm uppercase tracking-widest text-xs">
                            {article.category}
                          </div>
                          <h3 className="font-display-lg text-headline-md leading-tight group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-on-surface-variant line-clamp-2">{article.excerpt}</p>
                        </div>
                      </button>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </section>

        {/* Newsletter */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
          <div className="bg-surface-container rounded-3xl p-8 md:p-20 text-center relative overflow-hidden border border-outline-variant/30">
            <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
              <span className="material-symbols-outlined text-[120px] text-primary" aria-hidden="true">
                auto_stories
              </span>
            </div>
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="font-display-lg text-2xl md:text-display-lg mb-6">Restez Inspirés</h2>
              <p className="font-body-lg text-on-surface-variant mb-10">
                Inscrivez-vous à notre newsletter pour recevoir nos recettes exclusives,
                portraits de chefs et invitations aux événements culinaires.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {openArticle && (
          <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
