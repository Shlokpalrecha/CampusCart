import Link from 'next/link'
import { ListingWithUser } from '@/types/database'
import { formatPrice, formatRelativeTime, getCategoryLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface ListingCardProps {
  listing: ListingWithUser
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <article className="group card-3d gradient-border rounded-xl overflow-hidden bg-[#0a0a0a] glow-hover transition-all duration-500">
        <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {listing.leaving_soon && (
            <Badge variant="leaving" className="absolute top-3 left-3">
              Leaving soon
            </Badge>
          )}
          {listing.status === 'sold' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="default" className="text-base px-4 py-2">Sold</Badge>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-medium text-white group-hover:text-gradient transition-all line-clamp-1">
              {listing.title}
            </h3>
            <span className="font-semibold text-white whitespace-nowrap">
              {formatPrice(listing.price)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Badge variant="default">{getCategoryLabel(listing.category)}</Badge>
            <span className="text-white/40">{formatRelativeTime(listing.created_at)}</span>
          </div>
          {listing.residence && (
            <p className="text-sm text-white/40 mt-3 truncate">{listing.residence}</p>
          )}
        </div>
      </article>
    </Link>
  )
}
