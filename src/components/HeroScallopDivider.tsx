// Taille des arches — R = rayon en px. Diamètre = 2×R.
// Ajuste ces deux valeurs si tu veux des arches plus grandes/petites.
import { useEffect, useRef, useState } from 'react'

const ARCH_COUNT_MOBILE = 4
const ARCH_COUNT_DESKTOP = 5
const GAP_RATIO = 0.25    // écart = 25% de la largeur de chaque arche — ajuste ici
const ARCH_OFFSET_PX = 30 // décale la rangée vers le bas (px) — augmente pour pousser plus loin

function useScallopStyle(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function update(width: number) {
      const tileWidth = width / count
      const gap = tileWidth * GAP_RATIO
      const radius = (tileWidth - gap) / 2

      setStyle({
        height: radius,
        backgroundImage: `radial-gradient(circle ${radius}px at 50% 100%, #fdf9f4 0, #fdf9f4 ${radius}px, transparent ${radius}px)`,
        backgroundSize: `${tileWidth}px ${radius}px`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom center',
        transform: `translateY(${ARCH_OFFSET_PX}px)`,
      })
    }

    update(el.offsetWidth)

    const observer = new ResizeObserver((entries) => {
      update(entries[0].contentRect.width)
    })
    observer.observe(el)

    return () => observer.disconnect()
  }, [count])

  return [ref, style] as const
}

export function HeroScallopDivider() {
  const [mobileRef, mobileStyle] = useScallopStyle(ARCH_COUNT_MOBILE)
  const [desktopRef, desktopStyle] = useScallopStyle(ARCH_COUNT_DESKTOP)

  return (
    <>
      <div
        ref={mobileRef}
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none md:hidden"
        style={mobileStyle}
        aria-hidden="true"
      />
      <div
        ref={desktopRef}
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none hidden md:block"
        style={desktopStyle}
        aria-hidden="true"
      />
    </>
  )
}
export function RippleBackdrop() {
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
          transparent 100% 100%)`,
        filter: 'blur(4px)',
      }}
    />
  )
}