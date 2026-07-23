import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/content'
import { PageHero, SectionHead } from '../components/ui/Primitives'
import { layoutTransition, revealVariants } from '../lib/motion'

export default function DestinationsPage() {
  const [region, setRegion] = useState('All')
  const reduced = useReducedMotion()
  const shown = destinations.filter(destination => region === 'All' || destination.region === region)

  return (
    <>
      <PageHero
        eyebrow="Sacred geography"
        title="Journeys across living traditions."
        copy="Discover temples, landscapes and sacred cities with practical information for a considered pilgrimage."
        image="/images/dwarka-somnath.png"
      />
      <section className="page-section container">
        <div className="filter-row">
          {['All', ...new Set(destinations.map(destination => destination.region))].map(option => (
            <button className={region === option ? 'active' : ''} onClick={() => setRegion(option)} key={option}>
              {option}
            </button>
          ))}
        </div>
        <motion.div className="destination-list" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((destination, index) => (
              <motion.div
                className="destination-row"
                key={destination.slug}
                layout
                variants={reduced ? undefined : revealVariants}
                initial={reduced ? false : 'hidden'}
                animate="visible"
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                transition={{ ...layoutTransition, delay: reduced ? 0 : (index % 3) * .04 }}
              >
                <img loading="lazy" src={destination.image} alt={`${destination.name}, ${destination.state}`} />
                <div>
                  <span>0{index + 1} · {destination.region}</span>
                  <h2>{destination.name}</h2>
                  <p>{destination.description}</p>
                  <ul>
                    <li><MapPin />{destination.state}</li>
                    <li><CalendarDays />{destination.season}</li>
                    <li><Clock />{destination.duration}</li>
                  </ul>
                  <Link to={`/destinations/${destination.slug}`}>Explore journey</Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  )
}

export function DestinationDetailPage({ destination }: { destination: (typeof destinations)[number] }) {
  return (
    <>
      <PageHero eyebrow={destination.region} title={destination.name} copy={destination.description} image={destination.image} />
      <section className="detail-layout container">
        <div>
          <SectionHead eyebrow="Sacred places" title="What the journey holds" />
          {destination.places.map((place, index) => (
            <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={place}>
              <span>0{index + 1}</span><h3>{place}</h3>
              <p>A meaningful stop within this carefully considered pilgrimage route.</p>
            </motion.article>
          ))}
        </div>
        <aside>
          <SectionHead eyebrow={destination.duration} title="Suggested itinerary" />
          {destination.itinerary.map((item, index) => <div key={item}><b>Day {index + 1}</b><p>{item}</p></div>)}
        </aside>
      </section>
    </>
  )
}
