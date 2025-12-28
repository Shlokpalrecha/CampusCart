'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate, formatPrice, getCategoryLabel, getStatusLabel } from '@/lib/utils'
import { mockUser, mockCampus } from '@/lib/mock-user'
import { allListings, userReviews } from '@/lib/listings-data'
import Link from 'next/link'

const userStats = {
  rating: 4.8,
  reviews: 15,
  sales: 8,
  purchases: 12,
  responseTime: '< 1 hour',
  memberSince: mockUser.created_at,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings')
  const [copied, setCopied] = useState(false)

  const userListings = allListings.slice(0, 2) // Show first 2 as user's listings

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://campuscart.com/ref/${mockUser.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030303]">
      <Header user={mockUser} />
      
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12 pb-12 border-b border-white/5">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl text-white/60">
                {mockUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-light text-white">{mockUser.name}</h1>
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <Badge variant="default">{mockUser.role}</Badge>
                </div>
                <p className="text-white/50 mb-1">{mockUser.email}</p>
                <p className="text-white/30 text-sm">{mockCampus.name}</p>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white font-medium">{userStats.rating}</span>
                    <span className="text-white/40">({userStats.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border border-white/5 bg-white/[0.01] text-center">
                <div className="text-2xl font-light text-white">{userStats.sales}</div>
                <div className="text-xs text-white/30">Sales</div>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.01] text-center">
                <div className="text-2xl font-light text-white">{userStats.purchases}</div>
                <div className="text-xs text-white/30">Purchases</div>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.01] text-center">
                <div className="text-2xl font-light text-white">{userStats.responseTime}</div>
                <div className="text-xs text-white/30">Response</div>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.01] text-center">
                <div className="text-2xl font-light text-white">{formatDate(userStats.memberSince).split(' ')[1]}</div>
                <div className="text-xs text-white/30">Member since</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-6 mb-6 border-b border-white/5">
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`pb-4 text-sm font-medium transition-colors ${
                    activeTab === 'listings' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  Listings ({userListings.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 text-sm font-medium transition-colors ${
                    activeTab === 'reviews' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  Reviews ({userReviews.length})
                </button>
              </div>

              {activeTab === 'listings' ? (
                <div className="space-y-4">
                  {userListings.length > 0 ? (
                    userListings.map((listing) => (
                      <Link
                        key={listing.id}
                        href={`/listing/${listing.id}`}
                        className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors"
                      >
                        <div className="w-20 h-20 bg-white/5 overflow-hidden flex-shrink-0">
                          <img src={listing.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white truncate">{listing.title}</span>
                            {listing.leaving_soon && <Badge variant="leaving">Leaving</Badge>}
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-white/50">{getCategoryLabel(listing.category)}</span>
                            <Badge variant={listing.status === 'active' ? 'success' : 'default'}>
                              {getStatusLabel(listing.status)}
                            </Badge>
                          </div>
                          <p className="text-xs text-white/30 mt-1">{listing.views} views • {listing.saves} saves</p>
                        </div>
                        <span className="font-medium text-white">{formatPrice(listing.price)}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-12 border border-white/5 bg-white/[0.01]">
                      <p className="text-white/50 mb-4">No listings yet</p>
                      <Link href="/new-listing">
                        <Button variant="secondary">Create your first listing</Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="p-4 border border-white/5 bg-white/[0.01]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                            {review.reviewer.charAt(0)}
                          </div>
                          <span className="text-white">{review.reviewer}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-white/10'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-white/60">{review.comment}</p>
                      <p className="text-xs text-white/30 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/new-listing" className="block">
                    <Button variant="secondary" className="w-full justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New listing
                    </Button>
                  </Link>
                  <Link href="/messages" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Messages
                    </Button>
                  </Link>
                  <Link href="/wishlist" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Saved items
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Referral */}
              <Card>
                <CardHeader>
                  <CardTitle>Invite Friends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/40 mb-4">
                    Share CampusCart with your classmates and help grow the community.
                  </p>
                  <Button variant="secondary" className="w-full" onClick={copyReferralLink}>
                    {copied ? 'Copied!' : 'Copy Referral Link'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
