'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const campusOptions = [
  { value: '', label: 'Select your campus' },
  { value: 'lse', label: 'London School of Economics' },
  { value: 'bennett', label: 'Bennett University' },
  { value: 'spit', label: 'SPIT Mumbai' },
]

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    campusId: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Mock signup - just redirect to dashboard
    await new Promise(resolve => setTimeout(resolve, 500))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030303]">
      <Header user={null} />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                label="Full name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              
              <Input
                id="email"
                label="University email"
                type="email"
                required
                placeholder="you@university.ac.uk"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              
              <Input
                id="password"
                label="Password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              
              <Select
                id="campus"
                label="Campus"
                options={campusOptions}
                required
                value={formData.campusId}
                onChange={(e) => setFormData({ ...formData, campusId: e.target.value })}
              />
              
              <Button type="submit" className="w-full" loading={loading}>
                Create account
              </Button>
            </form>
            
            <p className="mt-4 text-center text-sm text-white/50">
              Already have an account?{' '}
              <Link href="/login" className="text-white underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}
