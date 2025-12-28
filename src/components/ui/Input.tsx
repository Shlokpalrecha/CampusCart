'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-white/70 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30',
            'focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent',
            'disabled:bg-white/[0.02] disabled:text-white/30',
            'transition-all',
            error && 'border-red-500/50 focus:ring-red-500/30',
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
