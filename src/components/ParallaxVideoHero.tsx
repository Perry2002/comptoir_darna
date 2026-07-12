import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
// , useInView
export interface ScrollScrubHeroProps {
  /** Dossier contenant les frames, ex: "/videos/experience-hero-frames" */
  framesBasePath: string
  frameCount: number
  /** Format et pattern de nommage : frame-001.jpg, frame-002.jpg, ... */
  frameExtension?: 'jpg' | 'webp'
  posterSrc?: string
  title: string
  subtitle?: string
  heightClass?: string
  scrubVh?: number
}

function frameUrl(base: string, index: number, ext: string) {
  return `${base}/frame-${String(index + 1).padStart(3, '0')}.${ext}`
}

export default function ScrollScrubHero({
  framesBasePath,
  frameCount,
  frameExtension = 'jpg',
  posterSrc,
  title,
  subtitle,
  heightClass = 'h-screen',
  scrubVh = 300,
}: ScrollScrubHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(-1)
  const [loadedCount, setLoadedCount] = useState(0)
  const [ready, setReady] = useState(false)

  const prefersReducedMotion = useReducedMotion()
  // const isInView = useInView(trackRef, { amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const videoEnd = 0.82
  const scrubProgress = useTransform(scrollYProgress, [0, videoEnd], [0, 1], { clamp: true })
  const textOpacity = useTransform(scrollYProgress, [videoEnd, 1], prefersReducedMotion ? [1, 1] : [0, 1])
  const textY = useTransform(scrollYProgress, [videoEnd, 1], prefersReducedMotion ? [0, 0] : [24, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], prefersReducedMotion ? [0, 0] : [1, 0])

  // Dessine une frame donnée sur le canvas, en respectant un rendu "object-cover"
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    const ir = img.naturalWidth / img.naturalHeight
    const cr = cw / ch

    let dw, dh, dx, dy
    if (ir > cr) {
      dh = ch
      dw = ch * ir
      dx = (cw - dw) / 2
      dy = 0
    } else {
      dw = cw
      dh = cw / ir
      dx = 0
      dy = (ch - dh) / 2
    }
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }, [])

  // Préchargement de toutes les frames
  useEffect(() => {
    let cancelled = false
    let count = 0
    const imgs: HTMLImageElement[] = []

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = frameUrl(framesBasePath, i, frameExtension)
      img.onload = () => {
        if (cancelled) return
        count += 1
        setLoadedCount(count)
        if (i === 0) drawFrame(0) // affiche la 1ère frame dès qu'elle est prête
        if (count === frameCount) setReady(true)
      }
      imgs.push(img)
    }
    imagesRef.current = imgs

    return () => {
      cancelled = true
    }
  }, [framesBasePath, frameCount, frameExtension, drawFrame])

  // Redimensionnement du canvas à la taille réelle du conteneur (+ devicePixelRatio)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx?.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // Le scrub proprement dit : une frame par tick de progression
  useMotionValueEvent(scrubProgress, 'change', (latest) => {
    if (prefersReducedMotion || !ready) return
    const index = Math.min(frameCount - 1, Math.round(latest * (frameCount - 1)))
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index
      requestAnimationFrame(() => drawFrame(index))
    }
  })

  const loadingPct = Math.round((loadedCount / frameCount) * 100)

  return (
    <div
      ref={trackRef}
      style={{ height: prefersReducedMotion ? undefined : `${scrubVh}vh` }}
      className="relative"
    >
      <section
        className={`${prefersReducedMotion ? 'relative' : 'sticky top-0'} ${heightClass} flex items-center justify-center overflow-hidden bg-black`}
        aria-label={title}
      >
        <div className="absolute inset-0 z-0">
          {posterSrc && !ready && (
            <img src={posterSrc} alt="" className="w-full h-full object-cover absolute inset-0" />
          )}
          <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 55%, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
        />

        {!ready && !prefersReducedMotion && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-wider z-10">
            Chargement {loadingPct}%
          </div>
        )}

        <motion.div
          className="relative z-10 text-center text-white px-margin-mobile"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h1 className="font-display-lg text-4xl md:text-[64px] mb-4">{title}</h1>
          {subtitle && <p className="font-body-lg max-w-2xl mx-auto opacity-90">{subtitle}</p>}
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10"
          style={{ opacity: cueOpacity }}
        >
          <p className="text-white/70 text-[10px] tracking-[0.3em] uppercase">Faites défiler</p>
          <span
            className="material-symbols-outlined text-white/70 text-xl"
            style={prefersReducedMotion ? undefined : { animation: 'parallaxHeroChevron 2s ease-in-out infinite' }}
            aria-hidden="true"
          >
            expand_more
          </span>
        </motion.div>
      </section>

      {!prefersReducedMotion && (
        <style>{`
          @keyframes parallaxHeroChevron {
            0%, 100% { transform: translateY(-3px); opacity: 0.5; }
            50%      { transform: translateY(5px);  opacity: 1;   }
          }
        `}</style>
      )}
    </div>
  )
}