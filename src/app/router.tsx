import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SharedLayout } from '../components/layout/SharedLayout'
import { Seo } from '../components/seo/Seo'
import { destinations, packages } from '../data/content'
import DestinationsPage, { DestinationDetailPage } from '../pages/DestinationsPage'
import PackagesPage, { PackageDetailPage } from '../pages/PackagesPage'

const HomePage = lazy(() => import('../pages/HomePage'))
const EditorialPages = lazy(() => import('../pages/EditorialPages'))

function DestinationRoute() {
  const { slug } = useParams()
  const destination = destinations.find(item => item.slug === slug)
  return destination ? <DestinationDetailPage destination={destination} /> : <Navigate to="/destinations" replace />
}

function PackageRoute() {
  const { slug } = useParams()
  const pilgrimagePackage = packages.find(item => item.slug === slug)
  return pilgrimagePackage ? <PackageDetailPage pkg={pilgrimagePackage} /> : <Navigate to="/packages" replace />
}

const loading = <div className="route-loading" role="status">Preparing the journey…</div>

export function AppRouter() {
  return (
    <>
      <Seo />
      <Suspense fallback={loading}>
        <Routes>
          <Route element={<SharedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationRoute />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:slug" element={<PackageRoute />} />
            <Route path="/pilgrimage-guide" element={<EditorialPages page="guide" />} />
            <Route path="/blog" element={<EditorialPages page="blog" />} />
            <Route path="/about" element={<EditorialPages page="about" />} />
            <Route path="/contact" element={<EditorialPages page="contact" />} />
            <Route path="/privacy" element={<EditorialPages page="privacy" />} />
            <Route path="/terms" element={<EditorialPages page="terms" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
