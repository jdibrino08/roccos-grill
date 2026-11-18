import { motion } from 'motion/react'
import {
  Star,
  ArrowUpRight,
  MessageCircle,
  Car,
  Utensils,
  Bike,
  Clock,
  Flame,
} from 'lucide-react'
import { GlassText } from './GlassText'
import { BRAND_CONFIG } from '../data/brandConfig'

interface HeroFlyThroughProps {
  onScrollToMenu: () => void
  onOpenCart?: () => void
}

export function HeroFlyThrough({ onScrollToMenu, onOpenCart: _onOpenCart }: HeroFlyThroughProps) {
  return (
    <section id="inicio" className="relative bg-[#110c09]">
      {/* Tight, High-Conversion Full-Bleed Culinary Hero (Identical to El Dodo Masterpiece) */}
      <div className="relative min-h-[88vh] w-full overflow-hidden flex flex-col justify-end">
        {/* Authentic Close-Up Meat & Grill Photography */}
        <div
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85)',
          }}
          className="absolute inset-0 bg-cover bg-center brightness-[0.82] contrast-[1.08] saturate-[1.12]"
        />

        {/* Warm Ember-Charcoal Directional Scrim (Appetite Warmth + Razor Legibility) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#110c09] via-[#110c09]/55 to-[#110c09]/25" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#110c09]/95 via-[#110c09]/60 to-transparent" />

        {/* Editorial Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-12 sm:pb-16 pt-28"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Primary Left Culinary Lockup (Strictly 4 clean elements) */}
            <div className="max-w-2xl space-y-5">
              <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{BRAND_CONFIG.addressShort} · Desde las 12:00 PM</span>
              </p>

              <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-[-0.03em] leading-[0.96] uppercase font-display">
                <GlassText variant="crystal" className="block">
                  AUTÉNTICO
                </GlassText>
                <GlassText variant="amber" className="block mt-1">
                  SABOR A LA BRASA
                </GlassText>
                <GlassText variant="amber" className="block mt-1">
                  AL CARBÓN.
                </GlassText>
              </h1>

              <p className="text-base sm:text-lg text-amber-50/85 font-normal leading-relaxed max-w-xl">
                Costillares glaseados BBQ al puerro crocante, paellas marineras en sartén de hierro, alitas al sésamo y cócteles de autor en{' '}
                <strong className="text-white font-semibold">{BRAND_CONFIG.name}</strong>.
              </p>

              {/* High-Appetite Conversion CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onScrollToMenu}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-sm tracking-wide active:scale-95 transition-all cursor-pointer shadow-[0_4px_20px_rgba(245,158,11,0.35)]"
                >
                  <span>Ver Menú y Precios</span>
                </button>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=Hola!%20Quiero%20hacer%20un%20pedido%20en%20Rocco's%20Grill`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a120d]/70 backdrop-blur-xl border border-amber-100/25 text-white font-semibold text-sm hover:bg-white/[0.14] active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Quiet Verified Rating Card */}
            <div className="lg:flex flex-col items-end">
              <a
                href={BRAND_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block glass-panel px-5 py-4 rounded-2xl hover:border-amber-300/35 transition-colors group"
              >
                <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9 en Google</span>
                  <span className="text-neutral-300 font-normal">
                    (Rocco's Grill)
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs font-mono text-amber-100/80 mt-1.5">
                  Ticket $6–25 · Pago Móvil / Efectivo / Zelle
                </p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Warm Culinary Trust & Service Strip (Drive-Through, Delivery, Dine-in, Hours) */}
      <div className="border-y border-amber-100/10 bg-[#1a120d]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Drive-Through ($0)</strong>
              <span className="text-neutral-400">Retira sin bajar del carro</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Bike className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Delivery San Diego & Vln</strong>
              <span className="text-neutral-400">San Diego $2 · Valencia $4</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Comer en el Local</strong>
              <span className="text-neutral-400">Av. Don Julio Centeno (El Remanso)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">Abierto 12:00 PM</strong>
              <span className="text-neutral-400">Miércoles a Domingo hasta 11 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
