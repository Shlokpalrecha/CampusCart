'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { SearchBar } from '@/components/SearchBar'
import { Badge } from '@/components/ui/Badge'
import { mockUser, mockCampus } from '@/lib/mock-user'
import { getWishlist, getRecentlyViewed } from '@/lib/store'
import Link from 'next/link'

// Inline mock data to avoid import issues
const mockListings = [
  {
    id: '1',
    title: 'IKEA Desk Lamp',
    description: 'Great condition, barely used. Perfect for late night study sessions.',
    price: 15,
    category: 'furniture' as const,
    leaving_soon: true,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Engineering Mathematics Textbook',
    description: 'All semesters covered. Some highlighting but pages in good condition.',
    price: 25,
    category: 'books' as const,
    leaving_soon: false,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Mini Fridge - 50L',
    description: 'Perfect for dorm room. Works perfectly, selling because graduating.',
    price: 80,
    category: 'electronics' as const,
    leaving_soon: true,
    image_url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    title: 'Ergonomic Office Chair',
    description: 'Adjustable height, lumbar support. Used for one year, excellent condition.',
    price: 120,
    category: 'furniture' as const,
    leaving_soon: false,
    image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
]

const leaderboard = {
  sellers: [
    { name: 'Sneha Gupta', sales: 23, rating: 5.0, avatar: 'S' },
    { name: 'Rahul Verma', sales: 19, rating: 4.9, avatar: 'R' },
    { name: 'Kavya Reddy', sales: 15, rating: 4.8, avatar: 'K' },
  ],
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [wishlist, setWishlist] = useState<string[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])
  
  useEffect(() => {
    setWishlist(getWishlist())
    setRecentlyViewed(getRecentlyViewed())
  }, [])

  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'newest'
  const leaving = searchParams.get('leaving') === 'true'
  const search = searchParams.get('q') || ''

  // Filter listings
  let listings = [...mockListings]
  
  if (search) {
    const q = search.toLowerCase()
    listings = listings.filter(l => 
      l.title.toLowerCase().includes(q) || 
      l.description.toLowerCase().includes(q)
    )
  }
  
  if (category) {
    listings = listings.filter(l => l.category === category)
  }
  
  if (leaving) {
    listings = listings.filter(l => l.leaving_soon)
  }
  
  // Sort
  switch (sort) {
    case 'oldest':
      listings.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      break
    case 'price_low':
      listings.sort((a, b) => a.price - b.price)
      break
    case 'price_high':
      listings.sort((a, b) => b.price - a.price)
      break
    default:
      listings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  // Get recently viewed listings
  const recentItems = recentlyViewed
    .map(id => mockListings.find(l => l.id === id))
    .filter(Boolean)
    .slice(0, 4)

  // Get saved listings
  const savedItems = wishlist
    .map(id => mockListings.find(l => l.id === id))
    .filter(Boolean)
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-[#030303]">
      <Header user={mockUser} />
      
      <main className="flex-1">
        {/* Seasonal Banner */}
        <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-white text-black text-xs font-medium">MOVE-OUT SALE</span>
                <span className="text-white/60 text-sm">Graduation season deals - items going fast!</span>
              </div>
              <Link href="/dashboard?leaving=true" className="text-sm text-white/40 hover:text-white transition-colors">
                View all →
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-2">{mockCampus.name}</p>
              <h1 className="text-3xl font-light tracking-tight text-white">Marketplace</h1>
            </div>
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 border border-white/5 bg-white/[0.01]">
              <div className="text-2xl font-light text-white">{mockListings.length}</div>
              <div className="text-xs text-white/30">Active listings</div>
            </div>
            <div className="p-4 border border-white/5 bg-white/[0.01]">
              <div className="text-2xl font-light text-white">{mockListings.filter(l => l.leaving_soon).length}</div>
              <div className="text-xs text-white/30">Leaving soon</div>
            </div>
            <div className="p-4 border border-white/5 bg-white/[0.01]">
              <div className="text-2xl font-light text-white">{savedItems.length}</div>
              <div className="text-xs text-white/30">Saved items</div>
            </div>
            <div className="p-4 border border-white/5 bg-white/[0.01]">
              <div className="text-2xl font-light text-white">{recentItems.length}</div>
              <div className="text-xs text-white/30">Recently viewed</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <select
              value={category}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString())
                if (e.target.value) params.set('category', e.target.value)
                else params.delete('category')
                window.history.pushState({}, '', `/dashboard?${params.toString()}`)
                window.location.reload()
              }}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="">All categories</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="misc">Miscellaneous</option>
            </select>
            
            <select
              value={sort}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString())
                params.set('sort', e.target.value)
                window.history.pushState({}, '', `/dashboard?${params.toString()}`)
                window.location.reload()
              }}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="price_low">Price: Low to high</option>
              <option value="price_high">Price: High to low</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-white/50 cursor-pointer">
              <input
                type="checkbox"
                checked={leaving}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString())
                  if (e.target.checked) params.set('leaving', 'true')
                  else params.delete('leaving')
                  window.history.pushState({}, '', `/dashboard?${params.toString()}`)
                  window.location.reload()
                }}
                className="w-4 h-4 bg-white/5 border-white/20"
              />
              Leaving soon only
            </label>

            {search && (
              <Badge variant="default">
                Search: "{search}"
                <button 
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.delete('q')
                    window.location.href = `/dashboard?${params.toString()}`
                  }}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <ListingGrid listings={listings as any} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <div className="border border-white/5 bg-white/[0.01] p-5">
                <h3 className="text-sm font-medium text-white mb-4">Top Sellers</h3>
                <div className="space-y-3">
                  {leaderboard.sellers.slice(0, 5).map((seller, i) => (
                    <div key={seller.name} className="flex items-center gap-3">
                      <span className="text-xs text-white/30 w-4">{i + 1}</span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                        {seller.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{seller.name}</p>
                        <p className="text-xs text-white/30">{seller.sales} sales</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-white/50">{seller.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Viewed */}
              {recentItems.length > 0 && (
                <div className="border border-white/5 bg-white/[0.01] p-5">
                  <h3 className="text-sm font-medium text-white mb-4">Recently Viewed</h3>
                  <div className="space-y-3">
                    {recentItems.map((item: any) => (
                      <Link key={item.id} href={`/listing/${item.id}`} className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-white/5 overflow-hidden flex-shrink-0">
                          <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate group-hover:text-white/80">{item.title}</p>
                          <p className="text-xs text-white/30">£{item.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Items */}
              {savedItems.length > 0 && (
                <div className="border border-white/5 bg-white/[0.01] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">Saved Items</h3>
                    <Link href="/wishlist" className="text-xs text-white/40 hover:text-white">View all</Link>
                  </div>
                  <div className="space-y-3">
                    {savedItems.map((item: any) => (
                      <Link key={item.id} href={`/listing/${item.id}`} className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-white/5 overflow-hidden flex-shrink-0">
                          <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate group-hover:text-white/80">{item.title}</p>
                          <p className="text-xs text-white/30">£{item.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Referral */}
              <div className="border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-medium text-white mb-2">Invite Friends</h3>
                <p className="text-xs text-white/40 mb-4">Share CampusCart with classmates</p>
                <button className="w-full px-4 py-2 bg-white/10 text-white text-sm hover:bg-white/20 transition-colors">
                  Copy Referral Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
