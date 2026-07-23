import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock, Compass, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/content'
import { PageHero, SectionHead } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { CinematicImage } from '../components/ui/CinematicImage'
import { contact, packages } from '../data/content'
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
  const matched = packages.filter(item => item.route.toLowerCase().includes(destination.name.split(' ')[0].toLowerCase())).slice(0, 3)
  const related = matched.length ? matched : packages.filter(item => item.collection.includes(destination.region.split(' ')[0])).slice(0, 3)
  return (
    <>
      <PageHero eyebrow={destination.region} title={destination.name} copy={destination.description} image={destination.image} />
      <section className="destination-overview container section-space">
        <SectionHead eyebrow="Temple overview" title={`A considered journey through ${destination.name}.`} />
        <p>{destination.description}</p>
        <dl>
          <div><MapPin /><dt>State</dt><dd>{destination.state}</dd></div>
          <div><CalendarDays /><dt>Best time to visit</dt><dd>{destination.season}</dd></div>
          <div><Clock /><dt>Suggested duration</dt><dd>{destination.duration}</dd></div>
        </dl>
      </section>
      <section className="detail-gallery container">
        <SectionHead eyebrow="Gallery" title="A glimpse of the sacred route" />
        {[destination.image, ...related.map(item => item.image)].slice(0, 3).map((image, index) => (
          <CinematicImage key={`${image}-${index}`} src={image} alt={`${destination.name} journey view ${index + 1}`} parallax={index === 0} />
        ))}
      </section>
      <section className="detail-layout container">
        <div>
          <SectionHead eyebrow="Must-visit places" title="What the journey holds" />
          {destination.places.map((place, index) => (
            <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={place}>
              <span>0{index + 1}</span><h3>{place}</h3>
              <p>Included in the suggested {destination.name} sacred route.</p>
            </motion.article>
          ))}
        </div>
        <aside>
          <SectionHead eyebrow="Travel tips" title="Plan with clarity" />
          <p className="detail-note"><CalendarDays />Travel during {destination.season}.</p>
          <p className="detail-note"><Compass />Allow {destination.duration} for the suggested route.</p>
          <h3>Suggested itinerary</h3>
          {destination.itinerary.map((item, index) => <div key={item}><b>Day {index + 1}</b><p>{item}</p></div>)}
        </aside>
      </section>
      {related.length > 0 && <section className="related-journeys container section-space">
        <SectionHead eyebrow="Related packages" title="Continue planning your pilgrimage" />
        <div>{related.map(item => <Link to={`/packages/${item.slug}`} key={item.slug}><CinematicImage src={item.image} alt={item.name} /><span>{item.duration}</span><h3>{item.name}</h3></Link>)}</div>
      </section>}
      <section className="detail-cta"><div className="container"><div><p>Plan with Kakani Holidays</p><h2>Shape your {destination.name} journey.</h2></div><Button href={contact.whatsapp} size="lg">Talk on WhatsApp</Button></div></section>
    </>
  )
}
