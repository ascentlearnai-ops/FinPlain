import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Activity } from 'lucide-react'
import AuthProvider from '@/components/auth/AuthProvider'

export const metadata: Metadata = {
  title: 'macroliberium - Markets, Explained',
  description: 'A black-and-white market intelligence app that makes stocks, news, and financial language easier for teenagers to understand.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="splash-screen" aria-hidden="true">
          <div className="splash-logo-container">
            <div className="splash-logo flex items-center justify-center">
              <Activity size={44} className="text-white" />
            </div>
          </div>
          <div className="splash-text">macroliberium</div>
        </div>

        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
