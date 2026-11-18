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
  const [activeCategory, setActiveCategory] = useState<string>('cortes')

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory)
  const currentCategoryObj = MENU_CATEGORIES.find((c) => c.id === activeCategory)

  return (
    <section id="menu-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
          <Flame className="h-3.5 w-3.5" />
          <span>Nuestra Carta Digital</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight uppercase">
          CORTES & BRASAS DE LA CASA
        </h2>
        <p className="text-sm sm:text-base text-stone-400 mt-2 font-light">
          Selecciona tu plato favorito, personaliza el término y contornos, y pide directo por WhatsApp.
        </p>
      </div>

      {/* Category Tabs Strip */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_4px_20px_rgba(245,158,11,0.35)]'
                  : 'text-stone-300 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* Subtitle for the active category */}
      {currentCategoryObj && (
        <div className="text-center mb-8">
          <p className="text-xs text-amber-200/70 font-mono tracking-wide">
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
              className="glass-panel group rounded-3xl overflow-hidden border border-white/[0.1] hover:border-amber-500/40 transition-all duration-300 flex flex-col hover:shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
            >
              {/* Product Photography Container */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100b08] via-transparent to-black/30" />

                {/* Badge Overlay */}
                {item.badge && (
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 font-bold text-[11px] uppercase tracking-wider font-mono shadow-md backdrop-blur-md">
                    <Sparkles className="h-3 w-3" />
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
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  {/* Pricing: Whole USD + Live BCV */}
                  <div>
                    <span className="text-xs text-stone-500 block uppercase font-mono tracking-wider">
                      Precio
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black font-mono text-white">
                        ${item.price}
                      </span>
                      {priceBs && (
                        <span className="text-xs font-mono text-emerald-400/90">
                          {priceBs}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add / Customize Button */}
                  <button
                    onClick={() => onSelectItem(item)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
    </section>
  )
}
