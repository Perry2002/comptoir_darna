import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionHeading from '../components/ui/SectionHeading'
import { events } from '../data/events'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
}

export default function ArtShowPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <section className="relative h-[420px] md:h-[560px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-margin-mobile">
          <span className="font-label-lg text-secondary-fixed uppercase tracking-widest text-xs block mb-4">
            Au-delà du repas
          </span>
          <h1 className="font-display-lg text-4xl md:text-[64px] mb-4">Art &amp; Show</h1>
          <p className="font-body-lg max-w-2xl mx-auto opacity-90">
            Un calendrier vivant de spectacles, de musique et de rencontres artistiques qui font
            vibrer Comptoir Darna chaque semaine.
          </p>
        </div>
      </section>

      {/* Programme */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <SectionHeading
          eyebrow="Le Calendrier"
          title="Notre Programme"
          description="Chaque soir a sa propre couleur — choisissez celle qui vous ressemble."
          className="mb-16"
        />
        <div className="space-y-gutter">
          {events.map((event, i) => (
            <motion.article
              key={event.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-surface-container-low rounded-xl overflow-hidden shadow-sm ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="h-64 md:h-80 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 space-y-4">
                <Badge tone={event.tag === 'Spécial' ? 'tertiary' : 'secondary'}>{event.tag}</Badge>
                <h2 className="font-display-lg text-2xl md:text-headline-lg text-on-surface">
                  {event.title}
                </h2>
                <p className="font-label-lg text-primary uppercase tracking-wide text-sm">
                  {event.subtitle}
                </p>
                <div className="flex flex-wrap gap-6 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
                      event
                    </span>
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
                      schedule
                    </span>
                    {event.time}
                  </div>
                </div>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-stack-lg bg-surface-container-highest text-center relative overflow-hidden">
        <div className="absolute inset-0 zellij-pattern" aria-hidden="true" />
        <div className="relative z-10 px-margin-mobile">
          <h2 className="font-display-lg text-3xl md:text-display-lg text-primary mb-6">
            Réservez Votre Soirée
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
            Les places pour nos soirées à thème partent vite — réservez votre table dès
            maintenant pour ne rien manquer du spectacle.
          </p>
          <Link to="/reservation">
            <Button variant="primary" size="lg">
              Réserver ma table
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
