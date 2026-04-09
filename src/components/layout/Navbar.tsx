'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Activity, Globe, Zap, Heart } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'

const navLinks = [
  { href: '/', label: 'Overview', icon: Zap },
  { href: '/news', label: 'Market Feed', icon: Globe },
  { href: '/learn', label: 'Education', icon: Activity },
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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [mobileOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-[#040507]/80 backdrop-blur-2xl border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}>
        <div className="container-full">
          <div className="container-inner h-20 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-[1px] shadow-neon-blue">
                <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center">
                  <Activity size={20} className="text-white" />
                </div>
              </div>
              <span className="font-['Outfit'] font-black text-xl text-primary tracking-tight hidden sm:block">
                Finplain<span className="text-accent">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.05] p-1.5 rounded-2xl">
              {navLinks.map(link => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                      isActive
                        ? 'text-white bg-white/10 shadow-inner'
                        : 'text-muted hover:text-primary hover:bg-white/[0.04]'
                    }`}>
                    <Icon size={14} className={isActive ? 'text-accent' : ''} />
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4 relative z-50">
              <div className="hidden md:block"><SearchBar /></div>
              
              <button 
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-primary hover:bg-white/[0.08] transition-all"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 top-20 bg-[#040507] z-40 transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'
        }`}>
          <div className="container-full py-8 space-y-8">
            <div className="px-2">
              <SearchBar fullWidth />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {navLinks.map((link, i) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between p-5 rounded-[24px] border transition-all ${
                      isActive 
                        ? 'bg-accent/10 border-accent/20 text-accent' 
                        : 'bg-white/[0.03] border-white/[0.05] text-secondary'
                    }`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-accent/20' : 'bg-white/5'}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-primary">{link.label}</p>
                        <p className="text-xs text-muted font-medium">Market monitoring & insights</p>
                      </div>
                    </div>
                    <Activity size={18} className="opacity-20" />
                  </Link>
                )
              })}
            </div>

            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] uppercase font-bold text-muted tracking-[0.3em] mb-4">Neural Analytics Platform</p>
              <div className="flex justify-center gap-3">
                <span className="w-1.5 h-1.5 bg-up rounded-full animate-pulse-dot" />
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse-dot" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-20" />
    </>
  )
}
