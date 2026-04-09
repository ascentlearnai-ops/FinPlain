'use client'
import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, CrosshairMode, LineSeries, CandlestickSeries, HistogramSeries, IChartApi, ISeriesApi } from 'lightweight-charts'
import type { ChartRange, ChartType, ChartDataPoint } from '@/lib/types'
import { RefreshCw, AlertTriangle, Maximize2 } from 'lucide-react'

const RANGES: ChartRange[] = ['1D', '1W', '1M', '3M', '1Y']

interface Props { ticker: string; initialData: ChartDataPoint[]; initialRange: ChartRange }

export default function StockChart({ ticker, initialData, initialRange }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const mainSeriesRef = useRef<ISeriesApi<any> | null>(null)
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null)
  
  const [range, setRange] = useState<ChartRange>(initialRange)
  const [chartType, setChartType] = useState<ChartType>('candlestick')
  const [data, setData] = useState<ChartDataPoint[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ohlcv, setOhlcv] = useState<{ o: number; h: number; l: number; c: number; v: number } | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: window.innerWidth < 768 ? 300 : 450
        })
      }
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.02)' },
        horzLines: { color: 'rgba(255,255,255,0.02)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { width: 1, color: 'rgba(217,70,239,0.3)', style: 3, labelBackgroundColor: '#151921' },
        horzLine: { width: 1, color: 'rgba(217,70,239,0.3)', style: 3, labelBackgroundColor: '#151921' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.05)',
        scaleMargins: { top: 0.1, bottom: 0.2 },
        alignLabels: true,
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.05)',
        timeVisible: true,
        fixRightEdge: true,
        barSpacing: 10,
      },
      handleScroll: { vertTouchDrag: false },
      width: chartContainerRef.current.clientWidth,
      height: window.innerWidth < 768 ? 300 : 450,
    })

    chartRef.current = chart
    window.addEventListener('resize', handleResize)

    return () => {
      chart.remove()
      window.removeEventListener('resize', handleResize)
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return

    if (mainSeriesRef.current) {
      chartRef.current.removeSeries(mainSeriesRef.current)
      mainSeriesRef.current = null
    }
    if (volumeSeriesRef.current) {
      chartRef.current.removeSeries(volumeSeriesRef.current)
      volumeSeriesRef.current = null
    }

    const colorUp = '#00ffaa'
    const colorDown = '#ff3366'
    const isUp = data[data.length - 1].close >= data[0].close
    const colorTheme = isUp ? colorUp : colorDown

    if (chartType === 'candlestick') {
      mainSeriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
        upColor: colorUp,
        downColor: colorDown,
        borderVisible: false,
        wickUpColor: colorUp,
        wickDownColor: colorDown,
      })
      mainSeriesRef.current.setData(data.map(d => ({ 
        time: d.time, open: d.open, high: d.high, low: d.low, close: d.close 
      })))
    } else {
      mainSeriesRef.current = chartRef.current.addSeries(LineSeries, {
        color: colorTheme,
        lineWidth: 3,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 5,
        crosshairMarkerBorderColor: '#ffffff',
        crosshairMarkerBackgroundColor: colorTheme,
      })
      mainSeriesRef.current.setData(data.map(d => ({ 
        time: d.time, value: d.close 
      })))
    }

    volumeSeriesRef.current = chartRef.current.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    })
    volumeSeriesRef.current.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    })
    volumeSeriesRef.current.setData(data.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? 'rgba(0, 255, 170, 0.1)' : 'rgba(255, 51, 102, 0.1)',
    })))

    chartRef.current.subscribeCrosshairMove((param: any) => {
      if (!param.time || !param.seriesData || !mainSeriesRef.current) {
        setOhlcv(null); return
      }
      const cd = param.seriesData.get(mainSeriesRef.current)
      const vd = param.seriesData.get(volumeSeriesRef.current)
      if (cd) {
        setOhlcv({
          o: (cd as any).open ?? (cd as any).value ?? 0,
          h: (cd as any).high ?? (cd as any).value ?? 0,
          l: (cd as any).low ?? (cd as any).value ?? 0,
          c: (cd as any).close ?? (cd as any).value ?? 0,
          v: (vd as any)?.value ?? 0
        })
      }
    })

    chartRef.current.timeScale().fitContent()
  }, [data, chartType])

  const changeRange = async (r: ChartRange) => {
    if (r === range) return
    setRange(r); setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/stock?ticker=${ticker}&range=${r}`)
      const result = await res.json()
      if (result.chartData?.length > 0) setData(result.chartData)
      else setError(`Historical data unavailable for ${r}`)
    } catch { setError('Network failure. Check connection.') }
    finally { setLoading(false) }
  }

  const fmt = (v: number) => v >= 1e9 ? (v/1e9).toFixed(1)+'B' : v >= 1e6 ? (v/1e6).toFixed(1)+'M' : (v/1e3).toFixed(1)+'K'

  return (
    <div className="glass-card overflow-hidden group/chart relative z-10 border-white/[0.03]">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-4 mb-3 md:mb-0 overflow-x-auto no-scrollbar">
          {ohlcv ? (
            <div className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] font-bold tracking-tight">
              <span className="text-muted">O <span className="text-primary">{ohlcv.o.toFixed(2)}</span></span>
              <span className="text-muted">H <span className="text-up">{ohlcv.h.toFixed(2)}</span></span>
              <span className="text-muted">L <span className="text-down">{ohlcv.l.toFixed(2)}</span></span>
              <span className="text-muted">C <span className="text-primary">{ohlcv.c.toFixed(2)}</span></span>
              <span className="hidden sm:inline text-muted">VOL <span className="text-accent">{fmt(ohlcv.v)}</span></span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted text-[10px] font-bold uppercase tracking-widest">
              <Activity size={12} className="text-accent animate-pulse" /> Interactive Charts
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/5">
            {(['candlestick', 'line'] as ChartType[]).map(t => (
              <button key={t} onClick={() => setChartType(t)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${chartType === t ? 'bg-accent/20 text-accent' : 'text-muted hover:text-white'}`}>
                {t === 'candlestick' ? 'Candles' : 'Line'}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-xl bg-white/[0.04] text-muted hover:text-white border border-white/5 hidden sm:block">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Range Switcher */}
      <div className="flex items-center gap-1.5 px-6 py-3 bg-white/[0.01] border-b border-white/[0.04] overflow-x-auto no-scrollbar">
        {RANGES.map(r => (
          <button key={r} onClick={() => changeRange(r)}
            className={`px-3 py-1.5 rounded-lg font-mono font-black text-xs transition-all ${range === r ? 'bg-accent text-background shadow-neon-pink' : 'text-muted hover:text-white hover:bg-white/5'}`}>
            {r}
          </button>
        ))}
        {loading && <RefreshCw size={12} className="text-accent animate-spin ml-2" />}
        <div className="ml-auto hidden md:flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-up animate-pulse" />
           <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Live Feed &bull; {ticker}</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative" style={{ minHeight: '300px' }}>
        {error && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 bg-background/80 backdrop-blur-sm text-center">
             <AlertTriangle className="text-down mb-4" size={32} />
             <p className="font-bold text-primary mb-2">{error}</p>
             <button onClick={() => changeRange(range)} className="btn-secondary text-xs flex items-center gap-2">
               <RefreshCw size={12} /> Force Reload
             </button>
          </div>
        )}
        <div ref={chartContainerRef} className={loading ? 'opacity-30' : 'transition-opacity duration-500'} />
        <div className="absolute bottom-6 right-6 pointer-events-none opacity-10">
           <p className="font-['Outfit'] font-black text-4xl text-white tracking-tighter">FINPLAIN</p>
        </div>
      </div>
    </div>
  )
}

function Activity({ size, className }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  )
}
