import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navigation } from '../components/layout/Navigation'
import { destinations, packages } from '../data/content'
import { AboutPage, BlogPage, ContactPage, GuidePage, LegalPage } from '../pages/EditorialPages'
import DestinationsPage, { DestinationDetailPage } from '../pages/DestinationsPage'
import PackagesPage, { PackageDetailPage } from '../pages/PackagesPage'
const HomePage=lazy(()=>import('../pages/HomePage'))

const metadata:Record<string,[string,string]>={
  '/':['Kakani Holidays | Devotional Journeys','Thoughtfully planned pilgrimage journeys across sacred India.'],
  '/destinations':['Sacred Destinations | Kakani Holidays','Explore pilgrimage destinations and temple journeys across India.'],
  '/packages':['Pilgrimage Packages | Kakani Holidays','Browse curated devotional travel routes from Kakani Holidays.'],
  '/pilgrimage-guide':['Pilgrimage Guide | Kakani Holidays','Practical guidance for comfortable and meaningful temple journeys.'],
  '/blog':['Pilgrimage Journal | Kakani Holidays','Temple stories and thoughtful travel guidance from sacred India.'],
  '/about':['About Kakani Holidays','Learn about Kakani Holidays and our approach to devotional travel.'],
  '/contact':['Contact Kakani Holidays','Speak with Kakani Holidays about planning a devotional journey.'],
}
function DestinationRoute(){const {slug}=useParams();const d=destinations.find(x=>x.slug===slug);return d?<DestinationDetailPage destination={d}/>:<Navigate to="/destinations" replace/>}
function PackageRoute(){const {slug}=useParams();const p=packages.find(x=>x.slug===slug);return p?<PackageDetailPage pkg={p}/>:<Navigate to="/packages" replace/>}
function Metadata(){const {pathname}=useLocation();useEffect(()=>{const base=pathname.startsWith('/destinations/')?metadata['/destinations']:pathname.startsWith('/packages/')?metadata['/packages']:metadata[pathname];if(base){document.title=base[0];document.querySelector('meta[name="description"]')?.setAttribute('content',base[1])}scrollTo({top:0})},[pathname]);return null}
export function App(){const location=useLocation();return <><Metadata/><Navigation/><AnimatePresence mode="wait"><motion.main id="main" key={location.pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.35}}><Suspense fallback={<div className="route-loading">Preparing the journey…</div>}><Routes location={location}><Route path="/" element={<HomePage/>}/><Route path="/destinations" element={<DestinationsPage/>}/><Route path="/destinations/:slug" element={<DestinationRoute/>}/><Route path="/packages" element={<PackagesPage/>}/><Route path="/packages/:slug" element={<PackageRoute/>}/><Route path="/pilgrimage-guide" element={<GuidePage/>}/><Route path="/blog" element={<BlogPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/privacy" element={<LegalPage title="Privacy Policy"/>}/><Route path="/terms" element={<LegalPage title="Terms and Conditions"/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></Suspense></motion.main></AnimatePresence><Footer/></>}
