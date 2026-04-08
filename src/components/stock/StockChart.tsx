'use client'
import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, CrosshairMode, LineSeries, CandlestickSeries, HistogramSeries, IChartApi, ISeriesApi } from 'lightweight-charts'
import type { ChartRange, ChartType, ChartDataPoint } from '@/lib/types'
import { RefreshCw, AlertTriangle } from 'lucide-react'

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

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#161a1e' },
        textColor: '#5e6673',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.03)' },
        horzLines: { color: 'rgba(255,255,255,0.03)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { width: 1, color: 'rgba(240,185,11,0.3)', style: 3, labelBackgroundColor: '#1e2329' },
        horzLine: { width: 1, color: 'rgba(240,185,11,0.3)', style: 3, labelBackgroundColor: '#1e2329' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.04)',
        scaleMargins: { top: 0.1, bottom: 0.3 },
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.04)',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 8,
        fixRightEdge: true,
      },
      handleScroll: { vertTouchDrag: false },
      width: chartContainerRef.current.clientWidth,
      height: 420,
    })

    chartRef.current = chart

    const ro = new ResizeObserver(() => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    })
    ro.observe(chartContainerRef.current)

    return () => {
      chart.remove()
      ro.disconnect()
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

    const isUp = data[data.length - 1].close >= data[0].close
    const colorUp = '#0ecb81'
    const colorDown = '#f6465d'
    const colorTheme = isUp ? colorUp : colorDown

    if (chartType === 'candlestick') {
      mainSeriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
        upColor: colorUp,
        downColor: colorDown,
        borderUpColor: colorUp,
        borderDownColor: colorDown,
        wickUpColor: `${colorUp}80`,
        wickDownColor: `${colorDown}80`,
      })
      mainSeriesRef.current.setData(data.map(d => ({ 
        time: d.time, open: d.open, high: d.high, low: d.low, close: d.close 
      })))
    } else {
      mainSeriesRef.current = chartRef.current.addSeries(LineSeries, {
        color: colorTheme,
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: colorTheme,
        crosshairMarkerBackgroundColor: '#161a1e',
        lastValueVisible: true,
        priceLineVisible: false,
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
      color: d.close >= d.open ? `${colorUp}15` : `${colorDown}15`,
    })))

    chartRef.current.subscribeCrosshairMove((param: any) => {
      if (!param.time || !param.seriesData || !mainSeriesRef.current) {
        setOhlcv(null)
        return
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
    setRange(r)
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch(`/api/stock?ticker=${ticker}&range=${r}`)
      if (!res.ok) throw new Error('Failed to fetch chart data')
      
      const result = await res.json()
      if (result.chartData && result.chartData.length > 0) {
        setData(result.chartData)
      } else {
        console.warn(`No data for range ${r}`)
        setError(`No chart data available for ${r}`)
      }
    } catch (err) {
      console.error('Chart Toggle Error:', err)
      setError('Could not update chart. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const fmt = (v: number) => v >= 1e9 ? (v/1e9).toFixed(1)+'B' : v >= 1e6 ? (v/1e6).toFixed(1)+'M' : v >= 1e3 ? (v/1e3).toFixed(1)+'K' : String(v)

  return (
    <div className="glass-card overflow-hidden relative z-10">
      {/* OHLCV header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.04] bg-white/[0.01]">
        <div className="flex items-center gap-4 text-[11px] font-mono overflow-x-auto whitespace-nowrap">
          {ohlcv ? (
            <>
              <span className="text-muted">O <span className="text-primary font-bold">{ohlcv.o.toFixed(2)}</span></span>
              <span className="text-muted">H <span className="text-up font-bold">{ohlcv.h.toFixed(2)}</span></span>
              <span className="text-muted">L <span className="text-down font-bold">{ohlcv.l.toFixed(2)}</span></span>
              <span className="text-muted">C <span className="text-primary font-bold">{ohlcv.c.toFixed(2)}</span></span>
              <span className="text-muted">Vol <span className="text-primary font-bold">{fmt(ohlcv.v)}</span></span>
            </>
          ) : <span className="text-muted">Hover chart for details</span>}
        </div>
        <div className="flex gap-1 bg-white/[0.03] rounded-lg p-0.5 ml-4 shrink-0">
          {(['candlestick', 'line'] as ChartType[]).map(t => (
            <button key={t} onClick={() => setChartType(t)}
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${chartType === t ? 'bg-accent/20 text-accent' : 'text-muted hover:text-secondary'}`}>
              {t === 'candlestick' ? 'Candle' : 'Line'}
            </button>
          ))}
        </div>
      </div>

      {/* Range tabs */}
      <div className="flex items-center gap-1 px-5 py-2.5 border-b border-white/[0.04]">
        {RANGES.map(r => (
          <button key={r} onClick={() => changeRange(r)}
            className={`px-3 py-1 rounded-lg font-mono font-bold text-xs transition-all ${range === r ? 'bg-accent text-dark' : 'text-muted hover:text-primary hover:bg-white/[0.04]'}`}>
            {r}
          </button>
        ))}
        {loading && <div className="ml-3 w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />}
        <span className="ml-auto font-mono text-[9px] text-muted uppercase tracking-widest">{ticker} · REAL-TIME</span>
      </div>

      {/* Chart */}
      <div className="relative min-h-[420px]" style={{ background: '#161a1e' }}>
        {error && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-10 h-10 bg-down/10 rounded-full flex items-center justify-center mb-3">
              <AlertTriangle className="text-down" size={20} />
            </div>
            <p className="text-sm font-semibold text-primary mb-1">{error}</p>
            <button onClick={() => changeRange(range)} className="text-xs text-accent font-bold hover:underline flex items-center gap-1">
              <RefreshCw size={10} /> Retry
            </button>
          </div>
        )}
        
        <div ref={chartContainerRef} className={error ? 'opacity-20 transition-opacity' : 'transition-opacity'} />
        
        {loading && <div className="absolute inset-0 bg-[#161a1e]/60 backdrop-blur-[1px] z-10 transition-all" />}
      </div>
    </div>
  )
}
