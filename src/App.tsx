import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import AlertsPage from './pages/AlertsPage'
import RecallsPage from './pages/RecallsPage'
import { AlertDetailPage, ReportStatusPage } from './pages/NoticeDetailPage'
import ComingSoon from './pages/ComingSoon'
import CheckingPage from './pages/verify/CheckingPage'
import VerifyResultPage from './pages/verify/VerifyResultPage'
import ReportLayout from './pages/report/ReportLayout'
import ReportFormStep from './pages/report/ReportFormStep'
import ReviewStep from './pages/report/ReviewStep'
import ConfirmationStep from './pages/report/ConfirmationStep'
import LearnPage from './pages/learn/LearnPage'
import ArticlesPage from './pages/learn/ArticlesPage'
import ArticleDetailPage from './pages/learn/ArticleDetailPage'
import { ContactPage, MediaPage, PartnerPage } from './pages/enquiry/pages'

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    // Jump to the top on a new page; glide to in-page anchors like /#check.
    // `key` changes on every navigation, so re-clicking the same anchor link scrolls again.
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  // Fade per section, not per sub-step, so multi-step flows (e.g. /report/…) keep their state
  const section = pathname.split('/')[1]
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex flex-1 flex-col">
        {/* Keyed by path so each page fades in on navigation */}
        <div key={section} className="flex flex-1 animate-fade-in flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/alerts/:id" element={<AlertDetailPage />} />
          <Route path="/reports/:reference" element={<ReportStatusPage />} />
          <Route path="/recalls" element={<RecallsPage />} />
          <Route path="/check" element={<CheckingPage />} />
          <Route path="/check/result" element={<VerifyResultPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/articles" element={<ArticlesPage />} />
          <Route path="/learn/:slug" element={<ArticleDetailPage />} />
          <Route path="/report" element={<ReportLayout />}>
            <Route index element={<ReportFormStep />} />
            <Route path="review" element={<ReviewStep />} />
            <Route path="confirmation" element={<ConfirmationStep />} />
          </Route>
          <Route path="*" element={<ComingSoon />} />
        </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}
