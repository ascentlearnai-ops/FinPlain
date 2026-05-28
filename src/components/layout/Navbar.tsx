'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Activity, Globe, BookOpen, Heart, LayoutDashboard } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import GoogleLoginButton from '@/components/auth/GoogleLoginButton'

const navLinks = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/news', label: 'News', icon: Globe },
  { href: '/learn', label: 'Study', icon: BookOpen },
  { href: '/watchlist', label: 'Watchlist', icon: Heart },
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset'
  }, [mobileOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-200 ${
        scrolled || mobileOpen ? 'bg-background/90 backdrop-blur-xl border-b border-white/[0.08]' : 'bg-background/70 backdrop-blur-sm'
      }`}>
        <div className="container-full">
          <div className="container-inner h-18 min-h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <div className="w-9 h-9 rounded-lg border border-white/20 bg-white text-black flex items-center justify-center">
                <Activity size={18} />
              </div>
              <span className="font-['Outfit'] font-black text-xl text-primary hidden sm:block">
                macroliberium
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1 border border-white/[0.08] p-1 rounded-lg bg-white/[0.02]">
              {navLinks.map(link => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-colors flex items-center gap-2 ${
                      isActive ? 'text-black bg-white' : 'text-secondary hover:text-primary hover:bg-white/[0.06]'
                    }`}>
                    <Icon size={14} />
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-4 relative z-50">
              <div className="hidden xl:block"><SearchBar /></div>
              <div className="hidden sm:block">
                <GoogleLoginButton compact />
              </div>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed right-4 top-5 w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.12] text-primary hover:bg-white/[0.08] transition-colors sm:static"
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`fixed inset-0 top-20 bg-background z-40 transition-all duration-200 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-3'
        }`}>
          <div className="container-full py-8 space-y-8">
            <SearchBar fullWidth />
            <GoogleLoginButton />
            <div className="grid grid-cols-1 gap-3">
              {navLinks.map(link => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between p-5 rounded-lg border transition-colors ${
                      isActive ? 'bg-white text-black border-white' : 'bg-card border-white/[0.08] text-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={22} />
                      <div>
                        <p className={`font-bold text-lg ${isActive ? 'text-black' : 'text-primary'}`}>{link.label}</p>
                        <p className={`text-xs ${isActive ? 'text-black/60' : 'text-muted'}`}>Markets made readable</p>
                      </div>
                    </div>
                    <Activity size={18} className="opacity-40" />
                  </Link>
                )
              })}
            </div>

            <div className="pt-8 border-t border-white/[0.08] text-center">
              <p className="text-[10px] uppercase font-bold text-muted">Finance literacy for the next generation</p>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-20" />
    </>
  )
}
