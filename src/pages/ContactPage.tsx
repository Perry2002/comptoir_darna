import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/ui/Button'
import { Input, Textarea, Select } from '../components/ui/FormField'
import { submitContactMessage } from '../lib/api'
import type { SubmissionState } from '../types'

const contactInfo = [
  {
    icon: 'location_on',
    label: 'Adresse',
    value: 'Avenue Echouhada, Hivernage, Marrakech 40000, Maroc',
  },
  { icon: 'call', label: 'Téléphone', value: '+212 (0) 5 24 43 77 02' },
  { icon: 'mail', label: 'Email', value: 'contact@comptoirdarna.com' },
  { icon: 'schedule', label: 'Horaires', value: 'Tous les jours, 19h00 — 02h00' },
]

export default function ContactPage() {
  const [status, setStatus] = useState<SubmissionState>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setStatus('submitting')
    setError('')
    try {
      await submitContactMessage({
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        subject: String(form.get('subject') || ''),
        message: String(form.get('message') || ''),
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Une erreur est survenue, merci de réessayer.')
    }
  }

  return (
    <div className="bg-surface-container-low min-h-screen">
      {/* Hero */}
      <section className="relative h-[360px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-margin-mobile">
          <h1 className="font-display-lg text-4xl md:text-[64px] mb-4">Contactez-nous</h1>
          <p className="font-body-lg max-w-xl mx-auto opacity-90">
            Une question, un événement privé à organiser ? Notre équipe vous répond avec
            plaisir.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Info column */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-display-lg text-2xl md:text-headline-lg text-primary">
              Restons en contact
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-md">
              Pour toute demande spécifique — événement privé, presse, partenariat — écrivez-nous
              directement, nous revenons vers vous sous 24h.
            </p>
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <span
                    className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full"
                    aria-hidden="true"
                  >
                    {info.icon}
                  </span>
                  <div>
                    <p className="font-label-lg text-on-surface">{info.label}</p>
                    <p className="text-on-surface-variant">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm h-64 border border-outline-variant/30">
              <iframe
                title="Localisation de Comptoir Darna à Marrakech"
                src="https://www.google.com/maps?q=Hivernage%20Marrakech&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-start-7 lg:col-span-6">
            <div
              className="bg-surface-container-low rounded-xl p-6 md:p-10 shadow-sm border border-outline-variant/30"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 py-10"
                  >
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-primary text-5xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          aria-hidden="true"
                        >
                          mark_email_read
                        </span>
                      </div>
                    </div>
                    <h2 className="font-display-lg text-2xl text-primary">Message envoyé !</h2>
                    <p className="font-body-lg text-on-surface-variant max-w-sm mx-auto">
                      Merci de nous avoir contactés. Notre équipe vous répondra dans les
                      meilleurs délais.
                    </p>
                    <Button variant="secondary" onClick={() => setStatus('idle')}>
                      Envoyer un autre message
                    </Button>
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
                    <h2 className="font-headline-lg text-on-surface">Envoyez-nous un message</h2>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="bg-error-container text-on-error-container rounded-lg px-4 py-3 text-sm flex items-start gap-2"
                      >
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">
                          error
                        </span>
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Nom complet" name="name" placeholder="Votre nom" required />
                      <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <Select label="Sujet" name="subject" defaultValue="" required>
                      <option value="" disabled>
                        Choisir un sujet
                      </option>
                      <option value="reservation">Réservation de groupe</option>
                      <option value="event">Événement privé</option>
                      <option value="press">Presse & Médias</option>
                      <option value="other">Autre demande</option>
                    </Select>
                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Écrivez votre message ici..."
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={status === 'submitting'}
                    >
                      Envoyer le message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
