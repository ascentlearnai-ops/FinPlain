import Link from 'next/link'
import BrandMark from '@/components/brand/BrandMark'

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/[0.08] py-14">
      <div className="container-full">
        <div className="container-inner">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg border border-white/20 bg-black flex items-center justify-center">
                  <BrandMark size={24} />
                </div>
                <span className="font-sans font-extrabold text-xl text-primary">MacroLibrium</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                Yahoo Finance for teenagers: live prices, readable headlines, watchlists, filings, and plain-English finance education in one calm workspace.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div>
                <p className="font-bold text-primary mb-3 uppercase text-xs">Product</p>
                <div className="space-y-2.5">
                  {[{ label: 'Overview', href: '/' }, { label: 'News', href: '/news' }, { label: 'Study', href: '/learn' }, { label: 'Watchlist', href: '/watchlist' }].map(l => (
                    <Link key={l.href} href={l.href} className="block text-secondary hover:text-primary transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-primary mb-3 uppercase text-xs">Data</p>
                <div className="space-y-2.5 text-secondary">
                  <p>Alpha Vantage</p>
                  <p>Yahoo Finance</p>
                  <p>EODHD</p>
                  <p>SerpApi</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-primary mb-3 uppercase text-xs">Note</p>
                <div className="space-y-2.5 text-secondary">
                  <p>For education only</p>
                  <p>Not financial advice</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-xs text-muted">
            <p>Copyright {new Date().getFullYear()} MacroLibrium. All rights reserved.</p>
            <p>Study summaries are for education only.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
