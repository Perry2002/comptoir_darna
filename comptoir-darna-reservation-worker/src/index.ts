export interface Env {
  RESEND_API_KEY: string
  RESTAURANT_EMAIL: string
  FROM_EMAIL: string
  ALLOWED_ORIGIN: string
}

interface ReservationPayload {
  name: string
  email: string
  date: string
  time: string
  guests: number
  table: string
}

const ALLOWED_TIMES = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
const ALLOWED_TABLES = ['Standard', 'Courtyard', 'Lounge', 'Private']
const TABLE_LABELS: Record<string, string> = {
  Standard: 'Standard',
  Courtyard: 'Patio Central',
  Lounge: 'Salon Lounge',
  Private: 'Espace Privé',
}

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function jsonResponse(body: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidDate(dateStr: string) {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}

function validate(payload: Partial<ReservationPayload>): string | null {
  if (!payload.name || payload.name.trim().length < 2) {
    return 'Merci de renseigner votre nom complet.'
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    return 'Adresse e-mail invalide.'
  }
  if (!payload.date || !isValidDate(payload.date)) {
    return 'Merci de choisir une date valide (aujourd\'hui ou plus tard).'
  }
  if (!payload.time || !ALLOWED_TIMES.includes(payload.time)) {
    return 'Créneau horaire invalide.'
  }
  if (
    !payload.guests ||
    !Number.isInteger(payload.guests) ||
    payload.guests < 1 ||
    payload.guests > 20
  ) {
    return 'Le nombre de personnes doit être compris entre 1 et 20.'
  }
  if (!payload.table || !ALLOWED_TABLES.includes(payload.table)) {
    return 'Choix de table invalide.'
  }
  return null
}

function formattedDateFr(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function sendEmail(
  env: Env,
  to: string,
  subject: string,
  html: string,
  replyTo?: string
) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Comptoir Darna <${env.FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Échec envoi email (${res.status}): ${errText}`)
  }
}

function restaurantAlertHtml(data: ReservationPayload) {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
      <h2 style="color:#b5442e;">Nouvelle réservation</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding:6px 0;"><strong>Nom</strong></td><td>${data.name}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Date</strong></td><td>${formattedDateFr(data.date)}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Heure</strong></td><td>${data.time}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Personnes</strong></td><td>${data.guests}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Table</strong></td><td>${TABLE_LABELS[data.table]}</td></tr>
      </table>
      <p style="color:#666; font-size:13px; margin-top:16px;">Vous pouvez répondre directement à cet email pour contacter le client.</p>
    </div>
  `
}

function clientConfirmationHtml(data: ReservationPayload) {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
      <h2 style="color:#b5442e;">Réservation confirmée</h2>
      <p>Bonjour ${data.name},</p>
      <p>Votre réservation au <strong>Comptoir Darna</strong> est bien enregistrée :</p>
      <ul>
        <li>Date : ${formattedDateFr(data.date)}</li>
        <li>Heure : ${data.time}</li>
        <li>Personnes : ${data.guests}</li>
        <li>Table : ${TABLE_LABELS[data.table]}</li>
      </ul>
      <p>Nous avons hâte de vous accueillir. À bientôt !</p>
      <p style="color:#666; font-size:13px;">Comptoir Darna — Avenue Echouhada, Hivernage, Marrakech — +212 (0) 5 24 43 77 02</p>
    </div>
  `
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Méthode non autorisée.' }, 405, origin)
    }

    let payload: Partial<ReservationPayload>
    try {
      payload = await request.json()
    } catch {
      return jsonResponse({ error: 'Corps de requête JSON invalide.' }, 400, origin)
    }

    const validationError = validate(payload)
    if (validationError) {
      return jsonResponse({ error: validationError }, 400, origin)
    }

    const data = payload as ReservationPayload

    try {
      await sendEmail(
        env,
        env.RESTAURANT_EMAIL,
        `Nouvelle réservation — ${data.name} (${data.guests} pers., ${data.time})`,
        restaurantAlertHtml(data),
        data.email
      )
      await sendEmail(
        env,
        data.email,
        'Votre réservation au Comptoir Darna est confirmée',
        clientConfirmationHtml(data)
      )
    } catch (err) {
      console.error('Erreur envoi email', err)
      return jsonResponse(
        { error: "Une erreur est survenue lors de l'envoi de la confirmation, merci de réessayer." },
        500,
        origin
      )
    }

    return jsonResponse({ success: true }, 200, origin)
  },
}
