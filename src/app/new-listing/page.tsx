'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { mockUser } from '@/lib/mock-user'

const categoryOptions = [
  { value: '', label: 'Select category' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'books', label: 'Books' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'misc', label: 'Miscellaneous' },
]

export default function NewListingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    residence: '',
    leavingSoon: false,
    expiresInDays: '7',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    alert('Listing created! (Demo mode)')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] noise">
      <Header user={mockUser} />
      
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="mb-10">
            <span className="text-sm uppercase tracking-widest text-white/40 mb-2 block">Sell</span>
            <h1 className="text-3xl font-medium tracking-tight text-white">
              Create a listing
            </h1>
          </div>

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Photo
                  </label>
                  <div className="border border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                    <svg className="w-12 h-12 mx-auto mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white/50 mb-2">Click to upload an image</p>
                    <p className="text-white/30 text-sm">PNG, JPG up to 10MB</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                </div>

                <Input
                  id="title"
                  label="Title"
                  type="text"
                  required
                  placeholder="What are you selling?"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <Textarea
                  id="description"
                  label="Description"
                  rows={4}
                  placeholder="Describe your item..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="price"
                    label="Price (£)"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />

                  <Select
                    id="category"
                    label="Category"
                    options={categoryOptions}
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                <Input
                  id="residence"
                  label="Location (optional)"
                  type="text"
                  placeholder="e.g., Hostel Block A, Room 204"
                  value={formData.residence}
                  onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                />

                {/* Leaving Soon Toggle */}
                <div className="glass rounded-xl p-6">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        checked={formData.leavingSoon}
                        onChange={(e) => setFormData({ ...formData, leavingSoon: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 border border-white/20 bg-white/5 peer-checked:bg-white peer-checked:border-white transition-all rounded" />
                      <svg 
                        className="absolute inset-0 w-5 h-5 text-black opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white">Leaving Campus Mode</span>
                      <p className="text-sm text-white/50 mt-1">
                        Mark this listing as urgent. It will be highlighted and auto-expire after your departure.
                      </p>
                    </div>
                  </label>

                  {formData.leavingSoon && (
                    <div className="mt-6 pl-9">
                      <Select
                        id="expiresInDays"
                        label="Auto-expire after"
                        options={[
                          { value: '3', label: '3 days' },
                          { value: '7', label: '7 days' },
                          { value: '14', label: '14 days' },
                          { value: '30', label: '30 days' },
                        ]}
                        value={formData.expiresInDays}
                        onChange={(e) => setFormData({ ...formData, expiresInDays: e.target.value })}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" size="lg" loading={loading}>
                    Create listing
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
