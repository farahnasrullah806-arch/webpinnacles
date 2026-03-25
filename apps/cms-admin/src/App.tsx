import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/AdminLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { ActivityLogPage } from '@/pages/ActivityLogPage'
import { BlogManagerPage } from '@/pages/BlogManagerPage'
import { CaseStudiesManagerPage } from '@/pages/CaseStudiesManagerPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { FaqManagerPage } from '@/pages/FaqManagerPage'
import { LoginPage } from '@/pages/LoginPage'
import { MediaLibraryPage } from '@/pages/MediaLibraryPage'
import { PagesManagerPage } from '@/pages/PagesManagerPage'
import { SchedulerPage } from '@/pages/SchedulerPage'
import { SeoPanelPage } from '@/pages/SeoPanelPage'
import { TestimonialsPage } from '@/pages/TestimonialsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="pages" element={<PagesManagerPage />} />
        <Route path="blog" element={<BlogManagerPage />} />
        <Route path="case-studies" element={<CaseStudiesManagerPage />} />
        <Route path="faqs" element={<FaqManagerPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="media" element={<MediaLibraryPage />} />
        <Route path="seo" element={<SeoPanelPage />} />
        <Route path="scheduler" element={<SchedulerPage />} />
        <Route path="activity" element={<ActivityLogPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
