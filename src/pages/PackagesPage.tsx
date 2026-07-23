import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { packages } from '../data/content'
import { PageHero, SectionHead } from '../components/ui/Primitives'
import { layoutTransition, revealVariants } from '../lib/motion'

export default function PackagesPage() {
  const [collection, setCollection] = useState('All')
  const reduced = useReducedMotion()
  const shown = packages.filter(item => collection === 'All' || item.collection === collection)

  return (
    <>
      <PageHero
        eyebrow="The pilgrimage collection"
        title="Journeys designed with care."
        copy="Routes, stays and travel assistance brought together around the purpose of your pilgrimage."
        image="/images/kashi-yatra.png"
      />
      <section className="page-section container">
        <div className="filter-row">
          {['All', ...new Set(packages.map(item => item.collection))].map(option => (
            <button className={collection === option ? 'active' : ''} onClick={() => setCollection(option)} key={option}>
              {option}
            </button>
          ))}
        </div>
        <motion.div className="package-list" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((item, index) => (
              <motion.div
                key={item.slug}
                layout
                variants={reduced ? undefined : revealVariants}
                initial={reduced ? false : 'hidden'}
                animate="visible"
                exit={reduced ? undefined : { opacity: 0, scale: .98 }}
                transition={{ ...layoutTransition, delay: reduced ? 0 : (index % 3) * .04 }}
                whileHover={reduced ? undefined : { y: -5 }}
              >
                <Link to={`/packages/${item.slug}`}>
                  <img loading="lazy" src={item.image} alt={item.name} />
                  <div>
                    <small>{item.collection}</small>
                    <h2>{item.name}</h2>
                    <p><MapPin />{item.route}</p>
                    <span><Clock />{item.duration}</span>
                    <footer><b>From ₹{item.price}</b><em>View itinerary</em></footer>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  )
}

export function PackageDetailPage({ pkg }: { pkg: (typeof packages)[number] }) {
  const stops = pkg.route.split(' · ')
  return (
    <>
      <PageHero eyebrow={pkg.collection} title={pkg.name} copy={pkg.route} image={pkg.image} />
      <section className="detail-layout package-detail-new container">
        <div>
          <SectionHead eyebrow={pkg.duration} title="A considered pilgrimage route" />
          {stops.map((stop, index) => (
            <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={stop}>
              <span>0{index + 1}</span><h3>{stop}</h3>
              <p>Travel coordination and time for the sacred experience are planned at a comfortable pace.</p>
            </motion.article>
          ))}
        </div>
        <aside className="booking-summary">
          <p>Starting from</p><strong>₹{pkg.price}</strong>
          <span>Final pricing depends on dates, departure city, occupancy and selected stays.</span>
          <Link to="/contact">Request exact proposal</Link>
        </aside>
      </section>
    </>
  )
}
