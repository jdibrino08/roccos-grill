import { useState, useEffect } from 'react'
import { Flame, ShoppingBag, Star } from 'lucide-react'
import { BRAND_CONFIG } from '../data/brandConfig'

interface NavbarProps {
  cartCount: number
  onOpenCart: () => void
  onScrollToMenu: () => void
}

export function Navbar({ cartCount, onOpenCart, onScrollToMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[#110c09]/92 backdrop-blur-2xl saturate-150 border-b border-amber-100/10'
          : 'bg-[#110c09]/50 backdrop-blur-xl border-b border-amber-100/[0.06]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/35 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-white block leading-none whitespace-nowrap font-display">
              ROCCO'S <span className="text-amber-400">GRILL</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase hidden sm:block mt-0.5">
              Av. Don Julio Centeno · San Diego
            </span>
          </div>
        </button>

        {/* Clean Customer Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button
            onClick={onScrollToMenu}
            className="text-xs font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            Menú & Brasas
          </button>
          <a
            href={BRAND_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-neutral-300 hover:text-amber-300 transition-colors"
          >
            Drive-Through & Ubicación
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <a
            href={BRAND_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">4.9</span>
            <span className="text-neutral-400 hidden lg:inline">Google</span>
          </a>

          <button
            onClick={onOpenCart}
            aria-label="Abrir Pedido"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs active:scale-95 transition-all cursor-pointer shadow-[0_4px_16px_rgba(245,158,11,0.3)]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pedir</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-300 text-[11px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
