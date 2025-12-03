'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SelectTablePage() {
  const router = useRouter()
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tableNumber) {
      router.push(`/order/menu?table=${tableNumber}&name=${encodeURIComponent(customerName)}`)
    }
  }

  const quickSelectTable = (number: number) => {
    setTableNumber(number.toString())
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
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <Button
                    key={num}
                    type="button"
                    variant={tableNumber === num.toString() ? 'default' : 'outline'}
                    className={`h-16 text-lg ${
                      tableNumber === num.toString()
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : ''
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
                className="w-full h-12 text-lg bg-amber-600 hover:bg-amber-700"
                disabled={!tableNumber}
              >
                Lanjut ke Menu
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
