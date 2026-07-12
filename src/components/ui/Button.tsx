import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-container focus-visible:ring-primary shadow-sm hover:shadow-md',
  secondary:
    'bg-transparent border border-primary text-primary hover:bg-primary hover:text-on-primary focus-visible:ring-primary',
  accent:
    'bg-secondary text-on-secondary hover:bg-primary focus-visible:ring-secondary shadow-sm hover:shadow-md',
  ghost:
    'bg-transparent text-on-surface-variant hover:bg-surface-container-high focus-visible:ring-outline',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-[13px] rounded-lg gap-1.5',
  md: 'px-8 py-3 text-label-lg rounded-lg gap-2',
  lg: 'px-10 py-4 text-label-lg rounded-lg gap-2',
}

/**
 * Primary interactive control for the whole app.
 * Handles loading + disabled states so every call site behaves consistently.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    disabled,
    className,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-label-lg tracking-wide uppercase transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden="true"
        />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[1.1em]" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[1.1em]" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
})

export default Button
