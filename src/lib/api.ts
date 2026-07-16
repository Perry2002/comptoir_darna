import type { ReservationFormData } from '../types'

/**
 * Simulated network layer.
 * Swap the body of these functions for real `fetch()` calls once the
 * backend (see ROADMAP.md — Phase 2) is available, the calling components
 * don't need to change.
 */

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const RESERVATION_WORKER_URL = ' https://comptoir-darna-reservation.perrydoyigbe.workers.dev'
// en prod, remplace par l'URL du Worker déployé (ou le domaine custom, étape 9)

export async function submitReservation(data: ReservationFormData): Promise<{ ok: true }> {
  const res = await fetch(RESERVATION_WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Une erreur est survenue, merci de réessayer.')
  }

  return { ok: true }
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactMessage(data: ContactFormData): Promise<{ ok: true }> {
  await delay(1200)
  if (!data.email.includes('@')) {
    throw new Error('Adresse e-mail invalide.')
  }
  return { ok: true }
}

export async function submitNewsletter(email: string): Promise<{ ok: true }> {
  await delay(900)
  if (!email.includes('@')) {
    throw new Error('Adresse e-mail invalide.')
  }
  return { ok: true }
}
