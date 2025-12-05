import { Coffee } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-amber-400/20">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Coffee className="h-6 w-6 text-amber-300" />
            <span className="text-xl font-bold text-amber-50">Kemiri Cafe</span>
          </div>
          <p className="text-amber-200/70 text-sm">
            © 2024 Kemiri Cafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}