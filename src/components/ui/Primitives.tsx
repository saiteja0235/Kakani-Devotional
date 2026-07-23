import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){
  const reduced=useReducedMotion()
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.65,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>
}
export function Action({to,children,light=false}:{to:string;children:ReactNode;light?:boolean}){
  return <Link className={`action ${light?'action-light':''}`} to={to}>{children}<ArrowUpRight/></Link>
}
export function SectionHead({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){
  return <Reveal className="section-head"><p>{eyebrow}</p><h2>{title}</h2>{copy&&<span>{copy}</span>}</Reveal>
}
export function PageHero({eyebrow,title,copy,image}:{eyebrow:string;title:string;copy:string;image:string}){
  return <section className="page-intro"><img src={image} alt="Sacred temple landscape"/><div className="page-intro-shade"/><Reveal className="container page-intro-copy"><p>{eyebrow}</p><h1>{title}</h1><span>{copy}</span></Reveal></section>
}
