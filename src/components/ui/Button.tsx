import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light'
export type ButtonSize = 'sm' | 'md' | 'lg'

type SharedProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: boolean
  className?: string
}

type LinkButtonProps = SharedProps & { to: string; href?: never }
type ExternalButtonProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never }
type NativeButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never }

const classes = ({ variant = 'primary', size = 'md', className = '' }: SharedProps) =>
  `button button-${variant} button-${size} ${className}`.trim()

export function Button(props: LinkButtonProps | ExternalButtonProps | NativeButtonProps) {
  const { children, variant = 'primary', size = 'md', icon = true, className = '' } = props
  const content = <>{children}{icon && <ArrowUpRight aria-hidden="true" />}</>
  const classNames = classes({ variant, size, className, children })

  if ('to' in props && props.to) return <Link className={classNames} to={props.to}>{content}</Link>
  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props
    return <a {...anchorProps} className={classNames} href={href}>{content}</a>
  }
  const { type = 'button', ...buttonProps } = props as NativeButtonProps
  return <button {...buttonProps} className={classNames} type={type}>{content}</button>
}
