import { Flame, ShoppingBag, MapPin, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { BRAND_CONFIG } from '../data/brandConfig'
import { formatRateDisplay, useBcvRate } from '../hooks/useBcvRate'

interface NavbarProps {
  cartCount: number
  onOpenCart: () => void
  onScrollToMenu: () => void
}

export function Navbar({ cartCount, onOpenCart, onScrollToMenu }: NavbarProps) {
  const { rate, isRefreshing, refresh } = useBcvRate()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Glass Surface with Blur & Specular Border */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <nav className="glass-panel rounded-2xl px-4 py-2.5 sm:px-6 flex items-center justify-between border border-white/[0.12] bg-[#120c08]/80 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18)]">
          {/* Brand Mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="Ir al inicio"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-600/30 to-transparent border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:border-amber-400 transition-colors">
              <Flame className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white font-display leading-tight flex items-center gap-1.5">
                ROCCO'S <span className="text-amber-400 font-light">GRILL</span>
              </span>
              <span className="text-[10px] tracking-wider text-amber-200/60 uppercase font-mono">
                San Diego · Brasas & Fuego
              </span>
            </div>
          </button>

          {/* Center Info: Live BCV + San Diego Pill */}
          <div className="hidden md:flex items-center gap-3">
            {/* San Diego Location Pill */}
            <a
              href={BRAND_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-amber-500/30 text-xs text-stone-300 hover:text-white transition-all"
              title="Ver ubicación en Google Maps"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>Av. Don Julio Centeno</span>
            </a>

            {/* Subtle Tasa BCV Pill */}
            {rate && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300/90 font-mono">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>BCV: {formatRateDisplay(rate)}</span>
                <button
                  onClick={() => void refresh()}
                  disabled={isRefreshing}
                  className="hover:text-emerald-200 cursor-pointer transition-transform active:rotate-180 disabled:opacity-50"
                  aria-label="Actualizar tasa BCV"
                >
                  <RefreshCw className={`h-2.5 w-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {/* Right Actions: Menu Quick Link + Cart Drawer Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onScrollToMenu}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-stone-200 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              Ver Carta
            </button>

            {/* Cart Button with Animated Counter */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              aria-label={`Ver pedido con ${cartCount} productos`}
            >
              <ShoppingBag className="h-4 w-4 text-stone-950" />
              <span className="hidden xs:inline">Mi Pedido</span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-stone-950 text-amber-400 text-[11px] font-mono font-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
