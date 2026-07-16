import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/ui/Button'
import { Input, Select } from '../components/ui/FormField'
import { submitReservation } from '../lib/api'
import type { ReservationFormData, SubmissionState } from '../types'
import { timeSlots, tableOptions } from '../lib/reservationOptions'
// const timeSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']


function todayISO() {
  return new Date().toISOString().split('T')[0]
}

export default function ReservationPage() {
  const [status, setStatus] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmed, setConfirmed] = useState<ReservationFormData | null>(null)

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

    setStatus('submitting')
    setErrorMessage('')
    try {
      await submitReservation(data)
      setConfirmed(data)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : "Une erreur est survenue, merci de réessayer."
      )
    }
  }

  function reset() {
    setStatus('idle')
    setConfirmed(null)
    setErrorMessage('')
  }

  const formattedDate = confirmed
    ? new Date(confirmed.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Info column */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <h1 className="font-display-lg text-3xl md:text-display-lg text-primary leading-tight">
              Une table sous les étoiles de Marrakech.
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-md">
              Réservez votre expérience sensorielle au cœur de Marrakech. Entre saveurs
              orientales et atmosphère envoûtante, préparez-vous pour une soirée inoubliable.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full"
                  aria-hidden="true"
                >
                  schedule
                </span>
                <div>
                  <p className="font-label-lg text-on-surface">Horaires d'ouverture</p>
                  <p className="text-on-surface-variant">Tous les jours de 19h00 à 02h00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full"
                  aria-hidden="true"
                >
                  location_on
                </span>
                <div>
                  <p className="font-label-lg text-on-surface">Localisation</p>
                  <p className="text-on-surface-variant">
                    Avenue Echouhada, Hivernage, Marrakech
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full"
                  aria-hidden="true"
                >
                  call
                </span>
                <div>
                  <p className="font-label-lg text-on-surface">Réservation par téléphone</p>
                  <a href="tel:+212524437702" className="text-on-surface-variant hover:text-primary">
                    +212 (0) 5 24 43 77 02
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative rounded-xl overflow-hidden shadow-lg h-64 mt-6">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80"
                alt="Patio du Comptoir Darna illuminé la nuit"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Booking form column */}
          <div className="lg:col-start-7 lg:col-span-6">
            <div
              className="bg-surface-container-low rounded-xl p-6 md:p-10 shadow-sm border border-outline-variant/30"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {status === 'success' && confirmed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 py-6"
                  >
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-primary text-5xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-display-lg text-2xl md:text-headline-lg text-primary">
                        Merci, {confirmed.name} !
                      </h2>
                      <p className="font-body-lg text-on-surface-variant">
                        Votre réservation pour le{' '}
                        <span className="font-bold text-primary">{formattedDate}</span> à{' '}
                        <span className="font-bold text-primary">{confirmed.time}</span> a été
                        enregistrée avec succès.
                      </p>
                      <p className="text-on-surface-variant">
                        Un email de confirmation vous a été envoyé à{' '}
                        <span className="font-medium">{confirmed.email}</span>.
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button variant="secondary" onClick={reset}>
                        Faire une autre réservation
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="space-y-2">
                      <h2 className="font-headline-lg text-on-surface">
                        Détails de la réservation
                      </h2>
                      <p className="text-on-surface-variant">
                        Veuillez remplir les informations ci-dessous.
                      </p>
                    </div>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="bg-error-container text-on-error-container rounded-lg px-4 py-3 text-sm flex items-start gap-2"
                      >
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">
                          error
                        </span>
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Date"
                        name="date"
                        type="date"
                        min={todayISO()}
                        required
                      />
                      <Select label="Heure" name="time" required defaultValue="">
                        <option value="" disabled>
                          Choisir un créneau
                        </option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Nombre de personnes"
                        name="guests"
                        type="number"
                        min={1}
                        max={20}
                        placeholder="2"
                        required 
                      />
                      <Select label="Choix de la table" name="table" defaultValue="Standard" required>
                        {tableOptions.map((t) => (
                           <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </Select>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-outline-variant/30">
                      <Input label="Nom complet" name="name" placeholder="Jean Dupont" required />
                      <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="jean.dupont@exemple.com"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={status === 'submitting'}
                      className="mt-2"
                    >
                      Confirmer la réservation
                    </Button>
                    <p className="text-center font-label-sm text-on-surface-variant/70 italic">
                      En confirmant, vous acceptez nos conditions de réservation.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
