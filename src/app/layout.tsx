import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Finplain — Market Intelligence, Simplified',
  description: 'Real-time market data with AI-powered analysis. Professional-grade financial tools, accessible to everyone.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Splash intro */}
        <div className="splash-screen" aria-hidden="true">
          <div className="splash-logo-container">
            <div className="splash-logo flex items-center justify-center">
              <Activity size={56} className="text-[#0b0e11]" />
            </div>
          </div>
          <div className="splash-text">Finplain</div>
        </div>

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
