// Doit rester identique aux valeurs validées côté Worker (ALLOWED_TIMES / ALLOWED_TABLES)
export const timeSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

export const tableOptions = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Courtyard', label: 'Patio Central' },
  { value: 'Lounge', label: 'Salon Lounge' },
  { value: 'Private', label: 'Espace Privé' },
] as const