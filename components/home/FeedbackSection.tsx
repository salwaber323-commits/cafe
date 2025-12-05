'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function FeedbackSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Terima kasih atas kesan dan pesannya!')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
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
  )
}