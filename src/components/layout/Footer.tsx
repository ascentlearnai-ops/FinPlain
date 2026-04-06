import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="section-soft border-t border-black/[0.04] py-16">
      <div className="container-full">
        <div className="container-inner">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-500 p-1">
                  <Image src="/logo.png" alt="Finplain" width={32} height={32} className="w-full h-full object-cover rounded-md" />
                </div>
                <span className="font-sans font-extrabold text-lg tracking-tight">Finplain</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                Market intelligence simplified. Real-time data powered by Alpha Vantage, Yahoo Finance, Finnhub & TradingView.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div>
                <p className="font-semibold text-primary mb-3">Product</p>
                <div className="space-y-2.5">
                  {[{ label: 'Dashboard', href: '/' }, { label: 'News Feed', href: '/news' }, { label: 'Glossary', href: '/learn' }].map(l => (
                    <Link key={l.href} href={l.href} className="block text-secondary hover:text-accent transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-primary mb-3">Data Sources</p>
                <div className="space-y-2.5 text-secondary">
                  <p>Alpha Vantage</p>
                  <p>Yahoo Finance</p>
                  <p>Finnhub</p>
                  <p>TradingView</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-primary mb-3">Legal</p>
                <div className="space-y-2.5 text-secondary">
                  <p>For informational purposes only</p>
                  <p>Not financial advice</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-black/[0.04] flex items-center justify-between text-xs text-muted">
            <p>&copy; {new Date().getFullYear()} Finplain. All rights reserved.</p>
            <p>AI analysis powered by Gemini</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
