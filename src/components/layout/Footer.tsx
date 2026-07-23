import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { contact, destinations, packages, socials } from '../../data/content'
import { LiveRegion } from '../accessibility/Utilities'

type NewsletterState = 'idle' | 'loading' | 'error'

const navigation = [
  ['Home', '/'],
  ['Destinations', '/destinations'],
  ['Tour Packages', '/packages'],
  ['Pilgrimage Guide', '/pilgrimage-guide'],
  ['Journal', '/blog'],
  ['About', '/about'],
  ['Contact', '/contact'],
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<NewsletterState>('idle')
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity()) {
      setMessage('Enter a valid email address.')
      setState('error')
      return
    }

    setState('loading')
    setMessage('')
    window.setTimeout(() => {
      setState('error')
      setMessage('Newsletter delivery is awaiting a business email integration.')
    }, 500)
  }

  return (
    <footer className="premium-footer">
      <div className="container premium-footer__lead">
        <div>
          <p>Continue the conversation</p>
          <h2>Journey notes from sacred India.</h2>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="footer-email">Email address</label>
          <div>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              aria-describedby="newsletter-status"
            />
            <button disabled={state === 'loading'} aria-label="Subscribe to journey notes">
              {state === 'loading' ? '…' : <ArrowRight />}
            </button>
          </div>
          <p id="newsletter-status" className={state === 'error' ? 'is-error' : ''}>{message}</p>
          <LiveRegion>{message}</LiveRegion>
        </form>
      </div>

      <div className="container premium-footer__grid">
        <div className="premium-footer__brand">
          <Link to="/" aria-label="Kakani Holidays home">
            <img src="/images/kakani-logo-transparent.png" alt="Kakani Holidays Pvt. Ltd." />
          </Link>
          <p>Thoughtfully planned devotional journeys across sacred India, shaped around comfort, clarity and purpose.</p>
          <div className="premium-footer__socials">
            {Object.entries(socials).map(([name, url]) => (
              <a href={url} target="_blank" rel="noreferrer" aria-label={`Kakani Holidays on ${name}`} key={name}>
                {name.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3>Explore</h3>
          {navigation.map(([label, to]) => <Link to={to} key={label}>{label}</Link>)}
        </nav>

        <div>
          <h3>Sacred places</h3>
          {destinations.slice(0, 6).map(destination => (
            <Link to={`/destinations/${destination.slug}`} key={destination.slug}>{destination.name}</Link>
          ))}
        </div>

        <div>
          <h3>Journeys</h3>
          {packages.slice(0, 5).map(pilgrimagePackage => (
            <Link to={`/packages/${pilgrimagePackage.slug}`} key={pilgrimagePackage.slug}>{pilgrimagePackage.name}</Link>
          ))}
        </div>

        <address>
          <h3>Contact</h3>
          <a href={contact.tel}><Phone />{contact.phone}</a>
          <a href={`mailto:${contact.email}`}><Mail />{contact.email}</a>
          <span><MapPin />Hyderabad, Telangana</span>
          <a href={contact.whatsapp}><MessageCircle />WhatsApp</a>
        </address>
      </div>

      <div className="container premium-footer__bottom">
        <span>© 2026 Kakani Holidays Pvt. Ltd.</span>
        <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
      </div>
    </footer>
  )
}
