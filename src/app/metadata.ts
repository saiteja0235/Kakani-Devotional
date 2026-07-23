import { destinations, packages } from '../data/content'

export type PageMetadata = {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}

const defaultMetadata: PageMetadata = {
  title: 'Kakani Holidays | Devotional Journeys',
  description: 'Thoughtfully planned pilgrimage journeys across sacred India.',
  image: '/images/kakani-home-hero.png',
  type: 'website',
}

const pages: Record<string, PageMetadata> = {
  '/': defaultMetadata,
  '/destinations': {
    title: 'Sacred Destinations | Kakani Holidays',
    description: 'Explore pilgrimage destinations and temple journeys across India.',
    image: '/images/dwarka-somnath.png',
  },
  '/packages': {
    title: 'Pilgrimage Packages | Kakani Holidays',
    description: 'Browse curated devotional travel routes from Kakani Holidays.',
    image: '/images/kashi-yatra.png',
  },
  '/pilgrimage-guide': {
    title: 'Pilgrimage Guide | Kakani Holidays',
    description: 'Practical guidance for comfortable and meaningful temple journeys.',
    image: '/images/char-dham.png',
  },
  '/blog': {
    title: 'Pilgrimage Journal | Kakani Holidays',
    description: 'Temple stories and thoughtful travel guidance from sacred India.',
    image: '/images/golden-temple-hero.png',
  },
  '/about': {
    title: 'About Kakani Holidays',
    description: 'Learn about Kakani Holidays and our approach to devotional travel.',
    image: '/images/hindu-temple-hero.png',
  },
  '/contact': {
    title: 'Contact Kakani Holidays',
    description: 'Speak with Kakani Holidays about planning a devotional journey.',
    image: '/images/dwarka-somnath.png',
  },
}

export function getPageMetadata(pathname: string): PageMetadata {
  const destination = destinations.find(item => pathname === `/destinations/${item.slug}`)
  if (destination) {
    return {
      title: `${destination.name}, ${destination.state} | Kakani Holidays`,
      description: destination.description,
      image: destination.image,
    }
  }

  const pilgrimagePackage = packages.find(item => pathname === `/packages/${item.slug}`)
  if (pilgrimagePackage) {
    return {
      title: `${pilgrimagePackage.name} | Kakani Holidays`,
      description: `${pilgrimagePackage.duration} pilgrimage covering ${pilgrimagePackage.route}.`,
      image: pilgrimagePackage.image,
    }
  }

  return pages[pathname] ?? defaultMetadata
}
