import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Clock, HelpCircle, MapPin, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contact, destinations, packages } from '../data/content'
import { PageHero, SectionHead } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { CinematicImage } from '../components/ui/CinematicImage'
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
  const related = destinations.filter(destination => stops.some(stop =>
    destination.name.toLowerCase().includes(stop.toLowerCase()) ||
    stop.toLowerCase().includes(destination.name.split(' ')[0].toLowerCase()),
  ))
  return (
    <>
      <PageHero eyebrow={pkg.collection} title={pkg.name} copy={pkg.route} image={pkg.image} />
      <section className="package-highlights container section-space">
        <SectionHead eyebrow="Package highlights" title="The journey at a glance" />
        <div>
          <article><Clock /><span>Duration</span><strong>{pkg.duration}</strong></article>
          <article><MapPin /><span>Route</span><strong>{pkg.route}</strong></article>
          <article><span>Starting from</span><strong>₹{pkg.price}</strong><small>Final pricing depends on selected travel details.</small></article>
        </div>
      </section>
      <section className="detail-layout package-detail-new container">
        <div>
          <SectionHead eyebrow="Complete itinerary" title="A considered pilgrimage route" />
          {stops.map((stop, index) => (
            <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={stop}>
              <span>Day {index + 1}</span><h3>{stop}</h3>
              <p>A dedicated stage within the published {pkg.name} route.</p>
            </motion.article>
          ))}
        </div>
        <aside className="booking-summary">
          <p>Starting from</p><strong>₹{pkg.price}</strong>
          <span>Final pricing depends on dates, departure city, occupancy and selected stays.</span>
          <Button href={contact.whatsapp} icon={false}>Book now on WhatsApp</Button>
          <Button to="/contact" variant="ghost" icon={false}>Request exact proposal</Button>
        </aside>
      </section>
      <section className="package-terms container section-space">
        <SectionHead eyebrow="Proposal details" title="Clear information before you travel" />
        <div>
          <article><Check /><h3>Inclusions</h3><p>Accommodation, meals, transport and assistance are confirmed in your exact proposal.</p></article>
          <article><X /><h3>Exclusions</h3><p>Any service not confirmed in the final proposal should be treated as excluded.</p></article>
          <article><HelpCircle /><h3>Frequently asked</h3><p>Dates, departure city, occupancy and selected stays determine the final plan and price.</p></article>
        </div>
      </section>
      {related.length > 0 && <section className="related-journeys container section-space">
        <SectionHead eyebrow="Related destinations" title="Know the places along your route" />
        <div>{related.map(destination => <Link to={`/destinations/${destination.slug}`} key={destination.slug}><CinematicImage src={destination.image} alt={destination.name} /><span>{destination.state}</span><h3>{destination.name}</h3></Link>)}</div>
      </section>}
      <section className="detail-cta"><div className="container"><div><p>Speak with a pilgrimage expert</p><h2>Begin your {pkg.name}.</h2></div><Button href={contact.whatsapp} size="lg">Book now</Button></div></section>
    </>
  )
}
