'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { User } from '@/types/database'
import { getTheme, toggleTheme, initTheme, type Theme } from '@/lib/store'

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [unreadCount] = useState(2) // Mock unread messages

  useEffect(() => {
    initTheme()
    setTheme(getTheme())
  }, [])

  const handleThemeToggle = () => {
    const newTheme = toggleTheme()
    setTheme(newTheme)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium tracking-tight text-white">
            CampusCart
          </Link>

          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">
                  Browse
                </Link>
                <Link href="/new-listing" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">
                  Sell
                </Link>
                <Link href="/messages" className="relative text-white/50 hover:text-white transition-colors p-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-medium flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link href="/wishlist" className="text-white/50 hover:text-white transition-colors p-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
                <button
                  onClick={handleThemeToggle}
                  className="text-white/50 hover:text-white transition-colors p-2"
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <Link href="/profile" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm text-white/60 hover:bg-white/20 transition-colors">
                  {user.name.charAt(0)}
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors">
                  Explore
                </Link>
                <Link href="/dashboard" className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-white/90 transition-all">
                  Enter
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
