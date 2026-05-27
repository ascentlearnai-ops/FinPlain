'use client'

const CATEGORIES = ['All', 'Tech', 'Energy', 'Finance', 'Economy', 'General']

interface Props {
  activeCategory: string
  onChange: (category: string) => void
}

export default function CategoryFilter({ activeCategory, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
      {CATEGORIES.map(category => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-lg border text-xs font-bold uppercase transition-colors whitespace-nowrap ${
            activeCategory === category
              ? 'bg-white text-black border-white'
              : 'bg-white/[0.03] border-white/[0.1] text-secondary hover:text-primary hover:border-white/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
