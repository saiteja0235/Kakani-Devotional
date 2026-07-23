import { BriefcaseBusiness, Camera, Mail, MapPin, MessageCircle, Phone, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contact, socials } from '../../data/content'

const socialLinks = [
  { label: 'WhatsApp', href: contact.whatsapp, Icon: MessageCircle, brand: 'whatsapp' },
  { label: 'Instagram', href: socials.instagram, Icon: Camera, brand: 'instagram' },
  { label: 'LinkedIn', href: socials.linkedin, Icon: BriefcaseBusiness, brand: 'linkedin' },
  { label: 'YouTube', href: socials.youtube, Icon: Play, brand: 'youtube' },
] as const

export function Footer() {
  return (
    <footer className="premium-footer">
      <div className="container premium-footer__compact">
        <div className="premium-footer__brand">
          <Link to="/" aria-label="Kakani Holidays home">
            <img src="/images/kakani-logo-transparent.png" alt="Kakani Holidays Pvt. Ltd." />
          </Link>
          <p>Thoughtfully planned devotional journeys across sacred India, shaped around comfort, clarity and purpose.</p>
        </div>

        <address className="premium-footer__contact">
          <a href={contact.tel}><Phone aria-hidden="true" />{contact.phone}</a>
          <a href={`mailto:${contact.email}`}><Mail aria-hidden="true" />{contact.email}</a>
          <span><MapPin aria-hidden="true" />Hyderabad, Telangana</span>
        </address>

        <div className="premium-footer__socials" aria-label="Kakani Holidays social media">
          {socialLinks.map(({ label, href, Icon, brand }) => (
            <a
              className={`social-${brand}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Kakani Holidays on ${label}`}
              title={label}
              key={label}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
