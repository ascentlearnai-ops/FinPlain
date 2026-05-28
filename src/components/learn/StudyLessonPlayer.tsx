'use client'

import { useMemo, useState } from 'react'
import type { GlossaryTerm, StudyModule } from '@/lib/types'
import { BookOpen, Check, CheckCircle2, Clock3, ExternalLink, HelpCircle, ListVideo, PlaySquare } from 'lucide-react'

interface Props {
  module: StudyModule
  modules: StudyModule[]
  activeModuleId: string
  completedModules: string[]
  moduleTerms: GlossaryTerm[]
  onSelectModule: (moduleId: string) => void
  onComplete: () => void
  onOpenTerm: (term: GlossaryTerm) => void
}

type LessonMode = 'video' | 'quiz'

interface LessonQuizQuestion {
  question: string
  choices: string[]
  answer: string
  explanation: string
}

export default function StudyLessonPlayer({
  module,
  modules,
  activeModuleId,
  completedModules,
  moduleTerms,
  onSelectModule,
  onComplete,
  onOpenTerm,
}: Props) {
  const [mode, setMode] = useState<LessonMode>('video')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const videoUrl = `https://www.youtube-nocookie.com/embed/${module.video.youtubeId}?rel=0&modestbranding=1`
  const completed = completedModules.includes(module.id)
  const lessonNumber = modules.findIndex(courseModule => courseModule.id === activeModuleId) + 1
  const quizQuestions = useMemo(() => buildLessonQuiz(module, moduleTerms), [module, moduleTerms])
  const quizCorrect = quizQuestions.filter((question, index) => answers[answerKey(module.id, index)] === question.answer).length

  const selectVideo = (moduleId: string) => {
    onSelectModule(moduleId)
    setMode('video')
  }

  const selectQuiz = (moduleId: string) => {
    onSelectModule(moduleId)
    setMode('quiz')
  }

  return (
    <section className="overflow-hidden rounded-lg border border-white/[0.1] bg-[#070707]">
      <div className="grid grid-cols-1 xl:grid-cols-12">
        <div className="xl:col-span-8">
          {mode === 'video' ? (
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
          ) : (
            <div className="border-b border-white/[0.08] bg-black p-5 sm:p-7">
              <div className="rounded-lg border border-white/[0.1] bg-white/[0.025] p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase text-muted">
                    Lesson {lessonNumber} quiz
                  </span>
                  <span className="rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase text-muted">
                    5 questions
                  </span>
                </div>
                <h3 className="text-2xl font-black text-primary sm:text-3xl">{module.title} check</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">
                  Answer these after watching the video. The goal is to prove you can explain the idea in normal words, not just recognize a term.
                </p>
                <div className="mt-5 inline-flex rounded-lg border border-white/[0.1] bg-black/30 px-4 py-2 text-xs font-black uppercase text-muted">
                  Score {quizCorrect}/{quizQuestions.length}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase text-muted">
                    Lesson {lessonNumber} / {module.level}
                  </span>
                  <span className="rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase text-muted">
                    {mode === 'video' ? `${module.minutes} min video` : 'Quiz mode'}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-primary sm:text-3xl">{module.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{module.goal}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Use the sidebar like a course playlist: watch the lesson video, then open that lesson quiz before moving to the next topic.
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

            {mode === 'video' ? (
              <LessonRecap lessonNumber={lessonNumber} module={module} />
            ) : (
              <LessonQuiz
                moduleId={module.id}
                lessonNumber={lessonNumber}
                questions={quizQuestions}
                answers={answers}
                onAnswer={(index, answer) => setAnswers(previous => ({ ...previous, [answerKey(module.id, index)]: answer }))}
              />
            )}

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

        <aside className="border-t border-white/[0.08] bg-white/[0.025] xl:col-span-4 xl:border-l xl:border-t-0">
          <div className="border-b border-white/[0.08] p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <ListVideo size={16} />
              <p className="font-black">Course content</p>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Move through each lesson like Udemy: video first, quiz second, then continue.
            </p>
          </div>

          <div className="max-h-[42rem] overflow-y-auto p-3">
            {modules.map((courseModule, index) => {
              const active = courseModule.id === activeModuleId
              const done = completedModules.includes(courseModule.id)

              return (
                <div key={courseModule.id} className="mb-2 overflow-hidden rounded-lg border border-white/[0.08] bg-black/20">
                  <button
                    type="button"
                    onClick={() => selectVideo(courseModule.id)}
                    className={`w-full p-4 text-left transition-colors ${
                      active && mode === 'video'
                        ? 'bg-white text-black'
                        : 'text-secondary hover:bg-white/[0.04] hover:text-primary'
                    }`}
                  >
                    <CourseRow
                      active={active && mode === 'video'}
                      done={done}
                      icon="video"
                      label={`Lesson ${index + 1} video / ${courseModule.level}`}
                      title={courseModule.title}
                      body={courseModule.video.title}
                      meta={`${courseModule.minutes} min`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => selectQuiz(courseModule.id)}
                    className={`w-full border-t border-white/[0.08] p-4 text-left transition-colors ${
                      active && mode === 'quiz'
                        ? 'bg-white text-black'
                        : 'text-secondary hover:bg-white/[0.04] hover:text-primary'
                    }`}
                  >
                    <CourseRow
                      active={active && mode === 'quiz'}
                      done={false}
                      icon="quiz"
                      label={`Lesson ${index + 1} quiz`}
                      title={`${courseModule.title} quiz`}
                      body="5 questions after the video"
                      meta="5 questions"
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </section>
  )
}

function CourseRow({
  active,
  done,
  icon,
  label,
  title,
  body,
  meta,
}: {
  active: boolean
  done: boolean
  icon: 'video' | 'quiz'
  label: string
  title: string
  body: string
  meta: string
}) {
  return (
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
        {done ? <Check size={15} /> : icon === 'video' ? <PlaySquare size={15} /> : <HelpCircle size={15} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-[10px] font-black uppercase ${active ? 'text-black/55' : 'text-muted'}`}>{label}</p>
        <h4 className={`mt-1 text-sm font-black ${active ? 'text-black' : 'text-primary'}`}>{title}</h4>
        <p className={`mt-1 line-clamp-2 text-xs leading-relaxed ${active ? 'text-black/65' : 'text-muted'}`}>{body}</p>
        <div className={`mt-3 flex items-center gap-2 text-[10px] font-black uppercase ${active ? 'text-black/55' : 'text-muted'}`}>
          <Clock3 size={12} />
          {meta}
        </div>
      </div>
    </div>
  )
}

function LessonRecap({ lessonNumber, module }: { lessonNumber: number; module: StudyModule }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-label mb-1">Lesson {lessonNumber} notes</p>
          <h4 className="text-xl font-black text-primary">What to remember after the video</h4>
        </div>
        <div className="hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase text-muted sm:block">
          Recap
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {module.steps.map((step, index) => (
          <div key={step.title} className="rounded-lg border border-white/[0.08] bg-black/20 p-4">
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
  )
}

function LessonQuiz({
  moduleId,
  lessonNumber,
  questions,
  answers,
  onAnswer,
}: {
  moduleId: string
  lessonNumber: number
  questions: LessonQuizQuestion[]
  answers: Record<string, string>
  onAnswer: (index: number, answer: string) => void
}) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-label mb-1">Lesson {lessonNumber} quiz</p>
          <h4 className="text-xl font-black text-primary">Answer 5 questions before the next lesson</h4>
        </div>
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase text-muted">
          5 questions
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const selectedAnswer = answers[answerKey(moduleId, index)] || ''
          const correct = selectedAnswer === question.answer

          return (
            <div key={question.question} className="rounded-lg border border-white/[0.08] bg-black/20 p-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white font-mono text-xs font-black text-black">
                  {index + 1}
                </div>
                <p className="font-black leading-snug text-primary">{question.question}</p>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {question.choices.map(choice => {
                  const selected = selectedAnswer === choice
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => onAnswer(index, choice)}
                      className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                        selected ? 'border-white bg-white text-black' : 'border-white/[0.1] bg-white/[0.03] text-secondary hover:border-white/25 hover:text-primary'
                      }`}
                    >
                      {choice}
                    </button>
                  )
                })}
              </div>
              {selectedAnswer && (
                <p className={`mt-3 text-sm leading-relaxed ${correct ? 'text-primary' : 'text-secondary'}`}>
                  {correct ? 'Correct. ' : 'Not quite. '}
                  {question.explanation}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function answerKey(moduleId: string, index: number) {
  return `${moduleId}:${index}`
}

function buildLessonQuiz(module: StudyModule, terms: GlossaryTerm[]): LessonQuizQuestion[] {
  const questions: LessonQuizQuestion[] = [
    {
      question: module.quickCheck.question,
      choices: module.quickCheck.choices,
      answer: module.quickCheck.answer,
      explanation: module.quickCheck.explanation,
    },
    ...module.steps.map(step => ({
      question: `Which idea matches "${step.title}"?`,
      choices: [step.takeaway, step.example, 'Ignore the source and react fast'],
      answer: step.takeaway,
      explanation: step.takeaway,
    })),
  ]

  terms.slice(0, 2).forEach(term => {
    const distractor = terms.find(candidate => candidate.id !== term.id)
    questions.push({
      question: `What does ${term.term} mean in this lesson?`,
      choices: [
        term.brief || term.definition,
        distractor?.brief || 'A random market headline with no source',
        'A guarantee that a stock will go up',
      ],
      answer: term.brief || term.definition,
      explanation: term.whyItMatters || term.definition,
    })
  })

  return questions.slice(0, 5)
}
