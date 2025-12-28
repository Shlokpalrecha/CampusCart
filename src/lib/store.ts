'use client'

// Simple client-side store for wishlist, recently viewed, theme, etc.

const WISHLIST_KEY = 'campuscart_wishlist'
const RECENT_KEY = 'campuscart_recent'
const THEME_KEY = 'campuscart_theme'

// Wishlist
export function getWishlist(): string[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(WISHLIST_KEY)
  return data ? JSON.parse(data) : []
}

export function addToWishlist(listingId: string): void {
  const wishlist = getWishlist()
  if (!wishlist.includes(listingId)) {
    wishlist.push(listingId)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }
}

export function removeFromWishlist(listingId: string): void {
  const wishlist = getWishlist().filter(id => id !== listingId)
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
}

export function isInWishlist(listingId: string): boolean {
  return getWishlist().includes(listingId)
}

// Recently Viewed
export function getRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(RECENT_KEY)
  return data ? JSON.parse(data) : []
}

export function addToRecentlyViewed(listingId: string): void {
  let recent = getRecentlyViewed().filter(id => id !== listingId)
  recent.unshift(listingId)
  recent = recent.slice(0, 10) // Keep only last 10
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent))
}

// Theme
export type Theme = 'dark' | 'light'

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return (localStorage.getItem(THEME_KEY) as Theme) || 'dark'
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme)
  document.documentElement.classList.toggle('light-mode', theme === 'light')
}

export function toggleTheme(): Theme {
  const current = getTheme()
  const next = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}

// Initialize theme on load
export function initTheme(): void {
  if (typeof window === 'undefined') return
  const theme = getTheme()
  document.documentElement.classList.toggle('light-mode', theme === 'light')
}
