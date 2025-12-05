import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Wifi,
  ParkingCircle,
  Music,
  Heart,
  Coffee,
  Utensils
} from 'lucide-react'

export function FacilitiesSection() {
  return (
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
  )
}