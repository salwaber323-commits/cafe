'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Coffee,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { ParticleBackground, StarsBackground } from '@/components/home/Background'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { FacilitiesSection } from '@/components/home/FacilitiesSection'
import { TestimonialSection } from '@/components/home/TestimonialSection'
import { LocationSection } from '@/components/home/LocationSection'
import { FeedbackSection } from '@/components/home/FeedbackSection'
import { Footer } from '@/components/home/Footer'



export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-orange-900 overflow-hidden" style={{ contentVisibility: 'auto' }}>
      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-black/30 shadow-lg shadow-amber-500/10' 
          : 'backdrop-blur-sm bg-transparent'
      }`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-20 border-b border-amber-300/10">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <Coffee className="h-8 w-8 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-amber-300/20 blur-xl rounded-full group-hover:bg-amber-300/40 transition-all" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-amber-50 tracking-tight">Kemiri Cafe</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#about" className="text-sm text-amber-200 hover:text-amber-50 transition-colors font-medium">
                Tentang
              </Link>
              <Link href="#facilities" className="text-sm text-amber-200 hover:text-amber-50 transition-colors font-medium">
                Fasilitas
              </Link>
              <Link href="#contact" className="text-sm text-amber-200 hover:text-amber-50 transition-colors font-medium">
                Kontak
              </Link>
              <Link href="/order/select-table" className="group">
                <Button className="btn-primary px-5 py-2 text-sm rounded-full h-9 font-medium">
                  <span className="flex items-center gap-1.5">
                    Pesan Sekarang
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-amber-200 hover:text-amber-50 hover:bg-amber-500/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-amber-300/10 bg-black/50 backdrop-blur-xl">
              <div className="flex flex-col py-4 space-y-2">
                <Link 
                  href="#about" 
                  className="px-4 py-3 text-amber-200 hover:text-amber-50 hover:bg-amber-500/10 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tentang
                </Link>
                <Link 
                  href="#facilities" 
                  className="px-4 py-3 text-amber-200 hover:text-amber-50 hover:bg-amber-500/10 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fasilitas
                </Link>
                <Link 
                  href="#contact" 
                  className="px-4 py-3 text-amber-200 hover:text-amber-50 hover:bg-amber-500/10 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontak
                </Link>
                <div className="px-4 pt-2">
                  <Link href="/order/select-table" onClick={() => setMobileMenuOpen(false)} className="group">
                    <Button className="btn-primary w-full rounded-full font-medium">
                      <span className="flex items-center justify-center gap-2">
                        Pesan Sekarang
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Animated Background */}
      <ParticleBackground />
      <StarsBackground />

      {/* Enhanced gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none -z-10" />

      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <TestimonialSection />
      <LocationSection />
      <FeedbackSection />
      <Footer />
    </div>
  )
}