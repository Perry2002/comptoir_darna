import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import StarRating from '../components/ui/StarRating'
import SectionHeading from '../components/ui/SectionHeading'
import { Input, Select } from '../components/ui/FormField'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { popularDishes } from '../data/menu'
import { chefs } from '../data/chefs'
import { reviews } from '../data/reviews'
import { submitReservation } from '../lib/api'
import { timeSlots, tableOptions } from '../lib/reservationOptions'
import type { ReservationFormData } from '../types'
import {HeroScallopDivider, RippleBackdrop} from '../components/HeroScallopDivider'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const categoryChips = [
  { icon: 'restaurant', label: 'Plats', color: 'bg-primary/10 text-primary' },
  { icon: 'icecream', label: 'Dessert', color: 'bg-secondary-container/30 text-secondary' },
  { icon: 'local_bar', label: 'Boissons', color: 'bg-blue-100 text-blue-600' },
  { icon: 'dinner_dining', label: 'Plateaux', color: 'bg-green-100 text-green-700' },
]

const commitments = [
  'Ingrédients Frais & Locaux',
  'Chefs Expérimentés & Passionnés',
  'Réservation en Ligne Facile',
  'Ambiance Authentique & Festive',
  'Service de Qualité Supérieure',
]

function ReservationWidget() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const data: ReservationFormData = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      date: String(form.get('date') || ''),
      time: String(form.get('time') || ''),
      guests: Number(form.get('guests') || 2),
      table: String(form.get('table') || 'Standard'),
    }

    setSubmitting(true)
    setError('')
    try {
      await submitReservation(data)
      setSuccess(true)
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue, merci de réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-surface/95 backdrop-blur-md p-stack-md rounded-xl shadow-2xl space-y-4 border border-white/40 text-center">
        <h2 className="font-headline-md text-primary">Réservation envoyée !</h2>
        <p className="text-on-surface-variant">Vous allez recevoir un email de confirmation.</p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>
          Faire une autre réservation
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-surface/95 backdrop-blur-md p-stack-md rounded-xl shadow-2xl space-y-6 border border-white/40">
      <h2 className="font-headline-md text-primary text-center">Réserver votre table</h2>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit} noValidate>
        {error && (
          <div role="alert" className="col-span-2 bg-error-container text-on-error-container rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <div className="col-span-2">
          <Input label="Nom complet" placeholder="Votre nom" name="name" required />
        </div>
        <div className="col-span-2">
          <Input label="Email" type="email" placeholder="votre@email.com" name="email" required />
        </div>

        <Input label="Date" type="date" name="date" required />

        <Select label="Heure" name="time" required defaultValue="">
          <option value="" disabled>Choisir un créneau</option>
          {timeSlots.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>

        <Input label="Nombre de personnes" name="guests" type="number" min={1} max={20} placeholder="2" required />

        <Select label="Table" name="table" defaultValue="Standard" required>
          {tableOptions.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </Select>

        <div className="col-span-2 pt-2">
          <Button type="submit" variant="primary" fullWidth loading={submitting}>
            Je réserve
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function HomePage() {
  const revealRef = useScrollReveal()

  return (
    <div ref={revealRef} className="bg-surface">
      {/* Hero */}
      <section className="relative min-h-[640px] md:h-[820px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784287539/D2_fdumld.webp"
            alt=""
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <HeroScallopDivider />
        <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop mx-auto grid md:grid-cols-2 gap-12 items-center py-24">
          <motion.div
            className="text-white space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="font-display-lg text-4xl md:text-display-lg leading-tight">
              Bienvenue chez vous, bienvenue chez Darna
            </h1>
            <p className="font-body-lg text-white/90 max-w-md">
              Venez pour un repas. Repartez avec une nouvelle adresse préférée. Ici, la saveur
              n'est pas que dans la bouche : elle enlace vos yeux, vos oreilles et votre odorat.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/menu">
                <Button variant="primary" size="lg">
                  Découvrir le menu
                </Button>
              </Link>
              <Link to="/experience">
                <Button variant="secondary" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-primary">
                  L'expérience
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            <ReservationWidget />
          </motion.div>
        </div>
      </section>

 {/* Ici chaque bouchée + Plats populaires — fusionnées */}
<section className="py-stack-lg bg-surface relative overflow-hidden">
  <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
 
    {/* --- Bloc 1 : Ici chaque bouchée --- */}
    <div className="grid md:grid-cols-2 gap-16 items-center mb-24 md:mb-32">
      <div className="space-y-8 reveal">
        <h2 className="font-display-lg text-3xl md:text-5xl text-on-surface leading-tight">
          Ici, chaque bouchée a un accent marocain.
        </h2>
        <p className="font-body-md text-on-surface-variant max-w-lg leading-relaxed">
          Entre dîner spectacle envoûtant, rythmé par la danse orientale, et instants plus
          intimes autour d'un tajine mijoté, d'un couscous royal ou d'une chicha, le Comptoir
          Darna réinvente chaque soirée dans une ambiance à la fois chic et conviviale.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link to="/menu">
            <Button variant="primary" size="md">
              Découvrir le menu
            </Button>
          </Link>
          <Link to="/reservation">
            <Button variant="secondary" size="md" icon="calendar_month">
              Réserver
            </Button>
          </Link>
        </div>
      </div>
 
      <div className="relative flex items-center justify-center reveal">
        <div className="relative md:-translate-x-16 lg:-translate-x-24">
          <RippleBackdrop />
 
          <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784292674/unnamed_1_tnoarc.webp"
              alt="Tanjia Marrakchia servie dans un plat traditionnel"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
 
          <div className="hidden md:flex absolute -right-24 lg:-right-32 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
            {categoryChips.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-2 pr-6 rounded-full shadow-lg border border-outline-variant/20 hover:translate-x-2 transition-transform cursor-default group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${c.color}`}>
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">
                    {c.icon}
                  </span>
                </div>
                <span className="font-label-lg text-on-surface whitespace-nowrap">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
 
    {/* --- Bloc 2 : Plats populaires --- */}
    <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-12 reveal">
      <div>
        <span className="font-label-lg text-primary uppercase tracking-widest block mb-2 text-xs">
          Qu'est-ce que vous avez envie de manger ?
        </span>
        <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface">
          Voici nos plats populaires
        </h2>
      </div>
      <Link
        to="/menu"
        className="font-label-lg text-primary hover:underline flex items-center gap-1"
      >
        Voir tout <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
      </Link>
    </div>
 
    <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-20">
  {popularDishes.map((dish, i) => (
    <motion.div
      key={dish.id}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group flex flex-col h-full"
    >
      <div className="w-28 h-28 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-surface-container">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <h3 className="font-headline-md text-base md:text-headline-md text-on-surface mb-2 min-h-[2.8em] flex items-center justify-center">
        {dish.name}
      </h3>
      <StarRating rating={5} size="text-sm" className="justify-center mb-3" />
      <div className="flex items-center justify-between mt-auto pt-4">
        <span className="font-bold text-primary">{dish.price} DH</span>
        <Link to="/menu">
          <Button variant="ghost" size="sm" className="!bg-primary/10 !text-primary hover:!bg-primary hover:!text-on-primary !px-4 !py-2 !text-xs">
            Voir
          </Button>
        </Link>
      </div>
    </motion.div>
  ))}
</div>
 
    {/* --- Bloc 3 : Plus qu'un simple service --- */}
    <div className="grid md:grid-cols-2 gap-12 items-center mt-24 reveal">
      <div className="relative">
        <div className="w-full aspect-square max-w-md mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl">
          <img
            src="https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784296250/chef_uftbd7.webp"
            alt="Notre chef en cuisine"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-primary text-on-primary p-6 rounded-xl shadow-lg hidden md:block">
          <p className="font-display-lg text-2xl">15+</p>
          <p className="font-label-sm opacity-90">Années d'Excellence</p>
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <span className="font-label-lg text-primary uppercase tracking-widest block mb-2 text-xs">
            Notre Engagement
          </span>
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface leading-tight">
            Plus qu'un Simple Service
          </h2>
          <p className="font-body-md text-on-surface-variant mt-4">
            Nous nous efforçons de créer une expérience sensorielle complète, où chaque
            détail est pensé pour vous transporter au cœur de l'hospitalité marocaine.
          </p>
        </div>
        <ul className="space-y-4">
          {commitments.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-full text-lg" aria-hidden="true">
                check
              </span>
              <span className="font-body-md">{item}</span>
            </li>
          ))}
        </ul>
        <br />
        <Link to="/experience">
          <Button variant="primary" size="md">
            En savoir plus
          </Button>
        </Link>
      </div>
    </div>
 
  </div>
</section>

      {/* Nos chefs */}
      <section className="py-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center reveal">
          <span className="font-label-lg text-primary uppercase tracking-widest block mb-4 text-xs">
            L'Excellence Culinaire
          </span>
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface mb-stack-md">
            Nos Chefs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-12">
            {chefs.map((chef) => (
              <div key={chef.id} className="group">
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-headline-md text-primary">{chef.name}</h3>
                <p className="font-body-md text-on-surface-variant mt-2 max-w-xs mx-auto">
                  {chef.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
        <div className="bg-surface-container-low p-8 md:p-20 rounded-xl relative overflow-hidden grid md:grid-cols-2 gap-12 items-center shadow-sm reveal">
          <div className="space-y-6 relative z-10">
            <h2 className="font-display-lg text-2xl md:text-5xl text-on-surface leading-tight">
              Avez-vous un rendez-vous ce soir ? Réservez votre table.
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-md leading-relaxed">
              Réservez votre table en temps réel et profitez d'une expérience simple, rapide et
              pensée pour vous. Astuce des habitués : privilégiez une table à l'étage pour
              profiter pleinement de l'ambiance du spectacle.
            </p> <br />
            <Link to="/reservation">
              <Button variant="accent" size="lg">
                Je réserve pour ce soir
              </Button>
            </Link>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="relative z-10 w-full aspect-[16/9] rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784297107/darna-1_yys681.webp"
                alt="Salle de réception dressée pour un dîner"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Souk, Art & Show */}
      <section className="py-stack-lg bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 reveal">
            <span className="font-label-sm text-primary uppercase tracking-widest block mb-2">
              Au-delà du repas
            </span>
            <h2 className="font-display-lg text-3xl md:text-5xl text-on-surface mb-4">
              Souk, Art &amp; Show
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start reveal">
            <div className="md:col-span-7 relative mb-10 md:mb-0">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/djvqjz65z/image/upload/f_auto,q_auto/v1784297481/souktronik_afm8sd.webp"
                  alt="Bar et mixologie du Comptoir Darna"
                  className="w-full h-64 md:h-96 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="md:absolute md:-bottom-8 md:-right-4 mt-4 md:mt-0 bg-surface p-6 md:p-8 shadow-2xl max-w-xs rounded-lg border border-outline-variant/20">
                <h3 className="font-headline-md text-on-surface mb-3">Le Souktronic</h3>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Une sélection méticuleuse d'artisanat marocain authentique, des textures et
                  couleurs qui racontent l'histoire de Marrakech.
                </p>
              </div>
            </div>
            <div className="md:col-span-5 md:mt-16">
              <div className="bg-surface rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://res.cloudinary.com/djvqjz65z/image/upload/v1784297588/art_et_show_wr2roc.webp"
                  alt="Spectacle Art & Show du Comptoir Darna"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-headline-md text-on-surface mb-2">Art &amp; Show</h3>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    Une fusion culturelle où l'élégance contemporaine rencontre l'âme
                    traditionnelle du Maroc.
                  </p>
                  <Link
                    to="/art-show"
                    className="inline-flex items-center gap-1 mt-4 text-primary font-label-lg hover:underline"
                  >
                    Le programme complet
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section 
        className="py-stack-lg"
        style={{
          background: 'linear-gradient(to bottom, #fdf9f4 0%, #f7f3ee 280px, #f7f3ee 100%)',
          }}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeading eyebrow="Témoignages" title="Expériences Partagées" className="mb-12 reveal" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-surface p-8 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <StarRating rating={review.rating} className="mb-4" />
                  <p className="font-body-md italic text-on-surface-variant">"{review.quote}"</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-label-lg">{review.name}</p>
                    <p className="text-label-sm text-outline">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
