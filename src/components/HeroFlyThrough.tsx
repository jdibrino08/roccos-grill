import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import {
  Star,
  ArrowUpRight,
  MessageCircle,
  Car,
  Utensils,
  Bike,
  Clock,
  Flame,
  Sparkles,
} from 'lucide-react'
import { GlassText } from './GlassText'
import { BRAND_CONFIG } from '../data/brandConfig'

interface HeroFlyThroughProps {
  onScrollToMenu: () => void
  onOpenCart?: () => void
}

interface HeroScene {
  id: string
  tag: string
  dish: string
  description: string
  imageUrl: string
}

const HERO_SCENES: HeroScene[] = [
  {
    id: 'brasas',
    tag: 'Cortes & Brasas',
    dish: 'Costillar Glaseado BBQ & Puerro Crocante',
    description: 'Costillares glaseados BBQ al puerro crocante, cortes sellados al carbón y chimichurri artesanal.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
  },
  {
    id: 'paellas',
    tag: 'Paellas al Hierro',
    dish: 'Gran Paella Marinera en Sartén de Hierro',
    description: 'Arroz al azafrán con camarones enteros seleccionados, mejillones del caribe y pimentón asado.',
    imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1800&q=85',
  },
  {
    id: 'cocteles',
    tag: 'Coctelería Frozen',
    dish: 'Margaritas Frozen & Mojitos Cítricos',
    description: 'Copas escarchadas de margarita frozen de fresa, mojitos con hierbabuena fresca y tragos de autor.',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1800&q=85',
  },
  {
    id: 'alitas',
    tag: 'Alitas & Smash',
    dish: 'Alitas Glaseadas BBQ al Sésamo con Papas',
    description: 'Alitas crujientes con reducción BBQ ahumada, semillas de sésamo y doble smash burgers al hierro.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=85',
  },
]

const EMBER_PARTICLES = [
  { id: 1, left: '22%', duration: 7, delay: 0, size: 3 },
  { id: 2, left: '38%', duration: 9, delay: 1.5, size: 2.5 },
  { id: 3, left: '55%', duration: 8, delay: 3, size: 3.5 },
  { id: 4, left: '72%', duration: 10, delay: 0.8, size: 2 },
  { id: 5, left: '85%', duration: 7.5, delay: 2.2, size: 3 },
  { id: 6, left: '48%', duration: 11, delay: 4, size: 2 },
  { id: 7, left: '65%', duration: 8.5, delay: 5.2, size: 2.5 },
]

export function HeroFlyThrough({ onScrollToMenu, onOpenCart: _onOpenCart }: HeroFlyThroughProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Smooth Parallax tied to Lenis scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const yHeroBg = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.7], [1, 0.82])

  // Auto-rotate hero scenes every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % HERO_SCENES.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const currentScene = HERO_SCENES[activeSceneIndex]

  return (
    <section id="inicio" ref={containerRef} className="relative bg-[#110c09] overflow-hidden">
      {/* Dynamic Multi-Layered Culinary Hero */}
      <div className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden flex flex-col justify-end">
        {/* =========================================================================
            LAYER 1: DYNAMIC FOOD & AMBIANCE PHOTOGRAPHY CAROUSEL (KEN BURNS DRIFT)
           ========================================================================= */}
        <motion.div style={{ y: yHeroBg }} className="absolute inset-0 w-full h-[116%] -top-[8%] z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundImage: `url(${currentScene.imageUrl})` }}
              className="absolute inset-0 bg-cover bg-center brightness-[0.84] contrast-[1.1] saturate-[1.15]"
            />
          </AnimatePresence>

          {/* =========================================================================
              LAYER 2: LIQUID LIGHT & BREATHING CULINARY GRADIENT ORBS (FRAMER MOTION)
             ========================================================================= */}
          {/* Top-Right Golden Amber Hearth Glow */}
          <motion.div
            className="absolute -top-20 right-0 sm:right-10 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-br from-amber-500/22 via-orange-600/14 to-transparent blur-[140px] pointer-events-none"
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -35, 25, 0],
              scale: [1, 1.18, 0.94, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Bottom-Center Deep Mesquite Fire Glow */}
          <motion.div
            className="absolute bottom-10 left-10 sm:left-1/4 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-gradient-to-tr from-orange-600/20 via-amber-600/15 to-transparent blur-[150px] pointer-events-none"
            animate={{
              x: [0, -35, 30, 0],
              y: [0, 40, -25, 0],
              scale: [1, 0.92, 1.15, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Subtle Saffron Radial Center Highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_70%_40%,rgba(245,158,11,0.14),transparent_70%)] pointer-events-none" />

          {/* =========================================================================
              LAYER 3: FLOATING GOLDEN EMBER PARTICLES (LIVE WOOD-FIRED CHARCOAL EFFECT)
             ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {EMBER_PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute bottom-8 rounded-full bg-amber-400"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  boxShadow: '0 0 10px 2px rgba(245, 158, 11, 0.8), 0 0 20px 4px rgba(234, 88, 12, 0.5)',
                }}
                animate={{
                  y: [-10, -450],
                  x: [0, p.id % 2 === 0 ? 35 : -35, p.id % 2 === 0 ? -25 : 25],
                  opacity: [0, 0.9, 0.95, 0],
                  scale: [0.7, 1.3, 0.5],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* =========================================================================
              LAYER 4: DIRECTIONAL SCRIM (RAZOR TEXT LEGIBILITY + DELICIOUS FOOD EXPOSURE)
             ========================================================================= */}
          {/* Seamless Bottom fade into the #110c09 strip */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#110c09] via-[#110c09]/60 to-[#110c09]/30" />
          {/* Left-to-right editorial scrim for razor-sharp typography */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#110c09]/95 via-[#110c09]/65 to-transparent" />
        </motion.div>

        {/* =========================================================================
            EDITORIAL HERO CONTENT (MATCHING EL DODO EXCELLENCE)
           ========================================================================= */}
        <motion.div
          style={{ opacity: opacityHeroText }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-10 sm:pb-14 pt-28 sm:pt-36"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Primary Left Culinary Lockup */}
            <div className="max-w-2xl space-y-5">
              {/* Eyebrow with location & flame */}
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-amber-300">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{BRAND_CONFIG.addressShort} · Desde las 12:00 PM</span>
                </p>

                {/* Live Scene Dish Pill Badge */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-amber-300 text-[11px] font-mono"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="font-semibold text-white truncate max-w-[220px] sm:max-w-none">
                      {currentScene.dish}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3-Line Stacked Headline (El Dodo Benchmark) */}
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

              {/* Culinary Copy */}
              <p className="text-base sm:text-lg text-amber-50/85 font-normal leading-relaxed max-w-xl">
                {currentScene.description} en{' '}
                <strong className="text-white font-semibold">{BRAND_CONFIG.name}</strong>.
              </p>

              {/* High-Appetite Conversion CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onScrollToMenu}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-sm tracking-wide active:scale-95 transition-all cursor-pointer shadow-[0_4px_24px_rgba(245,158,11,0.4)]"
                >
                  <span>Ver Menú y Precios</span>
                </button>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=Hola!%20Quiero%20hacer%20un%20pedido%20en%20Rocco's%20Grill`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a120d]/80 backdrop-blur-xl border border-amber-100/25 text-white font-semibold text-sm hover:bg-white/[0.14] active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>

              {/* Interactive Scene Selector Chips (Framer Motion) */}
              <div className="pt-2">
                <p className="text-[10px] uppercase font-mono tracking-widest text-amber-200/70 mb-2">
                  Especialidades en el Asador:
                </p>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {HERO_SCENES.map((scene, idx) => {
                    const isSelected = idx === activeSceneIndex
                    return (
                      <button
                        key={scene.id}
                        type="button"
                        onClick={() => {
                          setActiveSceneIndex(idx)
                          setIsAutoPlaying(false)
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                          isSelected
                            ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_16px_rgba(245,158,11,0.4)] scale-105'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] text-stone-300 border border-white/10'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-neutral-950' : 'bg-amber-400/70'}`} />
                        <span>{scene.tag}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Quiet Verified Rating Card */}
            <div className="lg:flex flex-col items-end space-y-3">
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

              {/* Live Kitchen Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-stone-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Asador & Barra activos hoy hasta las 11:00 PM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Warm Culinary Trust & Service Strip (Drive-Through, Delivery, Dine-in, Hours) */}
      <div className="border-y border-amber-100/10 bg-[#1a120d]/85 backdrop-blur-md relative z-10">
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
