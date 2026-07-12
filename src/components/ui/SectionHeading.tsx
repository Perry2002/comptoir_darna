import { cn } from '../../lib/cn'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="font-label-lg text-primary uppercase tracking-widest block mb-2 text-xs md:text-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface">{title}</h2>
      {description && (
        <p className="font-body-md text-on-surface-variant mt-4 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
