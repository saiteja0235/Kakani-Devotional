import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

type CinematicImageProps = {
  src: string
  alt: string
  className?: string
  eager?: boolean
  parallax?: boolean
}

export function CinematicImage({ src, alt, className = '', eager = false, parallax = false }: CinematicImageProps) {
  const [loaded, setLoaded] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion || !parallax ? ['0%', '0%'] : ['-3%', '3%'])

  return (
    <div ref={frame} className={`cinematic-image ${loaded ? 'is-loaded' : ''} ${className}`.trim()}>
      <span className="cinematic-image__skeleton" aria-hidden="true" />
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        style={{ y }}
        initial={reducedMotion ? false : { opacity: 0, scale: 1.035 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: .72, ease: [.22, 1, .36, 1] }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
