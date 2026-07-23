import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Compass,
  HeartHandshake,
  Hotel,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlassPanel } from '../components/ui/Glass'
import { Button } from '../components/ui/Button'
import { CinematicImage } from '../components/ui/CinematicImage'
import { Reveal, SectionHead } from '../components/ui/Primitives'
import { articles, contact, destinations, packages, testimonials } from '../data/content'
import { imageRevealVariants, motionEase, revealVariants, staggerVariants } from '../lib/motion'

const services = [
  ['Expert Guidance', 'Experienced team with spiritual knowledge', Compass],
  ['Handpicked Hotels', 'Comfortable stays near sacred destinations', Hotel],
  ['Hassle-Free Travel', 'Well-planned itineraries and smooth operations', ShieldCheck],
  ['Personalized Service', 'Customized packages for every devotee', HeartHandshake],
] as const

export default function HomePage() {
  const [story, setStory] = useState(0)
  const [storiesPaused, setStoriesPaused] = useState(false)
  const featured = destinations[0]
  const collections = Array.from(new Set(packages.map(item => item.collection)))

  useEffect(() => {
    if (storiesPaused) return
    const timer = window.setInterval(() => setStory(current => (current + 1) % testimonials.length), 6500)
    return () => window.clearInterval(timer)
  }, [storiesPaused])

  return (
    <>
      <section className="home-cinematic" aria-labelledby="home-title">
        <motion.img
          initial={{ scale: 1.045 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.25, ease: motionEase }}
          src="/images/kakani-home-hero.png"
          alt="South Indian temple complex illuminated by morning light"
        />
        <div className="home-cinematic__shade" />
        <div className="container home-cinematic__content">
          <motion.p variants={revealVariants} initial="hidden" animate="visible">
            Curated pilgrimages across sacred India
          </motion.p>
          <motion.h1 id="home-title" variants={revealVariants} initial="hidden" animate="visible">
            Journeys of Faith,
            <em>Crafted With Grace.</em>
          </motion.h1>
          <motion.span variants={revealVariants} initial="hidden" animate="visible">
            Thoughtful routes, trusted guidance and serene stays for journeys that remain with you long after you return.
          </motion.span>
          <motion.div className="home-actions" variants={staggerVariants} initial="hidden" animate="visible">
            <Button to="/packages" size="lg">Explore pilgrimages</Button>
            <Button href={contact.whatsapp} variant="ghost" size="lg">Plan with an expert</Button>
          </motion.div>
        </div>
        <GlassPanel className="home-cinematic__note" tone="dark">
          <span>The Kakani approach</span>
          <p>Human guidance from first conversation to final darshan.</p>
        </GlassPanel>
        <a className="home-cinematic__scroll" href="#philosophy">
          <span aria-hidden="true" />
          Discover
        </a>
      </section>

      <section id="philosophy" className="home-philosophy-v2 container section-space">
        <SectionHead eyebrow="The Kakani Way" title="Travel Inward. We Care for Everything Around You." />
        <Reveal className="home-philosophy-v2__copy">
          <p>
            Kakani Holidays brings quiet precision to spiritual travel. From first conversation to final darshan,
            every route is shaped around comfort, clarity and the purpose of your journey.
          </p>
          <Button to="/about" variant="ghost">Our story</Button>
        </Reveal>
        <motion.figure
          variants={imageRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CinematicImage src="/images/hindu-temple-hero.png" alt="Temple architecture in warm evening light" parallax />
          <figcaption>Thoughtful planning. Quietly present.</figcaption>
        </motion.figure>
      </section>

      <section className="home-featured-v2 container section-space" aria-labelledby="featured-title">
        <motion.div
          className="home-featured-v2__image"
          variants={imageRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <img loading="lazy" src={featured.image} alt={`${featured.name} temple in ${featured.state}`} />
        </motion.div>
        <GlassPanel className="home-featured-v2__panel" tone="light">
          <p>Featured sacred journey · {featured.state}</p>
          <h2 id="featured-title">{featured.name}</h2>
          <span>{featured.description}</span>
          <dl>
            <div><CalendarDays /><dt>Best season</dt><dd>{featured.season}</dd></div>
            <div><Clock /><dt>Duration</dt><dd>{featured.duration}</dd></div>
            <div><Compass /><dt>Region</dt><dd>{featured.region}</dd></div>
          </dl>
          <Button to={`/destinations/${featured.slug}`}>Explore sacred journey</Button>
        </GlassPanel>
      </section>

      <section className="home-discovery-v2 section-space">
        <div className="container home-section-intro">
          <SectionHead
            eyebrow="Sacred India"
            title="Places with a story to tell."
            copy="Explore living traditions, ancient temples and journeys shaped across generations."
          />
          <Button to="/destinations" variant="ghost">View all destinations</Button>
        </div>
        <div className="container home-discovery-v2__edit">
          {destinations.slice(0, 3).map((destination, index) => (
            <Reveal className={`home-place home-place--${index + 1}`} delay={index * 0.08} key={destination.slug}>
              <Link to={`/destinations/${destination.slug}`}>
                <img loading="lazy" src={destination.image} alt={`${destination.name}, ${destination.state}`} />
                <div>
                  <span>{destination.region}</span>
                  <h3>{destination.name}</h3>
                  <p>{destination.duration} · {destination.season}</p>
                  <ArrowRight aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="home-discovery-v2__rail" aria-label="More sacred destinations">
          {destinations.slice(3).map(destination => (
            <Link to={`/destinations/${destination.slug}`} key={destination.slug}>
              <img loading="lazy" src={destination.image} alt={`${destination.name} temple`} />
              <small>{destination.state}</small>
              <h3>{destination.name}</h3>
              <span>{destination.duration}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-collections-v2 container section-space">
        <SectionHead
          eyebrow="Curated pilgrimage collections"
          title="Choose the spirit of your journey."
          copy="Begin with a route that reflects the places, pace and traditions meaningful to you."
        />
        <motion.div variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          {collections.map((collection, index) => {
            const representative = packages.find(item => item.collection === collection)!
            return (
              <motion.div variants={revealVariants} key={collection}>
                <Link to={`/packages/${representative.slug}`}>
                  <span>0{index + 1}</span>
                  <h3>{collection}</h3>
                  <p>{representative.route}</p>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <section className="home-why-v2 section-space">
        <img loading="lazy" src="/images/golden-temple-hero.png" alt="" />
        <div className="container home-why-v2__layout">
          <SectionHead eyebrow="Why Kakani" title="Present at every meaningful step." />
          <motion.div variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {services.map(([title, copy, Icon], index) => (
              <motion.article variants={revealVariants} key={title}>
                <span>0{index + 1}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="home-stories-v2 container section-space"
        onMouseEnter={() => setStoriesPaused(true)}
        onMouseLeave={() => setStoriesPaused(false)}
        onFocusCapture={() => setStoriesPaused(true)}
        onBlurCapture={() => setStoriesPaused(false)}
      >
        <div>
          <SectionHead eyebrow="Guest stories" title="Remembered for how it felt." />
          <div className="home-stories-v2__controls">
            <button onClick={() => setStory((story + testimonials.length - 1) % testimonials.length)} aria-label="Previous story">
              <ArrowLeft />
            </button>
            <span>{story + 1} / {testimonials.length}</span>
            <button onClick={() => setStory((story + 1) % testimonials.length)} aria-label="Next story">
              <ArrowRight />
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={story}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.42, ease: motionEase }}
            aria-live="polite"
          >
            <p>“{testimonials[story].quote}”</p>
            <footer><b>{testimonials[story].name}</b><span>{testimonials[story].type}</span></footer>
          </motion.blockquote>
        </AnimatePresence>
      </section>

      <section className="home-journal-v2 container section-space">
        <div className="home-journal-v2__title">
          <SectionHead eyebrow="Pilgrimage journal" title="Knowledge for the road." />
          <Button to="/blog" variant="ghost">View all stories</Button>
        </div>
        <Reveal className="home-journal-v2__lead">
          <Link to="/blog">
            <img loading="lazy" src={articles[0].image} alt={articles[0].title} />
            <div>
              <span>{articles[0].category} · {articles[0].readTime}</span>
              <h3>{articles[0].title}</h3>
              <p>{articles[0].excerpt}</p>
            </div>
          </Link>
        </Reveal>
        <div className="home-journal-v2__list">
          {articles.slice(1, 4).map((article, index) => (
            <Link to="/blog" key={article.slug}>
              <b>0{index + 1}</b>
              <img loading="lazy" src={article.image} alt="" />
              <span><small>{article.category} · {article.readTime}</small>{article.title}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-consult-v2">
        <img loading="lazy" src="/images/rameswaram.png" alt="Temple corridor illuminated at sunset" />
        <div className="home-consult-v2__shade" />
        <Reveal className="container home-consult-v2__content">
          <p>A journey shaped around your faith and pace</p>
          <h2>Begin Your Sacred Journey</h2>
          <span>Speak with a Kakani pilgrimage expert about destinations, comfort and the right time to travel.</span>
          <div>
            <Button href={contact.whatsapp} size="lg">Plan my journey</Button>
            <Button href={contact.tel} variant="ghost" size="lg">Call {contact.phone}</Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
