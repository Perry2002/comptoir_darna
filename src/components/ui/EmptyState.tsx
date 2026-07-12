import type { ReactNode } from 'react'

export default function EmptyState({
  icon = 'search_off',
  title,
  description,
  action,
}: {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-3xl text-on-surface-variant" aria-hidden="true">
          {icon}
        </span>
      </div>
      <h3 className="font-headline-md text-on-surface mb-2">{title}</h3>
      {description && (
        <p className="font-body-md text-on-surface-variant max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
