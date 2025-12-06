'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Clock, Phone, MapPin, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type ContactInfo = {
  id: string
  type: 'address' | 'phone' | 'email' | 'map_url'
  value: string
  display_order: number
  is_active: boolean
}

type OperatingHour = {
  id: string
  day_name: string
  day_label: string
  open_time: string
  close_time: string
  is_closed: boolean
  display_order: number
}

export function LocationSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>([])
  const [mapUrl, setMapUrl] = useState<string>('')

  useEffect(() => {
    fetchContactData()
    fetchOperatingHours()
  }, [])

  const fetchContactData = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      if (data) {
        setContactInfo(data)
        const map = data.find((c) => c.type === 'map_url')
        if (map) {
          setMapUrl(map.value)
        }
      }
    } catch (error) {
      console.error('Error fetching contact info:', error)
    }
  }

  const fetchOperatingHours = async () => {
    try {
      const { data, error } = await supabase
        .from('operating_hours')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      if (data) {
        setOperatingHours(data)
      }
    } catch (error) {
      console.error('Error fetching operating hours:', error)
    }
  }

  const getContactValue = (type: 'address' | 'phone' | 'email') => {
    const contact = contactInfo.find((c) => c.type === type)
    return contact?.value || ''
  }

  const formatTime = (time: string) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    return `${hours}:${minutes}`
  }
  return (
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

        <div className="space-y-8 max-w-[95%] lg:max-w-6xl mx-auto">
          {/* Map */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/30 bg-amber-900/20">
            <div className="absolute inset-0 flex items-center justify-center bg-amber-900/10 z-10 pointer-events-none">
              <div className="text-amber-200/50 text-sm">Memuat peta...</div>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <iframe
                src={mapUrl || "https://maps.google.com/maps?width=100%25&height=600&hl=id&q=-6.200000,106.816666&t=&z=14&ie=UTF8&iwloc=B&output=embed"}
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
          <div className="grid md:grid-cols-2 gap-6">
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
                {operatingHours.length > 0 ? (
                  operatingHours.map((hours) => (
                    <div
                      key={hours.id}
                      className={`flex justify-between items-center py-3 px-4 rounded-xl border ${
                        hours.is_closed
                          ? 'bg-gray-500/10 border-gray-500/20'
                          : hours.day_name === 'saturday' || hours.day_name === 'sunday'
                          ? 'bg-orange-500/10 border-orange-500/30'
                          : 'bg-amber-500/10 border-amber-500/20'
                      }`}
                    >
                      <span className={`text-sm font-medium ${
                        hours.is_closed ? 'text-gray-400' : 'text-amber-100'
                      }`}>
                        {hours.day_label}
                      </span>
                      <span className={`font-semibold text-sm ${
                        hours.is_closed ? 'text-gray-400' : 'text-amber-200'
                      }`}>
                        {hours.is_closed
                          ? 'Tutup'
                          : `${formatTime(hours.open_time)} - ${formatTime(hours.close_time)}`}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
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
                  </>
                )}
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
                {contactInfo.length > 0 ? (
                  <>
                    {contactInfo.find((c) => c.type === 'address') && (
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <MapPin className="h-5 w-5 text-amber-300 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-amber-50 mb-1 text-sm">Alamat</p>
                          <p className="text-amber-200 text-sm">{getContactValue('address') || 'Jl. Sudirman No. 123, Jakarta Pusat'}</p>
                        </div>
                      </div>
                    )}
                    {contactInfo.find((c) => c.type === 'phone') && (
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <Phone className="h-5 w-5 text-amber-300 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-amber-50 mb-1 text-sm">Telepon</p>
                          <p className="text-amber-200 text-sm">{getContactValue('phone') || '(021) 1234-5678'}</p>
                        </div>
                      </div>
                    )}
                    {contactInfo.find((c) => c.type === 'email') && (
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <Mail className="h-5 w-5 text-amber-300 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-amber-50 mb-1 text-sm">Email</p>
                          <p className="text-amber-200 text-sm">{getContactValue('email') || 'info@kopikenangan.com'}</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}