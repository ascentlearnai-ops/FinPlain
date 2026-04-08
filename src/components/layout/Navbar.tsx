'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Activity } from 'lucide-react'
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
          ? 'bg-[#0b0e11]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-md'
          : 'bg-transparent'
      }`}>
        <div className="container-full">
          <div className="container-inner h-16 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 transition-all group-hover:bg-accent/20 group-hover:border-accent/30">
                <Activity size={18} className="text-accent" />
              </div>
              <span className="font-sans font-extrabold text-lg text-primary tracking-tighter group-hover:text-accent transition-colors">
                Finplain
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-accent bg-accent/10'
                      : 'text-secondary hover:text-primary hover:bg-white/[0.04]'
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
          <div className="md:hidden bg-[#111418] border-b border-white/[0.06] px-5 py-4 space-y-1">
            <div className="mb-3"><SearchBar fullWidth /></div>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                  pathname === link.href ? 'text-accent bg-accent/10' : 'text-secondary'
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
