'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Wifi,
  ParkingCircle,
  Music,
  Heart,
  Utensils,
  Star,
  Award,
  Users,
  Sparkles,
  ChevronRight,
  Quote,
  Menu,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Optimized Particle Background Component with throttling
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const lastFrameTime = useRef<number>(0)
  const throttleMs = 16 // ~60fps

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })
    
    if (!canvas || !ctx) return

    const resizeCanvas = () => {
      if (canvas && ctx) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2) // Limit DPR untuk performa
        canvas.width = window.innerWidth * dpr
        canvas.height = window.innerHeight * dpr
        ctx.scale(dpr, dpr)
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
      }
    }
    
    resizeCanvas()
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(canvas)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      life: number
      maxLife: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = canvasHeight + Math.random() * 100
        this.size = Math.random() * 120 + 80 // Reduced size
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = -Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.08
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        this.y += this.speedY
        this.life++
        this.opacity = Math.sin((this.life / this.maxLife) * Math.PI) * 0.12

        if (this.y < -100) {
          this.y = canvasHeight + 100
          this.x = Math.random() * canvasWidth
          this.life = 0
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `rgba(251, 191, 36, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(245, 158, 11, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(217, 119, 6, 0)`)
        ctx.fillStyle = gradient
        ctx.filter = 'blur(60px)'
        ctx.fill()
        ctx.restore()
      }
    }

    const particles: Particle[] = []
    const particleCount = 12 // Reduced from 20
    if (canvas) {
      for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime.current >= throttleMs) {
      if (canvas && ctx) {
          const canvasWidth = canvas.width
          const canvasHeight = canvas.height
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        
        particles.forEach(particle => {
            particle.update(canvasWidth, canvasHeight)
          particle.draw(ctx)
        })
        
          lastFrameTime.current = currentTime
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ willChange: 'transform' }}
    />
  )
}

// Optimized Stars background with reduced count
function StarsBackground() {
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, delay: number}>>([])

  useEffect(() => {
    // Reduced from 80 to 40 stars for better performance
    const newStars = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 -z-10" style={{ willChange: 'contents' }}>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white/50 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Terima kasih atas kesan dan pesannya!')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

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
              <h1 className="text-xl sm:text-2xl font-bold text-amber-50 tracking-tight">Kopi & Kenangan</h1>
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

      {/* Hero Section - Dramatically Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[95%] lg:max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-left space-y-8">
              <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Premium Coffee Experience
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-gradient block mb-3">Kopi & Kenangan</span>
                <span className="text-amber-50/90 text-3xl md:text-4xl lg:text-5xl font-light block">
                  Setiap Tegukan Menyimpan Cerita
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-amber-100/80 leading-relaxed max-w-xl font-light">
                Nikmati pengalaman kopi premium dengan suasana yang menenangkan. 
                Setiap cangkir diracik dengan dedikasi dan rasa yang tak terlupakan.
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <Link href="/order/select-table" className="group">
                  <Button 
                    size="lg" 
                    className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-full font-semibold group-hover:gap-2"
                  >
                    <span className="flex items-center gap-2">
                    Pesan Sekarang
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="#about" className="group">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-full font-medium"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-amber-400/20">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-amber-300">10+</div>
                  <div className="text-sm text-amber-200/70">Tahun Pengalaman</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-amber-300">50K+</div>
                  <div className="text-sm text-amber-200/70">Pelanggan Puas</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-amber-300">4.9</div>
                  <div className="text-sm text-amber-200/70 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:block hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-3xl blur-3xl" />
                <Image
                  src="https://images.unsplash.com/photo-1605468596782-502ce2012ef0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBzdGVhbSUyMHdvb2RlbiUyMHRhYmxlfGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                  alt="Steaming coffee cup"
                  width={600}
                  height={600}
                  className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover border border-amber-400/20"
                  loading="eager"
                  priority
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-amber-400/30">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-white" />
                    <div>
                      <div className="text-white font-bold text-lg">Best Coffee 2024</div>
                      <div className="text-amber-100 text-sm">Award Winner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section id="about" className="relative py-32" style={{ contentVisibility: 'auto' }}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-[95%] lg:max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl border border-amber-400/20">
                    <Image
                    src="https://images.unsplash.com/photo-1736496874375-33afc74639b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWQlMjB0ZXh0dXJlfGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                      alt="Coffee beans"
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl border border-amber-400/20">
                    <Image
                    src="https://images.unsplash.com/photo-1751151015819-671ae8243e97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjYWZlJTIwaW50ZXJpb3IlMjBtb2Rlcm4lMjBjb3p5fGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                      alt="Cafe interior"
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl border border-amber-400/20">
                    <Image
                    src="https://images.unsplash.com/photo-1748012906249-37245d620d1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxiYXJpc3RhJTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBoYW5kc3xlbnwwfDF8fHwxNzYxNjM1ODg0fDA&ixlib=rb-4.1.0&q=85"
                      alt="Barista making coffee"
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl border border-amber-400/20">
                    <Image
                    src="https://images.unsplash.com/photo-1706195546953-f3ac8d384a24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxjb2ZmZWUlMjBjdXAlMjBzdGVhbSUyMHdvb2RlbiUyMHRhYmxlfGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                      alt="Coffee cup"
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  Tentang Kami
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold text-amber-50 leading-tight">
                  Cerita di Balik <span className="text-gradient">Setiap Cangkir</span>
                </h2>
                
                <div className="space-y-4 text-amber-100/90 text-lg leading-relaxed">
                  <p>
                    Kami percaya <span className="text-amber-300 font-semibold">setiap kopi membawa kenangan</span>. 
                    Dari biji pilihan hingga suasana yang menenangkan, kami menciptakan ruang bagi setiap cerita.
                  </p>
                  
                  <p>
                    Setiap cangkir diracik dengan dedikasi dan rasa yang tak terlupakan, menghadirkan pengalaman yang hangat 
                    dan penuh koneksi. Barista kami yang berpengalaman memastikan setiap tegukan sempurna.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Coffee className="w-6 h-6 text-amber-300" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-amber-50">Premium Quality</h3>
                    <p className="text-amber-200/70 text-sm">Biji kopi pilihan dari perkebunan terbaik</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-amber-300" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-amber-50">Expert Baristas</h3>
                    <p className="text-amber-200/70 text-sm">Tim profesional dengan pengalaman bertahun-tahun</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section - Redesigned */}
      <section id="facilities" className="relative py-32" style={{ contentVisibility: 'auto' }}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Fasilitas & Layanan
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-50">
              Pengalaman yang <span className="text-gradient">Sempurna</span>
            </h2>
            <p className="text-lg text-amber-200/80 max-w-2xl mx-auto">
              Menciptakan momen istimewa untuk setiap kunjungan Anda dengan fasilitas terbaik
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[95%] lg:max-w-6xl mx-auto">
            {[
              { 
                icon: Wifi, 
                title: 'WiFi Gratis', 
                desc: 'Koneksi internet berkecepatan tinggi untuk produktivitas maksimal',
                color: 'from-blue-500/20 to-cyan-500/20'
              },
              { 
                icon: ParkingCircle, 
                title: 'Parkir Luas', 
                desc: 'Area parkir yang nyaman dan aman dengan kapasitas besar',
                color: 'from-green-500/20 to-emerald-500/20'
              },
              { 
                icon: Music, 
                title: 'Musik Akustik', 
                desc: 'Atmosfer tenang dengan alunan musik lembut yang menenangkan',
                color: 'from-purple-500/20 to-pink-500/20'
              },
              { 
                icon: Heart, 
                title: 'Ruang Tenang', 
                desc: 'Lingkungan yang sempurna untuk fokus dan relaksasi',
                color: 'from-red-500/20 to-rose-500/20'
              },
              { 
                icon: Coffee, 
                title: 'Kopi Premium', 
                desc: 'Biji kopi pilihan kualitas terbaik dari berbagai daerah',
                color: 'from-amber-500/20 to-yellow-500/20'
              },
              { 
                icon: Utensils, 
                title: 'Menu Lengkap', 
                desc: 'Berbagai pilihan menu nikmat dan segar setiap hari',
                color: 'from-orange-500/20 to-amber-500/20'
              },
            ].map((facility, index) => {
              const Icon = facility.icon
              return (
                <Card 
                  key={index}
                  className="glass-effect shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-500 rounded-2xl overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${facility.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-amber-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-amber-50">
                      {facility.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-amber-200/80 leading-relaxed">
                      {facility.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section - New */}
      <section className="relative py-32" style={{ contentVisibility: 'auto' }}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-[95%] lg:max-w-4xl mx-auto">
            <Card className="glass-effect shadow-2xl rounded-3xl overflow-hidden border-amber-400/20">
              <CardContent className="p-12 text-center space-y-6">
                <Quote className="w-16 h-16 text-amber-300/50 mx-auto" />
                <p className="text-2xl md:text-3xl font-light text-amber-50 leading-relaxed italic">
                  "Tempat favorit untuk bekerja dan bersantai. Kopinya luar biasa, suasananya nyaman, 
                  dan pelayanannya sangat ramah. Highly recommended!"
                </p>
                <div className="flex items-center justify-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="pt-4">
                  <p className="text-amber-100 font-semibold text-lg">Sarah Wijaya</p>
                  <p className="text-amber-200/70 text-sm">Pelanggan Setia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section - Enhanced */}
      <section id="contact" className="relative py-32" style={{ contentVisibility: 'auto' }}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Lokasi & Kontak
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-50">
              Kunjungi <span className="text-gradient">Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-[95%] lg:max-w-6xl mx-auto">
            {/* Map */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/30 bg-amber-900/20">
              <div className="absolute inset-0 flex items-center justify-center bg-amber-900/10 z-10 pointer-events-none">
                <div className="text-amber-200/50 text-sm">Memuat peta...</div>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <iframe 
                  src="https://maps.google.com/maps?width=100%25&height=600&hl=id&q=-6.200000,106.816666&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                  style={{ minHeight: '400px' }}
                  onLoad={(e) => {
                    const target = e.target as HTMLIFrameElement
                    const parent = target.parentElement?.previousElementSibling as HTMLElement
                    if (parent) {
                      parent.style.display = 'none'
                    }
                  }}
                />
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              <Card className="glass-effect shadow-xl rounded-2xl overflow-hidden border-amber-400/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Clock className="h-6 w-6 text-amber-300" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-amber-50">Jam Operasional</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="text-amber-100 text-sm font-medium">Senin - Kamis</span>
                    <span className="text-amber-200 font-semibold text-sm">07:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="text-amber-100 text-sm font-medium">Jumat</span>
                    <span className="text-amber-200 font-semibold text-sm">07:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                    <span className="text-amber-50 text-sm font-medium">Sabtu - Minggu</span>
                    <span className="text-amber-100 font-semibold text-sm">08:00 - 23:00</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect shadow-xl rounded-2xl overflow-hidden border-amber-400/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-500/20 rounded-xl">
                      <Phone className="h-6 w-6 text-amber-300" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-amber-50">Hubungi Kami</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <MapPin className="h-5 w-5 text-amber-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-50 mb-1 text-sm">Alamat</p>
                      <p className="text-amber-200 text-sm">Jl. Sudirman No. 123, Jakarta Pusat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <Phone className="h-5 w-5 text-amber-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-50 mb-1 text-sm">Telepon</p>
                      <p className="text-amber-200 text-sm">(021) 1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <Mail className="h-5 w-5 text-amber-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-50 mb-1 text-sm">Email</p>
                      <p className="text-amber-200 text-sm">info@kopikenangan.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section - Enhanced */}
      <section className="relative py-32" style={{ contentVisibility: 'auto' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <Card className="max-w-[95%] lg:max-w-4xl mx-auto glass-effect shadow-2xl overflow-hidden rounded-3xl border-amber-400/20">
            <CardContent className="p-10 md:p-12">
              <div className="text-center mb-10 space-y-4">
                <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  Hubungi Kami
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-amber-50">
                  Kesan & Pesan
                </h2>
                <p className="text-base text-amber-100/80 max-w-xl mx-auto">
                  Berikan kesan, pesan, atau saran untuk pengalaman yang lebih baik
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white/5 backdrop-blur-sm border-white/20 text-amber-50 placeholder:text-amber-300/50 focus:border-amber-300/50 rounded-xl h-12 text-base"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="email"
                    placeholder="Email Anda"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/5 backdrop-blur-sm border-white/20 text-amber-50 placeholder:text-amber-300/50 focus:border-amber-300/50 rounded-xl h-12 text-base"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Subjek"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="bg-white/5 backdrop-blur-sm border-white/20 text-amber-50 placeholder:text-amber-300/50 focus:border-amber-300/50 rounded-xl h-12 text-base"
                    required
                  />
                </div>

                <Textarea
                  placeholder="Pesan atau saran Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-amber-50 placeholder:text-amber-300/50 focus:border-amber-300/50 rounded-xl min-h-[140px] resize-none text-base"
                  required
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-base px-8 py-7 h-auto rounded-xl shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all duration-300 transform hover:scale-[1.02] font-semibold"
                >
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-amber-400/20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Coffee className="h-6 w-6 text-amber-300" />
              <span className="text-xl font-bold text-amber-50">Kopi & Kenangan</span>
            </div>
            <p className="text-amber-200/70 text-sm">
              © 2024 Kopi & Kenangan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}