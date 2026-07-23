import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, MessageCircle, Phone, X } from 'lucide-react'
import { KeyboardEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { articles, contact, destinations, packages } from '../../data/content'
import { motionEase } from '../../lib/motion'

type CatalogueItem = { name: string; to: string; meta: string }
type Catalogue = { label: string; summary: string; items: CatalogueItem[]; image: string }

const links = [
  ['Home', '/'],
  ['Destinations', '/destinations'],
  ['Tour Packages', '/packages'],
  ['Pilgrimage Guide', '/pilgrimage-guide'],
  ['Blog', '/blog'],
  ['About Us', '/about'],
  ['Contact Us', '/contact'],
] as const

const catalogues: Record<string, Catalogue> = {
  '/destinations': {
    label: 'Sacred places',
    summary: 'Explore temple towns, Himalayan shrines and living traditions across India.',
    items: destinations.slice(0, 6).map(item => ({ name: item.name, to: `/destinations/${item.slug}`, meta: item.region })),
    image: destinations[0].image,
  },
  '/packages': {
    label: 'Curated journeys',
    summary: 'Discover considered pilgrimage routes shaped around pace, comfort and purpose.',
    items: packages.slice(0, 6).map(item => ({ name: item.name, to: `/packages/${item.slug}`, meta: item.duration })),
    image: packages[0].image,
  },
  '/pilgrimage-guide': {
    label: 'Plan with clarity',
    summary: 'Practical knowledge for preparing, travelling and visiting sacred places respectfully.',
    items: ['Temple Etiquette', 'Packing Guides', 'Darshan Information', 'Best Time to Visit', 'Festival Calendar']
      .map(name => ({ name, to: '/pilgrimage-guide', meta: 'Practical guide' })),
    image: '/images/char-dham.png',
  },
  '/blog': {
    label: 'From the journal',
    summary: 'Temple stories, travel guidance and reflections from sacred India.',
    items: articles.slice(0, 5).map(item => ({ name: item.title, to: '/blog', meta: item.readTime })),
    image: '/images/golden-temple-hero.png',
  },
}

const isRouteActive = (pathname: string, route: string) =>
  route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(`${route}/`)

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const openTimer = useRef<number | null>(null)
  const closeTimer = useRef<number | null>(null)
  const lastScroll = useRef(0)

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current)
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }

  const scheduleOpen = (route: string) => {
    clearTimers()
    openTimer.current = window.setTimeout(() => setActiveMega(route), 140)
  }

  const scheduleClose = () => {
    clearTimers()
    closeTimer.current = window.setTimeout(() => setActiveMega(null), 190)
  }

  const openImmediately = (route: string) => {
    clearTimers()
    setActiveMega(route)
  }

  const closeDrawer = () => setDrawerOpen(false)

  useEffect(() => {
    setDrawerOpen(false)
    setActiveMega(null)
    setMobileSection(null)
  }, [location.pathname])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const current = window.scrollY
        setCompact(current > 32)
        setHidden(current > lastScroll.current && current > 180)
        lastScroll.current = current
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (activeMega && !navRef.current?.contains(event.target as Node)) setActiveMega(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [activeMega])

  useEffect(() => {
    if (!drawerOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const trapFocus = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer()
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])'),
      ).filter(element => element.offsetParent !== null)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', trapFocus)
      menuButtonRef.current?.focus()
    }
  }, [drawerOpen])

  useEffect(() => {
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || !activeMega) return
      const route = activeMega
      setActiveMega(null)
      triggerRefs.current[route]?.focus()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [activeMega])

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>, route: string) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openImmediately(route)
      window.requestAnimationFrame(() => {
        navRef.current?.querySelector<HTMLAnchorElement>(`#mega-${route.slice(1)} a`)?.focus()
      })
    }
  }

  const handleEntryBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose()
  }

  const stopDrawerPropagation = (event: ReactPointerEvent) => event.stopPropagation()

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header ref={navRef} className={`site-nav nav-v2 ${compact ? 'compact' : ''} ${hidden ? 'nav-hidden' : ''}`}>
        <Link className="brand" to="/" aria-label="Kakani Holidays home">
          <img src="/images/kakani-logo-transparent.png" alt="Kakani Holidays Pvt. Ltd." />
        </Link>

        <nav aria-label="Primary navigation">
          {links.map(([label, route]) => {
            const catalogue = catalogues[route]
            const active = isRouteActive(location.pathname, route)
            return (
              <div
                className="nav-entry"
                onMouseEnter={() => catalogue && scheduleOpen(route)}
                onMouseLeave={() => catalogue && scheduleClose()}
                onBlur={handleEntryBlur}
                key={route}
              >
                {catalogue ? (
                  <button
                    ref={element => { triggerRefs.current[route] = element }}
                    className={active ? 'active' : ''}
                    onPointerDown={event => {
                      if (event.pointerType === 'mouse') event.preventDefault()
                    }}
                    onClick={() => activeMega === route ? setActiveMega(null) : openImmediately(route)}
                    onFocus={() => openImmediately(route)}
                    onKeyDown={event => handleTriggerKeyDown(event, route)}
                    aria-expanded={activeMega === route}
                    aria-controls={`mega-${route.slice(1)}`}
                    aria-haspopup="true"
                  >
                    {label}<ChevronDown aria-hidden="true" />
                  </button>
                ) : (
                  <NavLink to={route} end={route === '/'}>{label}</NavLink>
                )}

                <AnimatePresence>
                  {catalogue && activeMega === route && (
                    <motion.div
                      id={`mega-${route.slice(1)}`}
                      className="mega mega-v2"
                      initial={{ opacity: 0, y: 10, scale: .99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 7, scale: .99 }}
                      transition={{ duration: .28, ease: motionEase }}
                      onMouseEnter={() => openImmediately(route)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="mega-v2__intro">
                        <p>{catalogue.label}</p>
                        <h2>{label}</h2>
                        <span>{catalogue.summary}</span>
                        <Link to={route}>View all <ArrowRight /></Link>
                      </div>
                      <div className="mega-v2__links">
                        {catalogue.items.map(item => (
                          <Link to={item.to} key={item.name}>
                            <span>{item.name}</span>
                            <small>{item.meta}</small>
                            <ArrowRight />
                          </Link>
                        ))}
                      </div>
                      <figure>
                        <img src={catalogue.image} alt="" />
                        <figcaption>Explore with Kakani Holidays</figcaption>
                      </figure>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        <a className="nav-phone" href={contact.tel}><Phone />{contact.phone}</a>
        <button
          ref={menuButtonRef}
          className="menu-button menu-button-v2"
          onClick={() => setDrawerOpen(true)}
          aria-expanded={drawerOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation"
        >
          <span /><span /><span />
        </button>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="mobile-drawer mobile-drawer-v2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={closeDrawer}
          >
            <motion.div
              ref={drawerRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: .46, ease: motionEase }}
              onPointerDown={stopDrawerPropagation}
            >
              <header>
                <Link className="brand" to="/">
                  <img src="/images/kakani-logo-transparent.png" alt="Kakani Holidays" />
                </Link>
                <button ref={closeButtonRef} onClick={closeDrawer} aria-label="Close navigation"><X /></button>
              </header>

              <nav aria-label="Mobile navigation">
                {links.map(([label, route], index) => {
                  const catalogue = catalogues[route]
                  const expanded = mobileSection === route
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * .035 }}
                      key={route}
                    >
                      {catalogue ? (
                        <>
                          <button
                            className={isRouteActive(location.pathname, route) ? 'active' : ''}
                            onClick={() => setMobileSection(expanded ? null : route)}
                            aria-expanded={expanded}
                            aria-controls={`mobile-${route.slice(1)}`}
                          >
                            {label}<ChevronDown />
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.section
                                id={`mobile-${route.slice(1)}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                              >
                                {catalogue.items.map(item => (
                                  <Link to={item.to} key={item.name}>{item.name}<small>{item.meta}</small></Link>
                                ))}
                                <Link className="mobile-view-all" to={route}>View all {label}<ArrowRight /></Link>
                              </motion.section>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <NavLink to={route} end={route === '/'}>{label}</NavLink>
                      )}
                    </motion.div>
                  )
                })}
              </nav>

              <footer>
                <a href={contact.tel}><Phone />Call</a>
                <a href={contact.whatsapp}><MessageCircle />WhatsApp</a>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
