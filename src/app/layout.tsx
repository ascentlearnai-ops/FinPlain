import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/auth/AuthProvider'

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
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
