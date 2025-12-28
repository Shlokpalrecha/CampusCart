'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// University images (using Unsplash for demo)
const universityImages = {
  lse: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80',
  bennett: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
  spit: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
}

const studentImages = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
]

const itemImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
]

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#030303] text-white noise">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-medium tracking-tight text-distort">
              CampusCart
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">
                Browse
              </Link>
              <Link href="/dashboard" className="btn-shine px-5 py-2 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden spotlight grid-bg"
        style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` } as React.CSSProperties}
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] animate-float"
            style={{ 
              background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
              top: '10%',
              left: '20%',
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
          <div 
            className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] animate-float-delayed"
            style={{ 
              background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
              bottom: '20%',
              right: '10%',
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          />
        </div>

        {/* Floating images - smaller and more subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          <div 
            className="absolute w-24 h-16 rounded-lg overflow-hidden opacity-25 animate-float glass"
            style={{ top: '20%', left: '5%', transform: `translateY(${scrollY * 0.15}px) rotate(-6deg)` }}
          >
            <img src={studentImages[0]} alt="" className="w-full h-full object-cover" />
          </div>
          <div 
            className="absolute w-20 h-28 rounded-lg overflow-hidden opacity-20 animate-float-delayed glass"
            style={{ top: '30%', right: '8%', transform: `translateY(${scrollY * 0.1}px) rotate(4deg)` }}
          >
            <img src={itemImages[0]} alt="" className="w-full h-full object-cover" />
          </div>
          <div 
            className="absolute w-16 h-16 rounded-lg overflow-hidden opacity-15 animate-float-slow glass"
            style={{ bottom: '25%', left: '10%', transform: `translateY(${scrollY * -0.08}px) rotate(8deg)` }}
          >
            <img src={itemImages[1]} alt="" className="w-full h-full object-cover" />
          </div>
          <div 
            className="absolute w-22 h-14 rounded-lg overflow-hidden opacity-20 animate-float glass"
            style={{ bottom: '35%', right: '5%', transform: `translateY(${scrollY * -0.12}px) rotate(-3deg)` }}
          >
            <img src={studentImages[1]} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center stagger-children">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70">Now live at 3 universities</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-6 leading-[0.95]">
            <span className="text-gradient">Campus exchange</span>
            <br />
            <span className="text-white/40">reimagined</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            The verified marketplace for university students. Buy and sell with people you trust, 
            right when you need it most.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="btn-shine group px-8 py-4 bg-white text-black font-medium text-lg hover:bg-white/90 transition-all glow-hover"
            >
              <span className="flex items-center gap-2">
                Enter marketplace
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link 
              href="#how-it-works" 
              className="px-8 py-4 text-white/60 hover:text-white transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Infinite scroll marquee */}
      <section className="py-8 border-y border-white/5 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content animate-scroll">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 text-2xl font-light text-white/20">
                <span>Furniture</span>
                <span className="w-2 h-2 bg-white/20 rounded-full" />
                <span>Textbooks</span>
                <span className="w-2 h-2 bg-white/20 rounded-full" />
                <span>Electronics</span>
                <span className="w-2 h-2 bg-white/20 rounded-full" />
                <span>Appliances</span>
                <span className="w-2 h-2 bg-white/20 rounded-full" />
                <span>Decor</span>
                <span className="w-2 h-2 bg-white/20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">The problem</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
                Transition weeks are
                <span className="text-white/30"> chaos</span>
              </h2>
              <div className="space-y-6 text-white/50">
                <p className="text-lg leading-relaxed">
                  Every year, thousands of perfectly good items end up in dumpsters. Students leave in a rush, 
                  buyers can&apos;t be found in time, and generic marketplaces mix you with strangers.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-4xl font-medium text-white mb-2">73%</div>
                    <div className="text-sm text-white/40">Items thrown away</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-medium text-white mb-2">48h</div>
                    <div className="text-sm text-white/40">Average move-out window</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-medium text-white mb-2">0</div>
                    <div className="text-sm text-white/40">Trust on generic apps</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="card-3d rounded-xl overflow-hidden glass glow aspect-[4/5]">
                    <img src={studentImages[2]} alt="Students" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="card-3d rounded-xl overflow-hidden glass glow aspect-square">
                    <img src={itemImages[2]} alt="Items" className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="card-3d rounded-xl overflow-hidden glass glow aspect-square">
                    <img src={itemImages[3]} alt="Items" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="card-3d rounded-xl overflow-hidden glass glow aspect-[4/5]">
                    <img src={studentImages[3]} alt="Students" className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 relative">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">How it works</span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Three steps to
              <span className="text-gradient"> flow</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Verify',
                description: 'Sign up with your university email. Only verified students can access your campus marketplace.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'List or Browse',
                description: 'Post what you\'re selling or find what you need. Filter by category, location, or urgency.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Connect',
                description: 'Message directly with other students. Meet up on campus and complete the exchange.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="gradient-border rounded-2xl p-8 h-full transition-all duration-500 hover:translate-y-[-4px] glow-hover">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-light text-white/10">{item.step}</span>
                    <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaving Campus Mode Feature */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-transparent blur-3xl opacity-20" />
                <div className="relative glass-strong rounded-2xl p-8 glow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
                      LEAVING SOON
                    </div>
                    <span className="text-white/40 text-sm">Auto-expires in 5 days</span>
                  </div>
                  <h4 className="text-xl font-medium mb-2">Complete Dorm Setup</h4>
                  <p className="text-white/50 mb-4">Desk, chair, lamp, mini fridge, and more. Everything you need.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium">£150</span>
                    <span className="text-white/40 text-sm">Bankside House</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">Featured</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
                Leaving Campus
                <span className="text-white/30"> Mode</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Moving out soon? Mark your listings as urgent. They get highlighted visibility, 
                signal to buyers that time is limited, and auto-expire after your departure date.
              </p>
              <ul className="space-y-4">
                {['Priority placement in search', 'Visual urgency indicators', 'Automatic expiration', 'Bulk listing tools'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-white/60">
                    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-sm uppercase tracking-widest text-white/40 mb-4 block">Pilot campuses</span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Live at <span className="text-gradient">3 universities</span>
            </h2>
            <p className="text-white/50 text-lg">More coming soon</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'London School of Economics', code: 'LSE', domain: '@lse.ac.uk', image: universityImages.lse },
              { name: 'Bennett University', code: 'Bennett', domain: '@bennett.edu.in', image: universityImages.bennett },
              { name: 'SPIT Mumbai', code: 'SPIT', domain: '@spit.ac.in', image: universityImages.spit },
            ].map((uni) => (
              <div key={uni.code} className="group card-3d">
                <div className="gradient-border rounded-2xl overflow-hidden glow-hover">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img 
                      src={uni.image} 
                      alt={uni.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </div>
                  <div className="p-6 bg-[#0a0a0a]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{uni.name}</h3>
                      <span className="text-xs text-white/30 font-mono">{uni.code}</span>
                    </div>
                    <p className="text-sm text-white/40">{uni.domain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02] blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-tight">
            Ready to join your
            <br />
            <span className="text-gradient">campus marketplace?</span>
          </h2>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
            Sign up takes 30 seconds. All you need is your university email.
          </p>
          <Link 
            href="/dashboard" 
            className="btn-shine inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-medium text-lg hover:bg-white/90 transition-all glow pulse-ring"
          >
            Get started now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white/40 text-sm">
              CampusCart — Campus-verified exchange
            </div>
            <div className="flex items-center gap-8 text-sm text-white/30">
              <span>LSE</span>
              <span>Bennett</span>
              <span>SPIT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
