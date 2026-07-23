import type { ElementType, HTMLAttributes, ReactNode } from 'react'

type GlassTone = 'dark' | 'light' | 'neutral'
type GlassStrength = 'subtle' | 'medium' | 'strong'

type GlassProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  as?: ElementType
  tone?: GlassTone
  strength?: GlassStrength
}

export function GlassSurface({
  as: Component = 'div',
  children,
  className = '',
  tone = 'neutral',
  strength = 'medium',
  ...props
}: GlassProps) {
  return <Component {...props} className={`glass glass-${tone} glass-${strength} ${className}`}>{children}</Component>
}

export const GlassPanel = (props: GlassProps) => <GlassSurface strength="strong" {...props} />
export const GlassCard = (props: GlassProps) => <GlassSurface strength="subtle" {...props} />
