'use client'
const CATEGORIES = ['All', 'Tech', 'Energy', 'Finance', 'Economy']

interface Props { activeCategory: string; onChange: (c: string) => void }

export default function CategoryFilter({ activeCategory, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {CATEGORIES.map(cat => (
        <button key={cat} onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border ${
            activeCategory === cat
              ? 'btn-primary border-transparent'
              : 'bg-white border-gray-200 text-secondary hover:border-accent/30 hover:text-primary'
          }`}>
          {cat}
        </button>
      ))}
    </div>
  )
}
