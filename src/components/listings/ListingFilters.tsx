'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select } from '@/components/ui/Select'

const categoryOptions = [
  { value: '', label: 'All categories' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'books', label: 'Books' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'misc', label: 'Miscellaneous' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'price_low', label: 'Price: Low to high' },
  { value: 'price_high', label: 'Price: High to low' },
]

export function ListingFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <div className="w-48">
        <Select
          options={categoryOptions}
          value={searchParams.get('category') || ''}
          onChange={(e) => updateFilter('category', e.target.value)}
        />
      </div>
      <div className="w-48">
        <Select
          options={sortOptions}
          value={searchParams.get('sort') || 'newest'}
          onChange={(e) => updateFilter('sort', e.target.value)}
        />
      </div>
      <label className="flex items-center gap-3 text-sm text-white/60 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={searchParams.get('leaving') === 'true'}
            onChange={(e) => updateFilter('leaving', e.target.checked ? 'true' : '')}
            className="sr-only peer"
          />
          <div className="w-5 h-5 border border-white/20 bg-white/5 peer-checked:bg-white peer-checked:border-white transition-all" />
          <svg 
            className="absolute inset-0 w-5 h-5 text-black opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="group-hover:text-white transition-colors">Leaving soon only</span>
      </label>
    </div>
  )
}
