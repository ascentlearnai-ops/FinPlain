import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

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
            <div className="splash-logo">
              <Image src="/logo.png" alt="Finplain Logo" width={80} height={80} className="w-full h-full object-contain filter invert brightness-0" style={{ filter: 'brightness(0) invert(1)' }} priority />
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
