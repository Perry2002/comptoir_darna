import { cn } from '../../lib/cn'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} aria-hidden="true" />
}

/** Placeholder mimicking a dish/article card while data loads. */
export function CardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-8 space-y-3">
        <Skeleton className="h-5 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
    </div>
  )
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter"
      role="status"
      aria-label="Chargement du contenu"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
