import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { pageTransition } from '../../lib/motion'
import { ScrollManager } from '../routing/ScrollManager'
import { Footer } from './Footer'
import { Navigation } from './Navigation'

export function SharedLayout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <ScrollManager />
      <Navigation />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          tabIndex={-1}
          {...(reduceMotion ? {} : pageTransition)}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
