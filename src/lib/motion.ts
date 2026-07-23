import type { Transition, Variants } from 'framer-motion'

export const motionEase = [0.22, 1, 0.36, 1] as const

export const motionDuration = {
  instant: 0.18,
  fast: 0.26,
  normal: 0.42,
  reveal: 0.65,
  hero: 1.05,
} as const

export const calmTransition: Transition = {
  duration: motionDuration.normal,
  ease: motionEase,
}

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: motionDuration.reveal, ease: motionEase } },
}

export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 1.035 },
  visible: { opacity: 1, scale: 1, transition: { duration: motionDuration.hero, ease: motionEase } },
}

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: motionDuration.normal, ease: motionEase } },
  exit: { opacity: 0, transition: { duration: motionDuration.fast, ease: motionEase } },
}
