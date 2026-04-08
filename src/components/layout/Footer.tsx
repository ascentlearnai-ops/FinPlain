import Link from 'next/link'
import { Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/[0.04] py-16">
      <div className="container-full">
        <div className="container-inner">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Activity size={18} className="text-accent" />
                </div>
                <span className="font-sans font-extrabold text-xl tracking-tighter text-primary">Finplain</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                Market intelligence simplified. Real-time data powered by Alpha Vantage, Yahoo Finance, EODHD &amp; SerpApi.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div>
                <p className="font-bold text-primary mb-3 uppercase tracking-wider text-xs">Product</p>
                <div className="space-y-2.5">
                  {[{ label: 'Dashboard', href: '/' }, { label: 'News Feed', href: '/news' }, { label: 'Glossary', href: '/learn' }, { label: 'Watchlist', href: '/watchlist' }].map(l => (
                    <Link key={l.href} href={l.href} className="block text-secondary hover:text-accent transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-primary mb-3 uppercase tracking-wider text-xs">Data Sources</p>
                <div className="space-y-2.5 text-secondary">
                  <p>Alpha Vantage</p>
                  <p>Yahoo Finance</p>
                  <p>EODHD</p>
                  <p>SerpApi</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-primary mb-3 uppercase tracking-wider text-xs">Legal</p>
                <div className="space-y-2.5 text-secondary">
                  <p>For informational purposes only</p>
                  <p>Not financial advice</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/[0.04] flex items-center justify-between text-xs text-muted">
            <p>&copy; {new Date().getFullYear()} Finplain. All rights reserved.</p>
            <p>AI analysis powered by Gemini</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
