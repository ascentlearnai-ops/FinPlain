'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/news', label: 'News' },
  { href: '/learn', label: 'Glossary' },
  { href: '/watchlist', label: 'Watchlist' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/[0.04] shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="container-full">
          <div className="container-inner h-16 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-500 p-1.5 shadow-glow">
                <Image src="/logo.png" alt="Finplain" width={36} height={36} className="w-full h-full object-cover rounded-md" />
              </div>
              <span className="font-sans font-extrabold text-lg text-primary tracking-tight">
                Finplain
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-accent bg-accent-bg'
                      : 'text-secondary hover:text-primary hover:bg-gray-50'
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block"><SearchBar /></div>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-secondary hover:text-primary">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-black/[0.04] px-5 py-4 space-y-1">
            <div className="mb-3"><SearchBar fullWidth /></div>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                  pathname === link.href ? 'text-accent bg-accent-bg' : 'text-secondary'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  )
}
