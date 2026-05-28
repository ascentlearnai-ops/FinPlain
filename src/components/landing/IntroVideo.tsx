'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight, BookOpen, FileText, LineChart, Newspaper, Search, ShieldCheck } from 'lucide-react'

const tickers = ['AAPL', 'NVDA', 'MSFT', 'SPY', 'TSLA', 'META', 'AMZN', 'GOOGL', 'JPM', 'QQQ']

const cards = [
  ['Headline', 'Apple services margin expands after earnings call'],
  ['Translation', 'Apple kept more money from each dollar of service sales. That can matter because profit may grow faster than sales.'],
  ['Word to know', 'Margin means the part of sales a company keeps after paying costs.'],
]

export default function IntroVideo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const shellRef = useRef<HTMLDivElement | null>(null)
  const [activeTicker, setActiveTicker] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTicker(index => (index + 1) % tickers.length)
    }, 1400)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const shell = shellRef.current
    if (!canvas || !shell) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const points = Array.from({ length: 56 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2.8,
      speed: 0.00045 + Math.random() * 0.0009,
      phase: index * 0.72,
    }))

    let width = 0
    let height = 0
    let raf = 0
    let pointerX = 0.5
    let pointerY = 0.5

    const resize = () => {
      const rect = shell.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect()
      pointerX = (event.clientX - rect.left) / rect.width
      pointerY = (event.clientY - rect.top) / rect.height
      shell.style.setProperty('--mx', `${pointerX}`)
      shell.style.setProperty('--my', `${pointerY}`)
      shell.style.setProperty('--rx', `${(pointerY - 0.5) * 5}deg`)
      shell.style.setProperty('--ry', `${(pointerX - 0.5) * -8}deg`)
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, width, height)

      const grid = 44
      ctx.strokeStyle = 'rgba(255,255,255,0.035)'
      ctx.lineWidth = 1
      for (let x = (time * 0.006) % grid; x < width; x += grid) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = (time * 0.004) % grid; y < height; y += grid) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      const resolved = points.map(point => {
        const drift = time * point.speed
        return {
          ...point,
          px: (point.x * width + Math.sin(drift + point.phase) * 34 + (pointerX - 0.5) * 24),
          py: (point.y * height + Math.cos(drift + point.phase) * 26 + (pointerY - 0.5) * 18),
        }
      })

      resolved.forEach((a, i) => {
        for (let j = i + 1; j < resolved.length; j++) {
          const b = resolved[j]
          const dx = a.px - b.px
          const dy = a.py - b.py
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 128) {
            ctx.strokeStyle = `rgba(255,255,255,${0.13 * (1 - distance / 128)})`
            ctx.beginPath()
            ctx.moveTo(a.px, a.py)
            ctx.lineTo(b.px, b.py)
            ctx.stroke()
          }
        }
      })

      resolved.forEach((point, index) => {
        const pulse = 0.45 + Math.sin(time * 0.003 + index) * 0.35
        ctx.fillStyle = `rgba(255,255,255,${0.35 + pulse * 0.35})`
        ctx.beginPath()
        ctx.arc(point.px, point.py, point.r + pulse, 0, Math.PI * 2)
        ctx.fill()
      })

      if (!motionQuery.matches) raf = requestAnimationFrame(draw)
    }

    resize()
    shell.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      shell.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const currentTicker = tickers[activeTicker]

  return (
    <div className="astonish-stage" ref={shellRef}>
      <canvas ref={canvasRef} className="astonish-canvas" aria-hidden="true" />

      <div className="ticker-ribbon" aria-hidden="true">
        {[...tickers, ...tickers].map((ticker, index) => (
          <span key={`${ticker}-${index}`}>{ticker}<em>{index % 3 === 0 ? '+1.4%' : index % 3 === 1 ? '-0.6%' : '+0.2%'}</em></span>
        ))}
      </div>

      <div className="market-orbit" aria-hidden="true">
        {tickers.slice(0, 7).map((ticker, index) => (
          <span key={ticker} style={{ '--i': index } as CSSProperties}>{ticker}</span>
        ))}
      </div>

      <div className="hero-terminal">
        <div className="hero-terminal-top">
          <div className="hero-brand-dot" />
          <strong>Student Market Desk</strong>
          <span>06:00 source sync</span>
        </div>

        <div className="hero-searchbar">
          <Search size={14} />
          <span>Why did {currentTicker} move today?</span>
        </div>

        <div className="hero-terminal-grid">
          <div className="hero-chart-panel">
            <div className="hero-chart-head">
              <div>
                <p>{currentTicker}</p>
                <strong>{currentTicker === 'SPY' ? '$632.14' : '$310.85'}</strong>
              </div>
              <em>Explained for students</em>
            </div>
            <svg viewBox="0 0 540 230" className="hero-live-chart" role="img" aria-label="Animated market chart">
              <g>
                {[44, 92, 140, 188].map(y => <line key={y} x1="0" y1={y} x2="540" y2={y} />)}
              </g>
              <path d="M 18 174 C 74 128, 118 194, 171 128 S 268 88, 318 106 S 406 62, 522 48" />
              <circle cx="522" cy="48" r="7" />
            </svg>
          </div>

          <div className="hero-source-stack">
            {[
              [ShieldCheck, 'Sources checked', 'Yahoo, filings, news feeds'],
              [Newspaper, 'Headline simplified', 'What happened, in normal words'],
              [BookOpen, 'Term explained', 'Study one idea at a time'],
              [FileText, 'Research saved', 'Notes stay with the ticker'],
            ].map(([Icon, title, body]) => {
              const RowIcon = Icon as typeof ShieldCheck
              return (
                <div key={title as string} className="hero-source-row">
                  <RowIcon size={15} />
                  <div><strong>{title as string}</strong><span>{body as string}</span></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="headline-transformer">
        <div className="transformer-top">
          <LineChart size={16} />
          <span>Headline to understanding</span>
          <ArrowUpRight size={15} />
        </div>
        {cards.map(([label, body], index) => (
          <div key={label} className="transformer-card" style={{ '--d': index } as CSSProperties}>
            <p>{label}</p>
            <strong>{body}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
