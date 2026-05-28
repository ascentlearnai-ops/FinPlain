'use client'

import type { StudyModule } from '@/lib/types'
import type { GlossaryTerm } from '@/lib/types'
import { BookOpen, Check, CheckCircle2, Clock3, ExternalLink, ListVideo, PlaySquare, Target } from 'lucide-react'

interface Props {
  module: StudyModule
  modules: StudyModule[]
  activeModuleId: string
  completedModules: string[]
  moduleTerms: GlossaryTerm[]
  selectedAnswer: string
  answerCorrect: boolean
  onSelectModule: (moduleId: string) => void
  onComplete: () => void
  onAnswer: (answer: string) => void
  onOpenTerm: (term: GlossaryTerm) => void
}

export default function StudyLessonPlayer({
  module,
  modules,
  activeModuleId,
  completedModules,
  moduleTerms,
  selectedAnswer,
  answerCorrect,
  onSelectModule,
  onComplete,
  onAnswer,
  onOpenTerm,
}: Props) {
  const videoUrl = `https://www.youtube-nocookie.com/embed/${module.video.youtubeId}?rel=0&modestbranding=1`
  const completed = completedModules.includes(module.id)
  const lessonNumber = modules.findIndex(courseModule => courseModule.id === activeModuleId) + 1

  return (
    <section className="overflow-hidden rounded-lg border border-white/[0.1] bg-[#070707]">
      <div className="grid grid-cols-1 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div className="border-b border-white/[0.08] bg-black p-3 sm:p-4">
            <div className="aspect-video w-full overflow-hidden rounded-md border border-white/[0.1] bg-[#050505]">
              <iframe
                className="h-full w-full"
                src={videoUrl}
                title={module.video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase text-muted">
                    Lesson {lessonNumber} / {module.level}
                  </span>
                  <span className="rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase text-muted">
                    {module.minutes} min path
                  </span>
                </div>
                <h3 className="text-2xl font-black text-primary sm:text-3xl">{module.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{module.goal}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Watch the video first, then use the lesson notes and quiz below to connect the topic back to real stock research.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <a
                  href={module.video.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-xs font-black uppercase text-primary transition-colors hover:bg-white/[0.08]"
                >
                  Open video <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  onClick={onComplete}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-black uppercase transition-colors ${
                    completed
                      ? 'border-white bg-white text-black'
                      : 'border-white/[0.14] bg-white/[0.04] text-primary hover:bg-white/[0.08]'
                  }`}
                >
                  {completed ? <CheckCircle2 size={15} /> : <Check size={15} />}
                  {completed ? 'Completed' : 'Mark complete'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {module.steps.map((step, index) => (
                <div key={step.title} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white font-mono text-xs font-black text-black">
                      {index + 1}
                    </span>
                    <h4 className="text-sm font-black text-primary">{step.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">{step.body}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">Example: {step.example}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-label mb-1">Lesson {lessonNumber} recap</p>
                  <h4 className="text-xl font-black text-primary">Practice what this video taught</h4>
                </div>
                <div className="hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase text-muted sm:block">
                  Lesson notes
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {module.steps.map((step, index) => (
                  <div key={`${step.title}-recap`} className="rounded-lg border border-white/[0.08] bg-black/20 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white font-mono text-xs font-black text-black">{index + 1}</div>
                      <h5 className="font-black text-primary">{step.title}</h5>
                    </div>
                    <p className="text-sm leading-relaxed text-secondary">{step.takeaway}</p>
                    <div className="mt-4 rounded-md border border-white/[0.08] bg-white/[0.025] p-3">
                      <p className="mb-1 text-[10px] font-black uppercase text-muted">Try this</p>
                      <p className="text-xs leading-relaxed text-secondary">{step.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  <p className="font-black text-primary">Lesson {lessonNumber} quiz</p>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-secondary">{module.quickCheck.question}</p>
                <div className="space-y-2">
                  {module.quickCheck.choices.map(choice => {
                    const selected = selectedAnswer === choice
                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => onAnswer(choice)}
                        className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                          selected ? 'border-white bg-white text-black' : 'border-white/[0.1] bg-white/[0.03] text-secondary hover:border-white/25 hover:text-primary'
                        }`}
                      >
                        {choice}
                      </button>
                    )
                  })}
                </div>
                {selectedAnswer && (
                  <p className={`mt-4 text-sm leading-relaxed ${answerCorrect ? 'text-primary' : 'text-secondary'}`}>
                    {answerCorrect ? 'Correct. ' : 'Not quite. '}
                    {module.quickCheck.explanation}
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" />
                  <p className="font-black text-primary">Lesson {lessonNumber} terms</p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {moduleTerms.map(term => (
                    <button
                      key={term.id}
                      type="button"
                      onClick={() => onOpenTerm(term)}
                      className="rounded-md border border-white/[0.1] bg-white/[0.03] p-3 text-left transition-colors hover:border-white/25"
                    >
                      <p className="text-sm font-black text-primary">{term.term}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{term.brief}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="border-t border-white/[0.08] bg-white/[0.025] xl:col-span-4 xl:border-l xl:border-t-0">
          <div className="border-b border-white/[0.08] p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <ListVideo size={16} />
              <p className="font-black">Course content</p>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Pick a lesson, watch the video, then answer the quick check to save what you learned.
            </p>
          </div>

          <div className="max-h-[34rem] overflow-y-auto p-3">
            {modules.map((courseModule, index) => {
              const active = courseModule.id === activeModuleId
              const done = completedModules.includes(courseModule.id)

              return (
                <button
                  key={courseModule.id}
                  type="button"
                  onClick={() => onSelectModule(courseModule.id)}
                  className={`mb-2 w-full rounded-lg border p-4 text-left transition-colors ${
                    active
                      ? 'border-white bg-white text-black'
                      : 'border-white/[0.08] bg-black/20 text-secondary hover:border-white/25 hover:text-primary'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                        active
                          ? 'border-black/15 bg-black text-white'
                          : done
                            ? 'border-white bg-white text-black'
                            : 'border-white/[0.12] bg-white/[0.03] text-muted'
                      }`}
                    >
                      {done ? <Check size={15} /> : <PlaySquare size={15} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] font-black uppercase ${active ? 'text-black/55' : 'text-muted'}`}>
                        Lesson {index + 1} / {courseModule.level}
                      </p>
                      <h4 className={`mt-1 text-sm font-black ${active ? 'text-black' : 'text-primary'}`}>
                        {courseModule.title}
                      </h4>
                      <p className={`mt-1 line-clamp-2 text-xs leading-relaxed ${active ? 'text-black/65' : 'text-muted'}`}>
                        {courseModule.video.title}
                      </p>
                      <div className={`mt-3 flex items-center gap-2 text-[10px] font-black uppercase ${active ? 'text-black/55' : 'text-muted'}`}>
                        <Clock3 size={12} />
                        {courseModule.minutes} min
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="border-t border-white/[0.08] p-5">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <BookOpen size={16} />
              <p className="font-black">What to learn</p>
            </div>
            <ul className="space-y-2">
              {module.steps.map(step => (
                <li key={step.title} className="rounded-md border border-white/[0.08] bg-black/20 p-3">
                  <p className="text-xs font-black text-primary">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{step.takeaway}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
