import type { ReactNode } from 'react'

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>
}

export function LiveRegion({ children, politeness = 'polite' }: { children: ReactNode; politeness?: 'polite' | 'assertive' }) {
  return <div className="sr-only" aria-live={politeness} aria-atomic="true">{children}</div>
}
