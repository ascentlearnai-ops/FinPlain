'use client'

import { useEffect, useMemo, useState } from 'react'
import type { StudyModule } from '@/lib/types'
import { BookOpen, CheckCircle2, Clock3, Pause, Play, RotateCcw } from 'lucide-react'

interface Props {
  module: StudyModule
  completed: boolean
  onComplete: () => void
}

const VIDEO_DURATION_SECONDS = 300

export default function StudyLessonPlayer({ module, completed, onComplete }: Props) {
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const chapters = useMemo(() => buildChapters(module), [module])
  const activeChapter = chapters.findLast(chapter => elapsed >= chapter.startsAt) || chapters[0]
  const progress = Math.min(100, (elapsed / VIDEO_DURATION_SECONDS) * 100)

  useEffect(() => {
    setPlaying(false)
    setElapsed(0)
  }, [module.id])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setElapsed(previous => {
        const next = Math.min(VIDEO_DURATION_SECONDS, previous + 1)
        if (next >= VIDEO_DURATION_SECONDS) setPlaying(false)
        return next
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [playing])

  useEffect(() => {
    if (elapsed >= VIDEO_DURATION_SECONDS && !completed) {
      onComplete()
    }
  }, [completed, elapsed, onComplete])

  return (
    <section className="rounded-lg border border-white/[0.1] bg-[#070707] overflow-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div className="study-video-frame">
            <div className="study-video-grid" />
            <div className="study-video-orbit" />
            <div className="study-video-panel">
              <p className="text-[10px] font-black uppercase text-muted">5 minute lesson</p>
              <h3 className="mt-2 text-2xl sm:text-4xl font-black text-primary">{module.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-secondary">{activeChapter.videoLine}</p>
            </div>

            <div className="study-video-chart" aria-hidden="true">
              {[42, 58, 49, 72, 64, 84, 76].map((height, index) => (
                <div key={`${module.id}-${index}`} style={{ height: `${height}%`, animationDelay: `${index * 0.12}s` }} />
              ))}
            </div>

            <div className="study-video-card">
              <span>{activeChapter.label}</span>
              <strong>{activeChapter.title}</strong>
              <p>{activeChapter.takeaway}</p>
            </div>
          </div>

          <div className="border-t border-white/[0.08] bg-black/40 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlaying(value => !value)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-black"
                  aria-label={playing ? 'Pause lesson video' : 'Play lesson video'}
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  type="button"
                  onClick={() => { setElapsed(0); setPlaying(false) }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-muted hover:text-primary"
                  aria-label="Restart lesson video"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
              <div className="font-mono text-xs font-black text-muted">
                {formatTime(elapsed)} / 05:00
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full rounded-full bg-white transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {chapters.map(chapter => (
                <button
                  key={chapter.title}
                  type="button"
                  onClick={() => setElapsed(chapter.startsAt)}
                  className={`rounded-md border px-3 py-2 text-left transition-colors ${
                    activeChapter.title === chapter.title
                      ? 'border-white bg-white text-black'
                      : 'border-white/[0.1] bg-white/[0.03] text-secondary hover:text-primary'
                  }`}
                >
                  <span className={`block font-mono text-[10px] font-black ${activeChapter.title === chapter.title ? 'text-black/60' : 'text-muted'}`}>
                    {formatTime(chapter.startsAt)}
                  </span>
                  <span className="mt-1 block text-xs font-black">{chapter.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="xl:col-span-4 border-t xl:border-t-0 xl:border-l border-white/[0.08] bg-white/[0.025] p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-label mb-2">Lesson notes</p>
              <h4 className="text-xl font-black text-primary">Compact course view</h4>
            </div>
            <div className={`flex h-9 w-9 items-center justify-center rounded-md border ${completed ? 'border-white bg-white text-black' : 'border-white/[0.12] text-muted'}`}>
              <CheckCircle2 size={17} />
            </div>
          </div>

          <div className="space-y-3">
            {module.steps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-white/[0.08] bg-black/20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-black text-black">{index + 1}</span>
                  <p className="font-black text-sm text-primary">{step.title}</p>
                </div>
                <p className="text-xs leading-relaxed text-secondary">{step.body}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">Example: {step.example}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <LessonMeta icon={Clock3} label="Length" value="5 min" />
            <LessonMeta icon={BookOpen} label="Level" value={module.level} />
          </div>
        </aside>
      </div>
    </section>
  )
}

function LessonMeta({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-black/20 p-3">
      <div className="mb-2 flex items-center gap-2 text-muted">
        <Icon size={13} />
        <span className="text-[10px] font-black uppercase">{label}</span>
      </div>
      <p className="text-sm font-black text-primary">{value}</p>
    </div>
  )
}

function buildChapters(module: StudyModule) {
  const chapterTimes = [0, 75, 150, 225]
  const stepChapters = module.steps.slice(0, 3).map((step, index) => ({
    startsAt: chapterTimes[index + 1],
    label: `Lesson ${index + 1}`,
    title: step.title,
    videoLine: step.body,
    takeaway: step.takeaway,
  }))

  return [
    {
      startsAt: 0,
      label: 'Intro',
      title: 'What you will learn',
      videoLine: module.goal,
      takeaway: module.description,
    },
    ...stepChapters,
  ]
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}
