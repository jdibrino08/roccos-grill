import { useState } from 'react'
import { Flame, Plus, Clock, Users, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData'
import type { MenuItem } from '../data/menuData'
import { useBcvRate, formatVes } from '../hooks/useBcvRate'

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void
}

export function MenuSection({ onSelectItem }: MenuSectionProps) {
  const { rate } = useBcvRate()
  const [activeCategory, setActiveCategory] = useState<string>('brasas')
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'VES'>('USD')

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory)
  const currentCategoryObj = MENU_CATEGORIES.find((c) => c.id === activeCategory)

  return (
    <section id="menu-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Culinary Mesh & Warm Degradados de Fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-gradient-to-b from-amber-500/[0.08] via-orange-600/[0.05] to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[520px] h-[360px] bg-gradient-to-t from-amber-600/[0.06] to-transparent rounded-full blur-[130px] pointer-events-none" />
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Flame className="h-3.5 w-3.5 text-amber-400" />
          <span>Nuestra Carta Digital</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight uppercase">
          CORTES, PAELLAS & ESPECIALIDADES
        </h2>
        <p className="text-sm sm:text-base text-stone-400 mt-2 font-light">
          Selecciona tu plato, personaliza a tu gusto y envía tu comanda directo a WhatsApp.
        </p>
      </div>

      {/* Category Tabs & Currency Mode Toggle Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
        {/* Category Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'text-neutral-950 bg-amber-400 hover:bg-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.35)] border border-amber-300/50 font-bold'
                    : 'text-stone-300 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Currency Switch (USD / VES) - OK-09 Elegant BCV Pattern */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider hidden sm:inline">
            Moneda:
          </span>
          <div className="inline-flex p-1 rounded-xl bg-white/[0.05] border border-white/[0.1]">
            <button
              type="button"
              onClick={() => setCurrencyMode('USD')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                currencyMode === 'USD'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrencyMode('VES')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                currencyMode === 'VES'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              VES (Bs.)
            </button>
          </div>
        </div>
      </div>

      {/* Subtitle for the active category */}
      {currentCategoryObj && (
        <div className="text-center mb-8">
          <p className="text-xs text-amber-200/80 font-mono tracking-wide">
            — {currentCategoryObj.subtitle} —
          </p>
        </div>
      )}

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const priceBs = formatVes(item.price, rate)

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-panel group rounded-3xl overflow-hidden border border-white/[0.1] hover:border-amber-400/40 transition-all duration-300 flex flex-col hover:shadow-[0_16px_40px_rgba(245,158,11,0.18)]"
            >
              {/* Product Photography Container */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.1] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110c09] via-transparent to-black/30" />

                {/* Badge Overlay (Warm Amber) */}
                {item.badge && (
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-[11px] uppercase tracking-wider font-mono shadow-[0_2px_12px_rgba(245,158,11,0.35)] backdrop-blur-md border border-white/20">
                    <Sparkles className="h-3 w-3 text-neutral-950" />
                    <span>{item.badge}</span>
                  </div>
                )}

                {/* Meta details overlay: Servings / Cooking time */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
                  {item.servings && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px]">
                      <Users className="h-3 w-3 text-amber-400" />
                      {item.servings}
                    </span>
                  )}
                  {item.cookingTime && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px]">
                      <Clock className="h-3 w-3 text-amber-400" />
                      {item.cookingTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-200 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  {/* Pricing: Clean Switch between USD and VES (OK-09) */}
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase font-mono tracking-wider">
                      {currencyMode === 'USD' ? 'Precio USD' : 'Tasa Oficial BCV'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {currencyMode === 'USD' ? (
                        <span className="text-2xl font-black font-mono text-white">
                          ${item.price}
                        </span>
                      ) : (
                        <span className="text-lg sm:text-xl font-black font-mono text-emerald-400">
                          {priceBs || `$${item.price}`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add / Customize Button (Golden Amber) */}
                  <button
                    onClick={() => onSelectItem(item)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-xs tracking-wider uppercase shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Pedir</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom Legal / Operational Note */}
      <div className="mt-12 text-center text-xs text-stone-500 font-mono">
        <p>
          • Precios en Bolívares calculados a la tasa oficial del Banco Central de Venezuela (BCV) del día.
        </p>
      </div>
    </section>
  )
}
