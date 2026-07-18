import { useEffect, useRef, useState } from 'react'

const ARCH_COUNT_MOBILE = 4
const ARCH_COUNT_DESKTOP = 5
const GAP_RATIO = 0.25       // écart = 25% de la largeur de chaque arche
const ARCH_OFFSET_PX = 80    // décalage vers l'image (px) — voir OFFSET_RATIO_CAP
const OFFSET_RATIO_CAP = 0.6 // le décalage ne dépasse jamais 60% du rayon de l'arche,
                              // pour ne pas pousser les petites arches (mobile) hors du cadre

// Couleur de remplissage des arches. Doit toujours correspondre au fond RÉEL
// de la section crème adjacente pour que la jonction soit invisible :
// - Hero : #fdf9f4 (bg-surface, section "Ici chaque bouchée...")
// - Footer : #f7f3ee (dernier ton du dégradé de la section Témoignages)
const HERO_ARCH_FILL_COLOR = '#fdf9f4'
const FOOTER_ARCH_FILL_COLOR = '#f7f3ee'

type Anchor = 'bottom' | 'top'

function useScallopStyle(count: number, anchor: Anchor, fillColor: string) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function update(width: number) {
      // Ignore les mesures à 0 (layout pas encore stabilisé au premier
      // rendu, fréquent sur mobile avant chargement des polices/images) —
      // on attend une mesure valide plutôt que de figer des arches invisibles.
      if (width <= 0) return

      const tileWidth = width / count
      const gap = tileWidth * GAP_RATIO
      const radius = Math.round((tileWidth - gap) / 2)

      // anchor='bottom' (hero) : dôme (∩) — base au bas de la rangée, pointe
      //   vers le haut dans l'image. Rangée collée en bas du hero, décalée
      //   légèrement VERS LE BAS (dans l'image) pour "enfoncer" l'arche.
      // anchor='top' (footer)  : coupe (∪) — base en haut de la rangée,
      //   pointe vers le bas dans l'image. Rangée collée en haut du footer,
      //   décalée légèrement VERS LE HAUT (dans l'image) pour le même effet,
      //   miroir exact de la logique du hero.
      const gradientPos = anchor === 'bottom' ? '50% 100%' : '50% 0%'
      const bgPos = anchor === 'bottom' ? 'bottom center' : 'top center'
      const cappedOffset = Math.min(ARCH_OFFSET_PX, radius * OFFSET_RATIO_CAP)

      setStyle({
        height: radius,
        backgroundImage: `radial-gradient(circle ${radius}px at ${gradientPos}, ${fillColor} 0, ${fillColor} ${radius - 0.5}px, transparent ${radius}px)`,
        backgroundSize: `${tileWidth}px ${radius}px`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: bgPos,
        // Décalage via bottom/top directement plutôt que transform:translateY —
        // un transform CSS crée un calque de composition séparé, qui peut
        // laisser une fine ligne de crénelage à la frontière du calque quand
        // l'élément est dans un parent overflow-hidden. bottom/top évite ça.
        ...(anchor === 'bottom' ? { bottom: -cappedOffset } : { top: -cappedOffset }),
      })
    }

    // Mesure immédiate...
    update(el.getBoundingClientRect().width)

    // ...et une seconde mesure à la frame suivante, au cas où la première
    // aurait eu lieu avant que le layout ne soit stabilisé.
    const raf = requestAnimationFrame(() => {
      update(el.getBoundingClientRect().width)
    })

    const observer = new ResizeObserver((entries) => {
      update(entries[0].contentRect.width)
    })
    observer.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [count, anchor, fillColor])

  return [ref, style] as const
}

/** Rangée d'arches au bas du Hero — dômes (∩) pointant vers le haut dans l'image. */
export function HeroScallopDivider() {
  const [mobileRef, mobileStyle] = useScallopStyle(ARCH_COUNT_MOBILE, 'bottom', HERO_ARCH_FILL_COLOR)
  const [desktopRef, desktopStyle] = useScallopStyle(ARCH_COUNT_DESKTOP, 'bottom', HERO_ARCH_FILL_COLOR)

  return (
    <>
      <div
        ref={mobileRef}
        className="absolute left-0 right-0 z-10 pointer-events-none md:hidden"
        style={mobileStyle}
        aria-hidden="true"
      />
      <div
        ref={desktopRef}
        className="absolute left-0 right-0 z-10 pointer-events-none hidden md:block"
        style={desktopStyle}
        aria-hidden="true"
      />
    </>
  )
}

/** Rangée d'arches en haut du Footer — coupes (∪) pointant vers le bas dans l'image, miroir exact du Hero. */
export function FooterScallopDivider() {
  const [mobileRef, mobileStyle] = useScallopStyle(ARCH_COUNT_MOBILE, 'top', FOOTER_ARCH_FILL_COLOR)
  const [desktopRef, desktopStyle] = useScallopStyle(ARCH_COUNT_DESKTOP, 'top', FOOTER_ARCH_FILL_COLOR)

  return (
    <>
      <div
        ref={mobileRef}
        className="absolute left-0 right-0 z-10 pointer-events-none md:hidden"
        style={mobileStyle}
        aria-hidden="true"
      />
      <div
        ref={desktopRef}
        className="absolute left-0 right-0 z-10 pointer-events-none hidden md:block"
        style={desktopStyle}
        aria-hidden="true"
      />
    </>
  )
}

function RippleBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        width: 640,
        height: 640,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '9999px',
        background: `radial-gradient(circle at center,
          transparent 0% 22%,
          rgba(86,66,60,0.10) 23% 29%,
          transparent 30% 42%,
          rgba(86,66,60,0.14) 43% 50%,
          transparent 51% 62%,
          rgba(86,66,60,0.10) 63% 70%,
          transparent 71% 82%,
          rgba(86,66,60,0.06) 83% 88%,
          transparent 89% 100%)`,
        filter: 'blur(4px)',
      }}
    />
  )
}

export { RippleBackdrop }