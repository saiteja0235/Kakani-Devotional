import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import {
  hoverLift,
  imageRevealVariants,
  layoutTransition,
  motionEase,
  revealVariants,
  staggerVariants,
  textRevealVariants,
} from '../../lib/motion'

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: .42, ease: motionEase }}>
      {children}
    </MotionConfig>
  )
}

type MotionBlockProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  once?: boolean
}

export function RevealSection({
  children,
  className = '',
  delay = 0,
  amount = .18,
  once = true,
  ...props
}: MotionBlockProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      {...props}
      className={className}
      variants={reduced ? undefined : revealVariants}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function TextReveal({ children, className = '', as = 'div' }: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  const reduced = useReducedMotion()
  const Component = motion.create(as)
  return (
    <span className={`text-reveal ${className}`}>
      <Component
        variants={reduced ? undefined : textRevealVariants}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: .7 }}
      >
        {children}
      </Component>
    </span>
  )
}

export function ImageReveal({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={`image-reveal ${className}`}
      variants={reduced ? undefined : imageRevealVariants}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, amount: .16 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerGroup({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : staggerVariants}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, amount: .12 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} variants={reduced ? undefined : revealVariants}>{children}</motion.div>
}

export function HoverSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={`hover-surface ${className}`}
      variants={reduced ? undefined : hoverLift}
      initial="rest"
      whileHover={reduced ? undefined : 'hover'}
      whileFocus={reduced ? undefined : 'hover'}
    >
      {children}
    </motion.div>
  )
}

export function LayoutPresence({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="popLayout" initial={false}>{children}</AnimatePresence>
}

export const motionLayoutProps = {
  layout: true,
  transition: { layout: layoutTransition },
} as const
