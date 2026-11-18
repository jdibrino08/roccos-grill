import { ArrowRight, Flame, Car, Bike, Store, Award } from 'lucide-react'
import { motion } from 'motion/react'
import { BRAND_CONFIG } from '../data/brandConfig'
import { GlassText } from './GlassText'

interface HeroFlyThroughProps {
  onScrollToMenu: () => void
  onOpenCart: () => void
}

export function HeroFlyThrough({ onScrollToMenu, onOpenCart }: HeroFlyThroughProps) {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Layer: High-End Mesquite Grill Photography + Multi-tier Dark Vignettes */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=85"
          alt="Parrilla al carbón y cortes a la brasa en Rocco's Grill"
          className="h-full w-full object-cover object-center filter brightness-[0.34] contrast-[1.16] scale-105 transform motion-safe:animate-[pulse_14s_ease-in-out_infinite]"
        />
        {/* Directional Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080606] via-[#080606]/65 to-black/85" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080606]/40 to-[#080606]" />
        {/* Subtle Fiery Red Ember Glow Spot in the Bottom-Center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-t from-red-600/20 via-rose-700/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Container - Millimeter Optical Spacing */}
      <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Layer 1: Location & Heritage Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 backdrop-blur-xl mb-6 shadow-[0_4px_20px_rgba(220,38,38,0.2)]"
        >
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-widest uppercase text-red-200/90">
            San Diego, Carabobo · Brasas Vivas & Fuego Directo
          </span>
          <span className="hidden sm:inline-block text-stone-600">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-300">
            <Award className="h-3 w-3 text-red-400" />
            Steakhouse & Restobar
          </span>
        </motion.div>

        {/* Layer 2: Main Luxury Headline in Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[0.98] uppercase">
            <span className="block text-white">SABOR A LA BRASA</span>
            <GlassText variant="red" className="tracking-tight" shimmer={true}>
              & COCTELERÍA.
            </GlassText>
          </h1>
        </motion.div>

        {/* Layer 3: Culinary Editorial Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-stone-300/90 leading-relaxed font-light mb-8"
        >
          {BRAND_CONFIG.heroSubheadline}
        </motion.p>

        {/* Layer 4: Primary & Secondary Action CTAs (Fiery Red) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-12"
        >
          <button
            onClick={onScrollToMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold text-sm tracking-wider uppercase shadow-[0_10px_35px_rgba(220,38,38,0.45)] hover:shadow-[0_14px_45px_rgba(220,38,38,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Ver Menú & Precios</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenCart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.14] backdrop-blur-xl text-white font-semibold text-sm tracking-wider uppercase transition-all cursor-pointer hover:border-red-500/40"
          >
            <Flame className="h-4 w-4 text-red-500" />
            <span>Hacer Pedido Rápido</span>
          </button>
        </motion.div>

        {/* Layer 5: Venezuelan Service Strip (Drive-Thru, Delivery, Local) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl"
        >
          <div className="glass-panel p-3.5 rounded-xl border border-white/[0.08] flex items-center gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/15 border border-red-500/30 text-red-500">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-wide">Auto-Servicio / Drive-Thru</p>
              <p className="text-[11px] text-stone-400">Entrega directa en tu auto ($0)</p>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-white/[0.08] flex items-center gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-600/15 border border-rose-500/30 text-rose-400">
              <Bike className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-wide">Delivery San Diego & Vln</p>
              <p className="text-[11px] text-stone-400">San Diego $2 · Valencia $4</p>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-xl border border-white/[0.08] flex items-center gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] border border-white/15 text-stone-300">
              <Store className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-wide">Para Comer en el Local</p>
              <p className="text-[11px] text-stone-400">Mesa lista & ambiente restobar</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
