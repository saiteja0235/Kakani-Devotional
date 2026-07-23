import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock, Compass, Headphones, Hotel, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { CinematicImage } from '../components/ui/CinematicImage'
import { contact, destinations, packages, testimonials } from '../data/content'
import { motionEase, revealVariants, staggerVariants } from '../lib/motion'

const promises = [
  ['Expert guidance', 'Spiritual and experienced', Compass],
  ['Handpicked stays', 'Comfort and clarity', Hotel],
  ['Thoughtful travel', 'Considered routes', ShieldCheck],
  ['24/7 assistance', 'We are with you', Headphones],
] as const

export default function HomePage() {
  return (
    <div className="reference-home">
      <section className="reference-hero">
        <CinematicImage src="/images/kakani-home-hero.png" alt="Sacred riverside temples glowing at sunset" eager parallax />
        <div className="reference-hero__shade" />
        <motion.div className="container reference-hero__copy" initial="hidden" animate="visible" variants={staggerVariants}>
          <motion.p variants={revealVariants}>Sacred journeys across India</motion.p>
          <motion.h1 variants={revealVariants}>Where Faith <em>Meets Journey</em></motion.h1>
          <motion.span variants={revealVariants}>Discover the sacred soul of India through divine destinations, timeless traditions and thoughtfully planned pilgrimage experiences.</motion.span>
          <motion.div variants={revealVariants}>
            <Button to="/packages" size="lg">Explore pilgrimages</Button>
            <Button href={contact.whatsapp} variant="ghost" size="lg">Plan my yatra</Button>
          </motion.div>
        </motion.div>
        <motion.aside className="reference-hero__darshan" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .6, duration: .6, ease: motionEase }}>
          <Sparkles /><span>Begin with clarity</span><p>Plan your devotional journey with the Kakani team.</p>
          <a href={contact.whatsapp}>Talk to an expert <ArrowRight /></a>
        </motion.aside>
      </section>

      <section className="reference-promises" aria-label="Kakani travel services">
        <div className="container">
          {promises.map(([title, copy, Icon], index) => (
            <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .5 }} transition={{ delay: index * .06 }} key={title}>
              <Icon /><h2>{title}</h2><p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="reference-circuits reference-light">
        <div className="container reference-title"><span /><p>Curated pilgrimage circuits</p><span /></div>
        <div className="reference-card-rail">
          {packages.slice(0, 8).map((item, index) => (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35 }} transition={{ delay: (index % 4) * .05 }} key={item.slug}>
              <Link to={`/packages/${item.slug}`}>
                <CinematicImage src={item.image} alt={item.name} />
                <div><small>{item.duration}</small><h2>{item.name}</h2><p>{item.route}</p><span>Explore <ArrowRight /></span></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="reference-destinations">
        <div className="container reference-title"><span /><p>Top spiritual destinations</p><span /></div>
        <div className="container reference-destination-grid">
          {destinations.slice(0, 6).map((destination, index) => (
            <motion.div initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: .3 }} transition={{ delay: index * .045 }} key={destination.slug}>
              <Link to={`/destinations/${destination.slug}`}>
                <CinematicImage src={destination.image} alt={`${destination.name}, ${destination.state}`} parallax />
                <div>
                  <h2>{destination.name}</h2><p>{destination.state}</p>
                  <dl><div><CalendarDays /><dt>Best season</dt><dd>{destination.season}</dd></div><div><Clock /><dt>Duration</dt><dd>{destination.duration}</dd></div></dl>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <Button to="/destinations" variant="ghost">View all destinations</Button>
      </section>

      <section className="reference-planning">
        <div className="container">
          <div className="reference-planning__image"><CinematicImage src="/images/golden-temple-hero.png" alt="Sacred temple illuminated in golden light" parallax /></div>
          <div className="reference-planning__copy">
            <p>The Kakani way</p><h2>Every detail around your darshan, considered.</h2>
            <span>From the first conversation to the final return, our approach is shaped around comfort, clarity and the spiritual purpose of your journey.</span>
            <Button to="/about">Discover our story</Button>
          </div>
          <div className="reference-planning__guide">
            {promises.map(([title, copy, Icon]) => <article key={title}><Icon /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="reference-counts">
        <div className="container">
          <article><strong>{destinations.length}</strong><span>Sacred destinations</span></article>
          <article><strong>{packages.length}</strong><span>Curated journeys</span></article>
          <article><strong>{new Set(destinations.map(item => item.region)).size}</strong><span>Regions across India</span></article>
          <article><strong>24/7</strong><span>Travel assistance</span></article>
        </div>
      </section>

      <section className="reference-stories">
        <div className="container reference-title"><span /><p>Guest reflections</p><span /></div>
        <div className="container reference-story-grid">
          {testimonials.map((story, index) => (
            <motion.blockquote initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .4 }} transition={{ delay: index * .08 }} key={story.name}>
              <p>“{story.quote}”</p><footer><b>{story.name}</b><span>{story.type}</span></footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section className="reference-gallery">
        <div className="container reference-title"><span /><p>Divine glimpses</p><span /></div>
        <div>
          {destinations.slice(0, 6).map(destination => <Link to={`/destinations/${destination.slug}`} aria-label={`Explore ${destination.name}`} key={destination.slug}><CinematicImage src={destination.image} alt={`${destination.name} sacred destination`} /></Link>)}
        </div>
      </section>
    </div>
  )
}
