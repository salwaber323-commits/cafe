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
  Quote
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Enhanced Particle Background Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!canvas || !ctx) return

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      life: number
      maxLife: number
      width: number
      height: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.width = canvasWidth
        this.height = canvasHeight
        this.x = Math.random() * this.width
        this.y = this.height + Math.random() * 100
        this.size = Math.random() * 180 + 120
        this.speedX = (Math.random() - 0.5) * 0.6
        this.speedY = -Math.random() * 0.4 - 0.2
        this.opacity = Math.random() * 0.12
        this.life = 0
        this.maxLife = Math.random() * 250 + 150
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++
        this.opacity = Math.sin((this.life / this.maxLife) * Math.PI) * 0.18

        if (this.y < -100) {
          this.y = this.height + 100
          this.x = Math.random() * this.width
          this.life = 0
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `rgba(251, 191, 36, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(245, 158, 11, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(217, 119, 6, 0)`)
        ctx.fillStyle = gradient
        ctx.filter = 'blur(70px)'
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    let animationId: number
    const animate = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        particles.forEach(particle => {
          particle.update()
          particle.draw(ctx)
        })
        
        animationId = requestAnimationFrame(animate)
      }
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  )
}

// Enhanced Stars background
function StarsBackground() {
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, delay: number}>>([])

  useEffect(() => {
    const newStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5,
      delay: Math.random() * 3
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white/70 rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Terima kasih atas kesan dan pesannya!')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-orange-900 overflow-hidden">
      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-black/30 shadow-lg shadow-amber-500/10' 
          : 'backdrop-blur-sm bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 border-b border-amber-300/10">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <Coffee className="h-8 w-8 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-amber-300/20 blur-xl rounded-full group-hover:bg-amber-300/40 transition-all" />
              </div>
              <h1 className="text-2xl font-bold text-amber-50 tracking-tight">Kopi & Kenangan</h1>
            </div>
            <div className="flex items-center gap-8">
              <Link href="#about" className="text-sm text-amber-200 hover:text-amber-50 transition-colors font-medium hidden md:block">
                Tentang
              </Link>
              <Link href="#facilities" className="text-sm text-amber-200 hover:text-amber-50 transition-colors font-medium hidden md:block">
                Fasilitas
              </Link>
              <Link href="#contact" className="text-sm text-amber-200 hover:text-amber-50 transition-colors font-medium hidden md:block">
                Kontak
              </Link>
              <Link href="/order/select-table">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 text-sm rounded-full h-10 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105">
                  Pesan Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Background */}
      <ParticleBackground />
      <StarsBackground />
      
      {/* Enhanced gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none -z-10" />

      {/* Hero Section - Dramatically Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
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
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/order/select-table">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 text-base px-10 py-7 h-auto rounded-full shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all duration-300 transform hover:scale-105 font-semibold group"
                  >
                    Pesan Sekarang
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#about">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-amber-400/40 text-amber-100 hover:bg-amber-500/10 hover:border-amber-400/60 text-base px-10 py-7 h-auto rounded-full backdrop-blur-sm transition-all duration-300"
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
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-3xl blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1605468596782-502ce2012ef0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBzdGVhbSUyMHdvb2RlbiUyMHRhYmxlfGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                  alt="Steaming coffee cup - Denise Jans on Unsplash"
                  className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover border border-amber-400/20"
                  style={{ width: '100%', height: '600px' }}
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
      <section id="about" className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1736496874375-33afc74639b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWQlMjB0ZXh0dXJlfGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                    alt="Coffee beans - Niklas Håkonsen on Unsplash"
                    className="rounded-2xl w-full h-48 object-cover shadow-xl border border-amber-400/20"
                    style={{ width: '100%', height: '192px' }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1751151015819-671ae8243e97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjYWZlJTIwaW50ZXJpb3IlMjBtb2Rlcm4lMjBjb3p5fGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                    alt="Cafe interior - Zoshua Colah on Unsplash"
                    className="rounded-2xl w-full h-64 object-cover shadow-xl border border-amber-400/20"
                    style={{ width: '100%', height: '256px' }}
                  />
                </div>
                <div className="space-y-4 pt-12">
                  <img
                    src="https://images.unsplash.com/photo-1748012906249-37245d620d1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxiYXJpc3RhJTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBoYW5kc3xlbnwwfDF8fHwxNzYxNjM1ODg0fDA&ixlib=rb-4.1.0&q=85"
                    alt="Barista making coffee - Sanket Deorukhkar on Unsplash"
                    className="rounded-2xl w-full h-64 object-cover shadow-xl border border-amber-400/20"
                    style={{ width: '100%', height: '256px' }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1706195546953-f3ac8d384a24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxjb2ZmZWUlMjBjdXAlMjBzdGVhbSUyMHdvb2RlbiUyMHRhYmxlfGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                    alt="Coffee cup - Elin Melaas on Unsplash"
                    className="rounded-2xl w-full h-48 object-cover shadow-xl border border-amber-400/20"
                    style={{ width: '100%', height: '192px' }}
                  />
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
      <section id="facilities" className="relative py-32">
        <div className="container mx-auto px-4">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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
      <section id="contact" className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Lokasi & Kontak
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-50">
              Kunjungi <span className="text-gradient">Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-400/20">
              <iframe 
                src="https://maps.google.com/maps?width=100%25&height=400&hl=en&q=-6.200000,106.816666&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                className="w-full h-[400px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-4xl mx-auto glass-effect shadow-2xl overflow-hidden rounded-3xl border-amber-400/20">
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
        <div className="container mx-auto px-4">
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