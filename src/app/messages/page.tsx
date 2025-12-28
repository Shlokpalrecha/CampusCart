import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { mockUser } from '@/lib/mock-user'
import Link from 'next/link'
import { formatRelativeTime } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

const mockConversations = [
  {
    id: '1',
    listingTitle: 'Engineering Mathematics Textbook',
    listingImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&q=80',
    otherUser: { name: 'Another Student', email: 'other@spit.ac.in' },
    lastMessage: 'Is this still available?',
    lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 1,
  },
  {
    id: '2',
    listingTitle: 'Mini Fridge',
    listingImage: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=100&q=80',
    otherUser: { name: 'Graduating Senior', email: 'senior@spit.ac.in' },
    lastMessage: 'Can you do 70?',
    lastMessageAt: new Date(Date.now() - 86400000).toISOString(),
    unreadCount: 0,
  },
  {
    id: '3',
    listingTitle: 'Ergonomic Office Chair',
    listingImage: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&q=80',
    otherUser: { name: 'Final Year', email: 'final@spit.ac.in' },
    lastMessage: 'When can I pick it up?',
    lastMessageAt: new Date(Date.now() - 172800000).toISOString(),
    unreadCount: 0,
  },
]

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030303] noise">
      <Header user={mockUser} />
      
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-10">
            <span className="text-sm uppercase tracking-widest text-white/40 mb-2 block">Inbox</span>
            <h1 className="text-3xl font-medium tracking-tight text-white">
              Messages
            </h1>
          </div>
          
          {mockConversations.length === 0 ? (
            <div className="text-center py-20 glass rounded-xl">
              <svg className="w-16 h-16 mx-auto mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-white/50 text-lg">No messages yet</p>
              <p className="text-white/30 text-sm mt-2">Messages from other students will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockConversations.map((conv) => (
                <Link
                  key={conv.id}
                  href="#"
                  className="block gradient-border rounded-xl p-5 bg-[#0a0a0a] hover:bg-white/[0.02] transition-all glow-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                      <img src={conv.listingImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white">{conv.otherUser.name}</span>
                          {conv.unreadCount > 0 && (
                            <Badge variant="leaving">{conv.unreadCount}</Badge>
                          )}
                        </div>
                        <span className="text-xs text-white/40 whitespace-nowrap">
                          {formatRelativeTime(conv.lastMessageAt)}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 mb-2">Re: {conv.listingTitle}</p>
                      <p className="text-sm text-white/70 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
