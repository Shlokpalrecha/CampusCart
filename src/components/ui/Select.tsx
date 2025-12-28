'use client'

import { cn } from '@/lib/utils'
import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-white/70 mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 bg-white/5 border border-white/10 text-white',
            'focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent',
            'disabled:bg-white/[0.02] disabled:text-white/30',
            'transition-all appearance-none cursor-pointer',
            error && 'border-red-500/50 focus:ring-red-500/30',
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '20px',
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0a0a0a] text-white">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
