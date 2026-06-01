import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/auth/AuthProvider'
import BrandMark from '@/components/brand/BrandMark'

export const metadata: Metadata = {
  title: 'MacroLibrium - Markets, Explained',
  description: 'A black-and-white market intelligence app that makes stocks, news, and financial language easier for teenagers to understand.',
  icons: {
    icon: '/brand-mark.png',
    apple: '/brand-mark.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="splash-screen" aria-hidden="true">
          <div className="splash-logo-container">
            <div className="splash-logo flex items-center justify-center">
              <BrandMark size={68} priority />
            </div>
          </div>
          <div className="splash-text">MacroLibrium</div>
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
