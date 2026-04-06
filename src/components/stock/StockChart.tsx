'use client'
import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, CrosshairMode, LineSeries, CandlestickSeries, HistogramSeries } from 'lightweight-charts'
import type { ChartRange, ChartType, ChartDataPoint } from '@/lib/types'

const RANGES: ChartRange[] = ['1D', '1W', '1M', '3M', '1Y']

interface Props { ticker: string; initialData: ChartDataPoint[]; initialRange: ChartRange }

export default function StockChart({ ticker, initialData, initialRange }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)
  const [range, setRange] = useState<ChartRange>(initialRange)
  const [chartType, setChartType] = useState<ChartType>('candlestick')
  const [data, setData] = useState<ChartDataPoint[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [ohlcv, setOhlcv] = useState<{ o: number; h: number; l: number; c: number; v: number } | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(15, 23, 42, 0.04)' },
        horzLines: { color: 'rgba(15, 23, 42, 0.04)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { width: 1, color: 'rgba(37, 99, 235, 0.3)', style: 3, labelBackgroundColor: '#1e293b' },
        horzLine: { width: 1, color: 'rgba(37, 99, 235, 0.3)', style: 3, labelBackgroundColor: '#1e293b' },
      },
      rightPriceScale: {
        borderColor: 'rgba(15, 23, 42, 0.06)',
        scaleMargins: { top: 0.08, bottom: 0.22 },
      },
      timeScale: {
        borderColor: 'rgba(15, 23, 42, 0.06)',
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
    const isUp = data.length > 0 && data[data.length - 1].close >= data[0].close
    const lineColor = isUp ? '#16a34a' : '#dc2626'
    let mainSeries: any

    if (chartType === 'candlestick') {
      mainSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#16a34a', downColor: '#dc2626',
        borderUpColor: '#16a34a', borderDownColor: '#dc2626',
        wickUpColor: '#16a34a80', wickDownColor: '#dc262680',
      })
      mainSeries.setData(data.map(d => ({ time: d.time, open: d.open, high: d.high, low: d.low, close: d.close })))
    } else {
      mainSeries = chart.addSeries(LineSeries, {
        color: lineColor, lineWidth: 2,
        crosshairMarkerVisible: true, crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: lineColor, crosshairMarkerBackgroundColor: '#ffffff',
        lastValueVisible: true, priceLineVisible: false,
      })
      mainSeries.setData(data.map(d => ({ time: d.time, value: d.close })))
    }

    const volumeSeries = chart.addSeries(HistogramSeries, { priceFormat: { type: 'volume' }, priceScaleId: 'volume' })
    volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } })
    volumeSeries.setData(data.map(d => ({
      time: d.time, value: d.volume,
      color: d.close >= d.open ? 'rgba(22, 163, 74, 0.12)' : 'rgba(220, 38, 38, 0.12)',
    })))

    chart.subscribeCrosshairMove((param: any) => {
      if (!param.time || !param.seriesData) { setOhlcv(null); return }
      const cd = param.seriesData.get(mainSeries)
      const vd = param.seriesData.get(volumeSeries)
      if (cd) setOhlcv({ o: (cd as any).open ?? (cd as any).value ?? 0, h: (cd as any).high ?? (cd as any).value ?? 0, l: (cd as any).low ?? (cd as any).value ?? 0, c: (cd as any).close ?? (cd as any).value ?? 0, v: (vd as any)?.value ?? 0 })
    })

    chart.timeScale().fitContent()
    const ro = new ResizeObserver(() => { if (chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth }) })
    ro.observe(chartContainerRef.current)
    return () => { chart.remove(); ro.disconnect() }
  }, [data, chartType])

  const changeRange = async (r: ChartRange) => {
    setRange(r); setLoading(true)
    try {
      const res = await fetch(`/api/stock?ticker=${ticker}&range=${r}`)
      const result = await res.json()
      if (result.chartData) setData(result.chartData)
    } catch {}
    setLoading(false)
  }

  const fmt = (v: number) => v >= 1e9 ? (v/1e9).toFixed(1)+'B' : v >= 1e6 ? (v/1e6).toFixed(1)+'M' : String(v)

  return (
    <div className="glass-card overflow-hidden">
      {/* OHLCV header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
        <div className="flex items-center gap-4 text-xs font-mono overflow-x-auto">
          {ohlcv ? (
            <>
              <span className="text-muted">O <span className="text-primary">{ohlcv.o.toFixed(2)}</span></span>
              <span className="text-muted">H <span className="text-green-600">{ohlcv.h.toFixed(2)}</span></span>
              <span className="text-muted">L <span className="text-red-600">{ohlcv.l.toFixed(2)}</span></span>
              <span className="text-muted">C <span className="text-primary">{ohlcv.c.toFixed(2)}</span></span>
              <span className="text-muted">Vol <span className="text-secondary">{fmt(ohlcv.v)}</span></span>
            </>
          ) : <span className="text-muted">Hover for OHLCV data</span>}
        </div>
        <div className="flex gap-1 bg-gray-50 rounded-lg p-0.5 ml-4 shrink-0">
          {(['candlestick', 'line'] as ChartType[]).map(t => (
            <button key={t} onClick={() => setChartType(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${chartType === t ? 'bg-white text-accent shadow-sm border border-gray-100' : 'text-muted hover:text-secondary'}`}>
              {t === 'candlestick' ? 'Candle' : 'Line'}
            </button>
          ))}
        </div>
      </div>

      {/* Range tabs */}
      <div className="flex items-center gap-1 px-5 py-2.5 border-b border-gray-50">
        {RANGES.map(r => (
          <button key={r} onClick={() => changeRange(r)}
            className={`px-3.5 py-1.5 rounded-lg font-mono font-semibold text-xs transition-all ${range === r ? 'bg-accent text-white shadow-glow' : 'text-muted hover:text-primary hover:bg-gray-50'}`}>
            {r}
          </button>
        ))}
        <span className="ml-auto font-mono text-[10px] text-muted uppercase tracking-wider">{ticker} · TradingView</span>
      </div>

      {/* Chart */}
      <div className="relative bg-white px-1">
        {loading && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"><div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>}
        <div ref={chartContainerRef} />
      </div>
    </div>
  )
}
