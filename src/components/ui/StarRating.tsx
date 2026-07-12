import { cn } from '../../lib/cn'

export default function StarRating({
  rating,
  max = 5,
  size = 'text-base',
  className,
}: {
  rating: number
  max?: number
  size?: string
  className?: string
}) {
  const clamped = Math.max(0, Math.min(rating, max))
  return (
    <div
      className={cn('flex text-secondary', className)}
      role="img"
      aria-label={`Note : ${clamped} sur ${max} étoiles`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={cn('material-symbols-outlined', size)}
          style={{ fontVariationSettings: `'FILL' ${i < clamped ? 1 : 0}` }}
          aria-hidden="true"
        >
          star
        </span>
      ))}
    </div>
  )
}
