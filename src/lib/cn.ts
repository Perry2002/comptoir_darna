type ClassValue = string | number | null | undefined | false | Record<string, boolean | undefined>

/**
 * Lightweight className combiner (no external dependency).
 * Accepts strings, falsy values (ignored) and objects of `{ className: condition }`.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []
  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input))
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) classes.push(key)
      }
    }
  }
  return classes.join(' ')
}
