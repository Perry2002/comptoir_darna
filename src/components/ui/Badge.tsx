import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeTone = 'primary' | 'secondary' | 'tertiary' | 'neutral'

const toneClasses: Record<BadgeTone, string> = {
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  neutral: 'bg-surface-container-high text-on-surface-variant',
}

export default function Badge({
  children,
  tone = 'secondary',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider',
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
