'use client'

import { Player } from '@remotion/player'
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from 'remotion'
import { Bell, FileText, LineChart, MessageSquareText, Newspaper, Search, ShieldCheck } from 'lucide-react'

const briefItems = [
  { label: 'AAPL', title: 'Services margin expands', source: 'Earnings call', score: 'High' },
  { label: 'NVDA', title: 'Data center guidance revised', source: 'Transcript', score: 'High' },
  { label: 'MSFT', title: 'Cloud growth watch', source: '10-Q', score: 'Medium' },
  { label: 'SPY', title: 'Fed remarks at 9:30', source: 'Macro calendar', score: 'Medium' },
]

const chartPoints = [
  [18, 166], [70, 150], [122, 158], [174, 119], [226, 132], [278, 91], [330, 102], [382, 70], [434, 78], [486, 46],
]

function pathFrom(points: number[][]) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
}

function ease(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function ResearchTerminal() {
  const frame = useCurrentFrame()
  const shell = ease(frame, 0, 36)
  const chart = ease(frame, 26, 88)
  const cursorX = interpolate(chart, [0, 1], [18, 486])
  const scan = interpolate(frame % 150, [0, 150], [-14, 112])
  const path = pathFrom(chartPoints)
  const pathLength = 650

  return (
    <AbsoluteFill style={{ background: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div className="terminal-shell" style={{ opacity: shell, transform: `translateY(${(1 - shell) * 18}px)` }}>
        <div className="terminal-topbar">
          <div className="terminal-brand">
            <span />
            <strong>macroliberium research</strong>
          </div>
          <div className="terminal-search"><Search size={13} /> What changed before open?</div>
          <div className="terminal-sync">06:00 sync complete</div>
        </div>

        <div className="terminal-sidebar">
          {[
            [LineChart, 'Markets'],
            [Newspaper, 'News'],
            [FileText, 'Filings'],
            [MessageSquareText, 'Notes'],
            [Bell, 'Alerts'],
          ].map(([Icon, label], index) => {
            const SidebarIcon = Icon as typeof LineChart
            const item = ease(frame, 12 + index * 4, 34 + index * 4)
            return (
              <div key={label as string} className="terminal-nav-item" style={{ opacity: item }}>
                <SidebarIcon size={14} />
                <span>{label as string}</span>
              </div>
            )
          })}
        </div>

        <div className="terminal-main">
          <div className="terminal-heading">
            <div>
              <p>Morning brief</p>
              <h3>Signals worth reading first</h3>
            </div>
            <div className="terminal-quality"><ShieldCheck size={14} /> 5 sources reconciled</div>
          </div>

          <div className="terminal-chart-card">
            <div className="chart-card-header">
              <div>
                <span>AAPL</span>
                <strong>$310.85</strong>
              </div>
              <em>+0.82%</em>
            </div>
            <svg viewBox="0 0 520 210" className="terminal-chart" role="img" aria-label="Animated stock chart">
              <g opacity="0.18">
                {[38, 82, 126, 170].map(y => <line key={y} x1="0" y1={y} x2="520" y2={y} />)}
              </g>
              <path
                d={path}
                fill="none"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength * (1 - chart),
                }}
              />
              <circle cx={cursorX} cy={interpolate(chart, [0, 1], [166, 46])} r="7" fill="#fff" opacity={chart} />
            </svg>
          </div>

          <div className="terminal-brief-grid">
            {briefItems.map((item, index) => {
              const enter = ease(frame, 42 + index * 8, 68 + index * 8)
              return (
                <div
                  key={item.label}
                  className="terminal-brief-card"
                  style={{
                    opacity: enter,
                    transform: `translateY(${(1 - enter) * 12}px)`,
                  }}
                >
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  <p>{item.source}</p>
                  <em>{item.score}</em>
                </div>
              )
            })}
          </div>
        </div>

        <div className="terminal-right-rail">
          <Sequence from={8} durationInFrames={160} layout="none">
            <div className="rail-panel">
              <p>Transcript excerpt</p>
              <strong>Management pointed to durable demand in high-margin services.</strong>
              <span>Confidence: verified against call and filing language.</span>
            </div>
          </Sequence>
          <Sequence from={44} durationInFrames={130} layout="none">
            <div className="rail-panel rail-panel-soft">
              <p>Student explanation</p>
              <strong>Higher margins mean the company kept more profit from each dollar of sales.</strong>
              <span>Saved to AAPL notes.</span>
            </div>
          </Sequence>
          <Sequence from={78} durationInFrames={100} layout="none">
            <div className="rail-panel rail-panel-soft">
              <p>Alert rule</p>
              <strong>Notify when guidance, margins, or services revenue appear in headlines.</strong>
              <span>Morning sync watches this automatically.</span>
            </div>
          </Sequence>
        </div>

        <div className="terminal-scanline" style={{ left: `${scan}%` }} />
      </div>
    </AbsoluteFill>
  )
}

export default function IntroVideo() {
  return (
    <div className="intro-video-frame" aria-label="Animated product preview">
      <Player
        component={ResearchTerminal}
        durationInFrames={210}
        compositionWidth={1400}
        compositionHeight={860}
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
