import { Bell, BookOpen, FileText, LineChart, Newspaper, Search, ShieldCheck } from 'lucide-react'

const movers = [
  ['AAPL', 'Earnings call translated', '+0.82%'],
  ['NVDA', 'AI demand headline', '+3.12%'],
  ['MSFT', '10-Q filing surfaced', '+0.64%'],
  ['SPY', 'Fed comments watch', '-0.22%'],
]

export default function IntroVideo() {
  return (
    <div className="fast-preview-shell" aria-label="Product preview">
      <div className="fast-preview-topbar">
        <div className="fast-preview-brand">
          <span />
          <strong>macroliberium</strong>
        </div>
        <div className="fast-preview-search">
          <Search size={13} />
          <span>Why did AAPL move today?</span>
        </div>
        <div className="fast-preview-status">Yahoo Finance for teenagers</div>
      </div>

      <div className="fast-preview-sidebar">
        {[
          [LineChart, 'Prices'],
          [Newspaper, 'News'],
          [FileText, 'Filings'],
          [BookOpen, 'Explain'],
          [Bell, 'Alerts'],
        ].map(([Icon, label]) => {
          const ItemIcon = Icon as typeof LineChart
          return (
            <div key={label as string} className="fast-preview-nav-item">
              <ItemIcon size={14} />
              <span>{label as string}</span>
            </div>
          )
        })}
      </div>

      <div className="fast-preview-main">
        <div className="fast-preview-heading">
          <div>
            <p>Teen market brief</p>
            <h3>What moved, why it matters, and what the words mean.</h3>
          </div>
          <div className="fast-preview-quality">
            <ShieldCheck size={14} />
            <span>Sources checked</span>
          </div>
        </div>

        <div className="fast-preview-chart-card">
          <div className="fast-preview-chart-header">
            <div>
              <span>AAPL</span>
              <strong>$310.85</strong>
            </div>
            <em>Plain-English read</em>
          </div>
          <svg viewBox="0 0 520 190" className="fast-preview-chart" role="img" aria-label="Stock chart preview">
            <g>
              {[34, 76, 118, 160].map(y => <line key={y} x1="0" y1={y} x2="520" y2={y} />)}
            </g>
            <path d="M 18 148 L 70 132 L 122 138 L 174 104 L 226 116 L 278 78 L 330 88 L 382 58 L 434 66 L 486 38" />
            <circle cx="486" cy="38" r="7" />
          </svg>
        </div>

        <div className="fast-preview-movers">
          {movers.map(([ticker, title, change]) => (
            <div key={ticker} className="fast-preview-mover">
              <span>{ticker}</span>
              <strong>{title}</strong>
              <em>{change}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="fast-preview-rail">
        <div className="fast-preview-note">
          <p>Headline</p>
          <strong>Apple services margin expands after earnings call.</strong>
          <span>macroliberium explains the business impact without Wall Street language.</span>
        </div>
        <div className="fast-preview-note muted">
          <p>Student explanation</p>
          <strong>Margin means how much money the company keeps after costs.</strong>
          <span>Save it to your ticker notebook and come back later.</span>
        </div>
      </div>
    </div>
  )
}
