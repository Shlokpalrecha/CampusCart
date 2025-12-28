export const allListings = [
  {
    id: '1',
    title: 'IKEA Desk Lamp',
    description: 'Great condition, barely used. Perfect for late night study sessions.',
    price: 15,
    category: 'furniture' as const,
    leaving_soon: true,
    residence: 'Hostel Block A, Room 102',
    expires_at: new Date(Date.now() + 5 * 86400000).toISOString(),
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'],
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    created_at: new Date().toISOString(),
    views: 45,
    saves: 12,
    users: { name: 'Test Student', rating: 4.8, reviews: 15, verified: true },
  },
  {
    id: '2',
    title: 'Engineering Mathematics Textbook',
    description: 'All semesters covered. Some highlighting but pages in good condition.',
    price: 25,
    category: 'books' as const,
    leaving_soon: false,
    residence: null,
    expires_at: null,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'],
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    views: 89,
    saves: 23,
    users: { name: 'Priya Sharma', rating: 4.5, reviews: 8, verified: true },
  },
  {
    id: '3',
    title: 'Mini Fridge - 50L',
    description: 'Perfect for dorm room. Works perfectly, selling because graduating.',
    price: 80,
    category: 'electronics' as const,
    leaving_soon: true,
    residence: 'Hostel Block B, Room 204',
    expires_at: new Date(Date.now() + 3 * 86400000).toISOString(),
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80'],
    image_url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    views: 156,
    saves: 45,
    users: { name: 'Rahul Verma', rating: 4.9, reviews: 22, verified: true },
  },
  {
    id: '4',
    title: 'Ergonomic Office Chair',
    description: 'Adjustable height, lumbar support. Excellent condition.',
    price: 120,
    category: 'furniture' as const,
    leaving_soon: false,
    residence: 'Off-campus, Andheri West',
    expires_at: null,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80'],
    image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    views: 78,
    saves: 19,
    users: { name: 'Ananya Patel', rating: 4.7, reviews: 11, verified: true },
  },
]

export const topSellers = [
  { name: 'Sneha Gupta', sales: 23, rating: 5.0, avatar: 'S' },
  { name: 'Rahul Verma', sales: 19, rating: 4.9, avatar: 'R' },
  { name: 'Kavya Reddy', sales: 15, rating: 4.8, avatar: 'K' },
]

export const userReviews = [
  { id: '1', reviewer: 'Amit Kumar', rating: 5, comment: 'Great seller!', date: '2 days ago' },
  { id: '2', reviewer: 'Neha Singh', rating: 5, comment: 'Quick response.', date: '1 week ago' },
]

export function findListing(id: string) {
  return allListings.find(l => l.id === id)
}

export function similarListings(listing: typeof allListings[0]) {
  return allListings.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 3)
}
