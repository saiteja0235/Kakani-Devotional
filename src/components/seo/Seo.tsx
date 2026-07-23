import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMetadata } from '../../app/metadata'

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    const [key, name] = selector.includes('property=')
      ? ['property', selector.match(/property="([^"]+)"/)?.[1]]
      : ['name', selector.match(/name="([^"]+)"/)?.[1]]
    if (name) element.setAttribute(key, name)
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = getPageMetadata(pathname)
    document.title = metadata.title
    setMeta('meta[name="description"]', 'content', metadata.description)
    setMeta('meta[property="og:title"]', 'content', metadata.title)
    setMeta('meta[property="og:description"]', 'content', metadata.description)
    setMeta('meta[property="og:type"]', 'content', metadata.type ?? 'website')
    if (metadata.image) setMeta('meta[property="og:image"]', 'content', metadata.image)
  }, [pathname])

  return null
}
