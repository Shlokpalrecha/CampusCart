// Allowed university email domains
const ALLOWED_DOMAINS = [
  'lse.ac.uk',
  'bennett.edu.in',
  'spit.ac.in',
  // Generic patterns
  '.ac.uk',
  '.edu',
  '.edu.in',
  '.ac.in'
]

export function isValidUniversityEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false
  
  return ALLOWED_DOMAINS.some(allowed => {
    if (allowed.startsWith('.')) {
      return domain.endsWith(allowed)
    }
    return domain === allowed
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(price)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    furniture: 'Furniture',
    books: 'Books',
    electronics: 'Electronics',
    misc: 'Miscellaneous',
  }
  return labels[category] || category
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'Active',
    sold: 'Sold',
    expired: 'Expired',
  }
  return labels[status] || status
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
