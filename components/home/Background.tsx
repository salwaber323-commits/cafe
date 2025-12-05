import { useEffect, useRef, useState } from 'react'

// Optimized Particle Background Component with throttling
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const lastFrameTime = useRef<number>(0)
  const throttleMs = 16 // ~60fps

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })

    if (!canvas || !ctx) return

    const resizeCanvas = () => {
      if (canvas && ctx) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2) // Limit DPR untuk performa
        canvas.width = window.innerWidth * dpr
        canvas.height = window.innerHeight * dpr
        ctx.scale(dpr, dpr)
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
      }
    }

    resizeCanvas()
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(canvas)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      life: number
      maxLife: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = canvasHeight + Math.random() * 100
        this.size = Math.random() * 120 + 80 // Reduced size
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = -Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.08
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        this.y += this.speedY
        this.life++
        this.opacity = Math.sin((this.life / this.maxLife) * Math.PI) * 0.12

        if (this.y < -100) {
          this.y = canvasHeight + 100
          this.x = Math.random() * canvasWidth
          this.life = 0
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `rgba(251, 191, 36, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(245, 158, 11, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(217, 119, 6, 0)`)
        ctx.fillStyle = gradient
        ctx.filter = 'blur(60px)'
        ctx.fill()
        ctx.restore()
      }
    }

    const particles: Particle[] = []
    const particleCount = 12 // Reduced from 20
    if (canvas) {
      for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime.current >= throttleMs) {
      if (canvas && ctx) {
          const canvasWidth = canvas.width
          const canvasHeight = canvas.height
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        particles.forEach(particle => {
            particle.update(canvasWidth, canvasHeight)
          particle.draw(ctx)
        })

          lastFrameTime.current = currentTime
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ willChange: 'transform' }}
    />
  )
}

// Optimized Stars background with reduced count
export function StarsBackground() {
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, delay: number}>>([])

  useEffect(() => {
    // Reduced from 80 to 40 stars for better performance
    const newStars = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 -z-10" style={{ willChange: 'contents' }}>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white/50 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationName: 'pulse',
            animationDuration: `${2 + Math.random() * 2}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}