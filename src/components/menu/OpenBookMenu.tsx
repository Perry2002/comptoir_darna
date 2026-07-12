import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BookPageContent from './BookPageContent'
import { cn } from '../../lib/cn'
import type { BookMenuPageData } from '../../types'

const FLIP_DURATION = 0.7 // seconds

type FlipDirection = 'next' | 'prev'

interface FlipState {
  direction: FlipDirection
  page: BookMenuPageData
  pageNumber: number
}

export default function OpenBookMenu({
  pages,
  className,
}: {
  pages: BookMenuPageData[]
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  )
  const [flip, setFlip] = useState<FlipState | null>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  const step = isDesktop ? 2 : 1
  const maxIndex = Math.max(pages.length - step, 0)

  useEffect(() => {
    function onResize() {
      const desktop = window.innerWidth >= 768
      const newStep = desktop ? 2 : 1
      setIsDesktop(desktop)
      setFlip(null)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      setIndex((i) => Math.min(i - (i % newStep), Math.max(pages.length - newStep, 0)))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [pages.length])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const currentLeft = pages[index]
  const currentRight = isDesktop ? pages[index + 1] : undefined

  const canPrev = index > 0
  const canNext = index < maxIndex

  const handleNext = useCallback(() => {
    if (!canNext || flip) return
    const flippingPage = isDesktop ? currentRight! : currentLeft
    const flippingPageNumber = isDesktop ? index + 2 : index + 1
    setFlip({ direction: 'next', page: flippingPage, pageNumber: flippingPageNumber })
    timeoutRef.current = window.setTimeout(() => {
      setIndex((i) => Math.min(i + step, maxIndex))
    }, (FLIP_DURATION * 1000) / 2)
  }, [canNext, flip, isDesktop, currentRight, currentLeft, index, step, maxIndex])

  const handlePrev = useCallback(() => {
    if (!canPrev || flip) return
    const flippingPage = currentLeft
    const flippingPageNumber = index + 1
    setFlip({ direction: 'prev', page: flippingPage, pageNumber: flippingPageNumber })
    timeoutRef.current = window.setTimeout(() => {
      setIndex((i) => Math.max(i - step, 0))
    }, (FLIP_DURATION * 1000) / 2)
  }, [canPrev, flip, currentLeft, index, step])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'ArrowLeft') handlePrev()
  }

  const pageLabel = isDesktop && currentRight ? `${index + 1}–${index + 2}` : `${index + 1}`

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-center gap-3 md:gap-6">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canPrev || !!flip}
          aria-label="Page précédente"
          className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-surface-container-lowest disabled:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_left
          </span>
        </button>

        <div
          role="group"
          aria-roledescription="livre"
          aria-label={`Carte, page ${pageLabel} sur ${pages.length}`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative w-full max-w-4xl h-[380px] sm:h-[410px] md:h-[440px] overflow-hidden bg-surface-container-lowest rounded-lg shadow-2xl border border-outline-variant/30 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ perspective: '2200px' }}
        >
          {/* Left / single page — pinned top & bottom so its height is always exactly
              the book's height, independent of its content (no grid/flex stretch involved). */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 border-outline-variant/20',
              isDesktop ? 'w-1/2 md:border-r' : 'w-full'
            )}
          >
            <BookPageContent data={currentLeft} pageNumber={index + 1} />
          </div>
          {isDesktop && currentRight && (
            <div className="absolute inset-y-0 right-0 w-1/2">
              <BookPageContent data={currentRight} pageNumber={index + 2} />
            </div>
          )}

          {/* Spine shadow */}
          <div
            className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Flipping page overlay */}
          <AnimatePresence>
            {flip && (
              <motion.div
                key="flip-overlay"
                className={cn(
                  'absolute top-0 h-full z-20 pointer-events-none',
                  isDesktop
                    ? flip.direction === 'next'
                      ? 'right-0 w-1/2'
                      : 'left-0 w-1/2'
                    : 'inset-x-0 w-full'
                )}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: flip.direction === 'next' ? 'left center' : 'right center',
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flip.direction === 'next' ? -180 : 180 }}
                transition={{ duration: FLIP_DURATION, ease: [0.45, 0, 0.55, 1] }}
                onAnimationComplete={() => setFlip(null)}
              >
                {/* Front face — mirrors the page currently being turned */}
                <div className="absolute inset-0 shadow-2xl" style={{ backfaceVisibility: 'hidden' }}>
                  <BookPageContent data={flip.page} pageNumber={flip.pageNumber} />
                  <motion.div
                    className="absolute inset-0 bg-black pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.35, 0] }}
                    transition={{ duration: FLIP_DURATION, times: [0, 0.5, 1] }}
                    aria-hidden="true"
                  />
                </div>
                {/* Back face — blank verso of the paper */}
                <div
                  className="absolute inset-0 bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-6xl text-primary/10">
                    auto_stories
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canNext || !!flip}
          aria-label="Page suivante"
          className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-surface-container-lowest disabled:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_right
          </span>
        </button>
      </div>

      <p className="text-center mt-4 text-xs text-on-surface-variant/60" aria-live="polite">
        Page {pageLabel} / {pages.length}
      </p>
    </div>
  )
}