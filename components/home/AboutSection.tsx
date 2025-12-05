import { Badge } from '@/components/ui/badge'
import { Coffee, Users } from 'lucide-react'
import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="relative py-32" style={{ contentVisibility: 'auto' }}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-[95%] lg:max-w-6xl mx-auto">
          <div className="space-y-16">
            {/* Header - Centered */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm mx-auto w-fit">
                Tentang Kami
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold text-amber-50 leading-tight">
                Cerita di Balik <span className="text-gradient">Setiap Cangkir</span>
              </h2>
            </div>

            {/* Image Grid - Top */}
            <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-amber-400/20">
                <Image
                src="https://images.unsplash.com/photo-1736496874375-33afc74639b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWQlMjB0ZXh0dXJlfGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                  alt="Coffee beans"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
              </div>
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-amber-400/20">
                <Image
                src="https://images.unsplash.com/photo-1748012906249-37245d620d1c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxiYXJpc3RhJTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBoYW5kc3xlbnwwfDF8fHwxNzYxNjM1ODg0fDA&ixlib=rb-4.1.0&q=85"
                  alt="Barista making coffee"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
              </div>
            </div>

            {/* Content - Middle */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
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
            </div>

            {/* Features & Bottom Images */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Coffee className="w-6 h-6 text-amber-300" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-amber-50">Premium Quality</h3>
                      <p className="text-amber-200/70 text-sm">Biji kopi pilihan dari perkebunan terbaik</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-amber-300" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-amber-50">Expert Baristas</h3>
                      <p className="text-amber-200/70 text-sm">Tim profesional dengan pengalaman bertahun-tahun</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl border border-amber-400/20">
                  <Image
                  src="https://images.unsplash.com/photo-1751151015819-671ae8243e97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjYWZlJTIwaW50ZXJpb3IlMjBtb2Rlcm4lMjBjb3p5fGVufDB8MHx8fDE3NjE2MzU4ODR8MA&ixlib=rb-4.1.0&q=85"
                    alt="Cafe interior"
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
          </div>
        </div>
      </div>
    </section>
  )
}