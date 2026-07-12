import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

const fieldBase =
  'w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-outline transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed'
const fieldError = 'border-error focus:border-error focus:ring-error/20'

interface FieldWrapperProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}

function FieldWrapper({ label, htmlFor, error, hint, required, children }: FieldWrapperProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="font-label-sm text-on-surface-variant px-1 block">
        {label}
        {required && (
          <span className="text-primary ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-on-surface-variant/70 px-1">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-error px-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, required, className, ...props },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <FieldWrapper label={label} htmlFor={inputId} error={error} hint={hint} required={required}>
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(fieldBase, error && fieldError, className)}
        {...props}
      />
    </FieldWrapper>
  )
})

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  hint?: string
  children: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, id, required, className, children, ...props },
  ref
) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  return (
    <FieldWrapper label={label} htmlFor={selectId} error={error} hint={hint} required={required}>
      <select
        ref={ref}
        id={selectId}
        required={required}
        aria-invalid={!!error}
        className={cn(fieldBase, 'appearance-none bg-no-repeat bg-[right_1rem_center]', error && fieldError, className)}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  )
})

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, id, required, className, ...props },
  ref
) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  return (
    <FieldWrapper label={label} htmlFor={textareaId} error={error} hint={hint} required={required}>
      <textarea
        ref={ref}
        id={textareaId}
        required={required}
        aria-invalid={!!error}
        className={cn(fieldBase, 'resize-none min-h-[120px]', error && fieldError, className)}
        {...props}
      />
    </FieldWrapper>
  )
})
