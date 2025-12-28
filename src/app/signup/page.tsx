'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { isValidUniversityEmail } from '@/lib/utils'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Campus } from '@/types/database'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    campusId: '',
  })

  useEffect(() => {
    async function fetchCampuses() {
      const { data } = await supabase.from('campuses').select('*')
      if (data) setCampuses(data)
    }
    fetchCampuses()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate university email
    if (!isValidUniversityEmail(formData.email)) {
      setError('Please use a valid university email address (.ac.uk, .edu, etc.)')
      setLoading(false)
      return
    }

    // Validate campus selection
    if (!formData.campusId) {
      setError('Please select your campus')
      setLoading(false)
      return
    }

    try {
      // Sign up with Supabase Auth - include user metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name: formData.name,
            campus_id: formData.campusId,
          },
        },
      })

      if (authError) throw authError

      if (authData.user && authData.session) {
        // User is logged in, create profile
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          campus_id: formData.campusId,
          role: 'student',
        })

        if (profileError) {
          console.error('Profile error:', profileError)
          // Don't throw - user is created, profile can be created on first login
        }
        
        // Redirect to dashboard since user is already logged in
        router.push('/dashboard')
        router.refresh()
        return
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const campusOptions = [
    { value: '', label: 'Select your campus' },
    ...campuses.map((c) => ({ value: c.id, label: c.name })),
  ]

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header user={null} />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Check your email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                We&apos;ve sent a verification link to {formData.email}. 
                Click the link to activate your account.
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">Back to sign in</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header user={null} />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
              
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
            
            <p className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="text-slate-900 underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}
