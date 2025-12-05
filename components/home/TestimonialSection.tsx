import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star } from 'lucide-react'

export function TestimonialSection() {
  return (
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
  )
}