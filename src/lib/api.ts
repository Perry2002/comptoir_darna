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

export async function submitReservation(data: ReservationFormData): Promise<{ ok: true }> {
  await delay(1200)
  if (!data.email.includes('@')) {
    throw new Error('Adresse e-mail invalide.')
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
