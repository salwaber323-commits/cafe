'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SelectTablePage() {
  const router = useRouter()
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tableNumber || parseInt(tableNumber) <= 0) {
      toast.error('Silakan pilih atau masukkan nomor meja yang valid')
      return
    }
    
    setIsSubmitting(true)
    // Small delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    router.push(`/order/menu?table=${tableNumber}&name=${encodeURIComponent(customerName)}`)
  }

  const quickSelectTable = (number: number) => {
    setTableNumber(number.toString())
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Pilih Meja Anda</CardTitle>
            <CardDescription className="text-base">
              Silakan pilih nomor meja atau masukkan secara manual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <Button
                    key={num}
                    type="button"
                    variant={tableNumber === num.toString() ? 'default' : 'outline'}
                    className={`h-14 sm:h-16 text-base sm:text-lg font-semibold transition-all duration-200 ${
                      tableNumber === num.toString()
                        ? 'bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white shadow-lg shadow-amber-700/40 scale-105 border-2 border-amber-600'
                        : 'hover:bg-amber-50 hover:border-amber-300 hover:scale-105 border-2'
                    }`}
                    onClick={() => quickSelectTable(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tableNumber">Nomor Meja</Label>
                <Input
                  id="tableNumber"
                  type="number"
                  min="1"
                  placeholder="Masukkan nomor meja"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Nama (Opsional)</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 sm:h-12 text-base sm:text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!tableNumber || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Lanjut ke Menu
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
