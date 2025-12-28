'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDate, getCategoryLabel } from '@/lib/utils'
import { mockUser } from '@/lib/mock-user'
import { findListing, similarListings, userReviews } from '@/lib/listings-data'
import { addToWishlist, removeFromWishlist, isInWishlist, addToRecentlyViewed } from '@/lib/store'
import { use } from 'react'

interface ListingPageProps {
  params: Promise<{ id: string }>
}

export default function ListingPage({ params }: ListingPageProps) {
  const { id } = use(params)
  const listing = findListing(id)
  
  const [saved, setSaved] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [showOffer, setShowOffer] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')
  const [copied, setCopied] = useState(false)
  const [reported, setReported] = useState(false)

  useEffect(() => {
    if (listing) {
      setSaved(isInWishlist(listing.id))
      addToRecentlyViewed(listing.id)
    }
  }, [listing])

  if (!listing) notFound()

  const seller = listing.users
  const isOwner = false
  const similar = similarListings(listing)

  const toggleSave = () => {
    if (saved) {
      removeFromWishlist(listing.id)
    } else {
      addToWishlist(listing.id)
    }
    setSaved(!saved)
  }

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const submitOffer = () => {
    alert(`Offer of £${offerAmount} sent to ${seller.name}!`)
    setShowOffer(false)
    setOfferAmount('')
  }

  const reportListing = () => {
    setReported(true)
    alert('Thank you for reporting. We will review this listing.')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030303]">
      <Header user={mockUser} />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to listings
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="border border-white/10 bg-white/[0.02] mb-4 relative">
                <img
                  src={listing.images[currentImage]}
                  alt={listing.title}
                  className="w-full aspect-square object-cover"
                />
                {listing.leaving_soon && (
                  <Badge variant="leaving" className="absolute top-4 left-4">Leaving soon</Badge>
                )}
                {/* Image navigation */}
                {listing.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentImage(i => i > 0 ? i - 1 : listing.images.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                    >
                      ‹
                    </button>
                    <button 
                      onClick={() => setCurrentImage(i => i < listing.images.length - 1 ? i + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex gap-2">
                  {listing.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-20 h-20 border ${currentImage === i ? 'border-white/40' : 'border-white/10'} overflow-hidden`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default">{getCategoryLabel(listing.category)}</Badge>
                <span className="text-white/30 text-sm">{listing.views} views • {listing.saves} saves</span>
              </div>

              <h1 className="text-3xl font-light text-white mb-4">{listing.title}</h1>
              <p className="text-4xl font-light text-white mb-6">{formatPrice(listing.price)}</p>

              {/* Quick Actions */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={toggleSave}
                  className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                    saved ? 'border-white bg-white text-black' : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
                  }`}
                >
                  <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={shareLink}
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {copied ? 'Copied!' : 'Share'}
                </button>
                {!isOwner && (
                  <button
                    onClick={reportListing}
                    disabled={reported}
                    className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white/40 hover:text-red-400 hover:border-red-400/40 transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {reported ? 'Reported' : 'Report'}
                  </button>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm mb-8 pb-8 border-b border-white/5">
                {listing.residence && (
                  <div className="flex gap-3">
                    <span className="text-white/40 w-24">Location</span>
                    <span className="text-white/70">{listing.residence}</span>
                  </div>
                )}
                <div className="flex gap-3">
                  <span className="text-white/40 w-24">Posted</span>
                  <span className="text-white/70">{formatDate(listing.created_at)}</span>
                </div>
                {listing.expires_at && (
                  <div className="flex gap-3">
                    <span className="text-white/40 w-24">Expires</span>
                    <span className="text-white/70">{formatDate(listing.expires_at)}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-sm text-white/40 uppercase tracking-wider mb-3">Description</h2>
                <p className="text-white/70 leading-relaxed">{listing.description}</p>
              </div>

              {/* Seller */}
              <div className="border border-white/10 bg-white/[0.02] p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-xl text-white/60">
                    {seller.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{seller.name}</span>
                      {seller.verified && (
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{seller.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{seller.reviews} reviews</span>
                    </div>
                  </div>
                </div>

                {/* Reviews Preview */}
                <div className="border-t border-white/5 pt-4 mt-4">
                  <h4 className="text-xs text-white/40 uppercase tracking-wider mb-3">Recent Reviews</h4>
                  <div className="space-y-3">
                    {userReviews.slice(0, 2).map(review => (
                      <div key={review.id} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white/70">{review.reviewer}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <svg key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-white/50">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isOwner ? (
                <div className="space-y-3">
                  <p className="text-sm text-white/40">This is your listing</p>
                  <Button className="w-full" size="lg">Mark as sold</Button>
                  <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    Delete listing
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message seller
                  </Button>
                  
                  {!showOffer ? (
                    <Button variant="outline" className="w-full" size="lg" onClick={() => setShowOffer(true)}>
                      Make an offer
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">£</span>
                        <input
                          type="number"
                          value={offerAmount}
                          onChange={(e) => setOfferAmount(e.target.value)}
                          placeholder="Your offer"
                          className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                      </div>
                      <Button onClick={submitOffer} disabled={!offerAmount}>Send</Button>
                      <Button variant="ghost" onClick={() => setShowOffer(false)}>Cancel</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Similar Items */}
          {similar.length > 0 && (
            <div className="mt-16 pt-16 border-t border-white/5">
              <h2 className="text-xl font-light text-white mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((item) => (
                  <Link key={item.id} href={`/listing/${item.id}`} className="group border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-light mb-1">{item.title}</h3>
                      <p className="text-white/50">{formatPrice(item.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
