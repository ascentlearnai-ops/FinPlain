'use client'

import { Player } from '@remotion/player'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { Activity, Bell, BookOpen, FileText, LineChart, Newspaper, Search } from 'lucide-react'

const rows = [
  { icon: LineChart, label: 'AAPL', meta: 'Earnings call', value: '+1.84%' },
  { icon: Newspaper, label: 'NVDA', meta: 'AI capex headline', value: '+3.12%' },
  { icon: FileText, label: 'MSFT', meta: '10-Q filed', value: '+0.64%' },
  { icon: Bell, label: 'SPY', meta: 'Rate watch alert', value: '-0.22%' },
]

function IntroComposition() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const lift = spring({ frame, fps, config: { damping: 18, stiffness: 90 } })
  const opacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' })
  const scanX = interpolate(frame % 120, [0, 120], [-20, 112], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div className="intro-video-shell">
        <div className="intro-video-topbar">
          <div className="intro-window-dots"><span /><span /><span /></div>
          <div className="intro-search"><Search size={12} /> Ask what moved today</div>
          <div className="intro-live-dot" />
        </div>

        <div
          className="intro-hero-card"
          style={{
            opacity,
            transform: `translateY(${(1 - lift) * 24}px) scale(${0.96 + lift * 0.04})`,
          }}
        >
          <div className="intro-mark">
            <Activity size={24} />
          </div>
          <p className="intro-kicker">market intelligence</p>
          <h3>Find the signal before the bell.</h3>
          <p>News, filings, notes, and plain-English explainers in one calm research flow.</p>
        </div>

        <div className="intro-grid">
          {rows.map((row, index) => {
            const Icon = row.icon
            const rowLift = spring({ frame: frame - index * 7, fps, config: { damping: 20, stiffness: 80 } })
            return (
              <div
                key={row.label}
                className="intro-row"
                style={{
                  opacity: Math.max(0, rowLift),
                  transform: `translateX(${(1 - rowLift) * 28}px)`,
                }}
              >
                <div className="intro-row-icon"><Icon size={15} /></div>
                <div>
                  <strong>{row.label}</strong>
                  <span>{row.meta}</span>
                </div>
                <em>{row.value}</em>
              </div>
            )
          })}
        </div>

        <div className="intro-learning-card">
          <BookOpen size={15} />
          <span>Teen-friendly takeaways generated from verified market sources.</span>
        </div>

        <div className="intro-scan" style={{ left: `${scanX}%` }} />
      </div>
    </AbsoluteFill>
  )
}

export default function IntroVideo() {
  return (
    <div className="intro-video-frame" aria-label="Animated product preview">
      <Player
        component={IntroComposition}
        durationInFrames={180}
        compositionWidth={1200}
        compositionHeight={760}
        fps={30}
        loop
        autoPlay
        muted
        controls={false}
        acknowledgeRemotionLicense
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
