import type { ReactNode } from 'react'
import { RevealSection, TextReveal } from '../motion/MotionSystem'
import { Button } from './Button'
import { CinematicImage } from './CinematicImage'

export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
  return <RevealSection className={className} delay={delay}>{children}</RevealSection>
}
export function Action({to,children,light=false}:{to:string;children:ReactNode;light?:boolean}){
  return <Button className={`action ${light?'action-light':''}`} variant={light?'light':'primary'} to={to}>{children}</Button>
}
export function SectionHead({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){
  return <Reveal className="section-head"><p>{eyebrow}</p><h2><TextReveal>{title}</TextReveal></h2>{copy&&<span>{copy}</span>}</Reveal>
}
export function PageHero({eyebrow,title,copy,image}:{eyebrow:string;title:string;copy:string;image:string}){
  return <section className="page-intro"><CinematicImage className="page-intro-media" src={image} alt="Sacred temple landscape" eager parallax/><div className="page-intro-shade"/><Reveal className="container page-intro-copy"><p>{eyebrow}</p><h1><TextReveal>{title}</TextReveal></h1><span>{copy}</span></Reveal></section>
}
