import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  ChevronRight,
  Star,
  Award
} from 'lucide-react'

export function HeroSection() {
  return (
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
              <span className="text-gradient block mb-3">Kemiri Cafe</span>
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
  )
}