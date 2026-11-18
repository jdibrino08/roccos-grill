import { useState, useEffect } from 'react'
import { X, Plus, Minus, Check, Flame, Clock, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import type { MenuItem, MenuItemOption } from '../data/menuData'
import type { CartItem, SelectedOption } from '../types/cart'
import { useBcvRate, formatVes } from '../hooks/useBcvRate'

interface ItemCustomizerProps {
  item: MenuItem | null
  onClose: () => void
  onAddToCart: (cartItem: CartItem) => void
}

function ItemCustomizerDialog({
  item,
  onClose,
  onAddToCart,
}: {
  item: MenuItem
  onClose: () => void
  onAddToCart: (cartItem: CartItem) => void
}) {
  const { rate } = useBcvRate()
  const [quantity, setQuantity] = useState(1)
  // Initialize required single-choice options (e.g. doneness) directly in state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, MenuItemOption[]>>(() => {
    const initial: Record<string, MenuItemOption[]> = {}
    item.optionGroups?.forEach((group) => {
      if (group.required && (!group.maxSelect || group.maxSelect === 1) && group.options.length > 0) {
        initial[group.id] = [group.options[0]]
      }
    })
    return initial
  })
  const [instructions, setInstructions] = useState('')

  // Prevent background Lenis scroll while customizer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleToggleOption = (
    groupId: string,
    option: MenuItemOption,
    required: boolean,
    maxSelect?: number
  ) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || []
      const isSelected = current.some((opt) => opt.id === option.id)

      if (maxSelect === 1 || (!maxSelect && required)) {
        // Radio behavior
        return { ...prev, [groupId]: [option] }
      }

      if (isSelected) {
        // Deselect
        return {
          ...prev,
          [groupId]: current.filter((opt) => opt.id !== option.id),
        }
      }

      // Check max limit
      if (maxSelect && current.length >= maxSelect) {
        return prev
      }

      return {
        ...prev,
        [groupId]: [...current, option],
      }
    })
  }

  // Calculate unit price including options
  const optionsTotal = Object.values(selectedOptions)
    .flat()
    .reduce((sum, opt) => sum + opt.price, 0)
  const unitPrice = item.price + optionsTotal
  const finalPrice = unitPrice * quantity
  const finalPriceBs = formatVes(finalPrice, rate)

  // Verify all required groups are satisfied
  const isSatisfied =
    item.optionGroups?.every((group) => {
      if (!group.required) return true
      const count = (selectedOptions[group.id] || []).length
      if (group.maxSelect && group.maxSelect > 1) {
        return count === group.maxSelect
      }
      return count >= 1
    }) ?? true

  const handleConfirm = () => {
    if (!isSatisfied) return

    const flatSelected: SelectedOption[] = []
    item.optionGroups?.forEach((group) => {
      const opts = selectedOptions[group.id] || []
      opts.forEach((opt) => {
        flatSelected.push({
          groupId: group.id,
          groupName: group.name,
          option: opt,
        })
      })
    })

    const cartId = `${item.id}-${flatSelected.map((o) => o.option.id).sort().join('-')}-${Date.now()}`

    onAddToCart({
      id: cartId,
      menuItem: item,
      quantity,
      selectedOptions: flatSelected,
      specialInstructions: instructions.trim() ? instructions.trim() : undefined,
      totalPricePerUnit: unitPrice,
      totalPrice: finalPrice,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        data-lenis-prevent
        className="w-full max-w-xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#120c08] border border-white/[0.14] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Header with image preview */}
        <div className="relative h-48 sm:h-56 shrink-0 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120c08] via-[#120c08]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 font-bold text-xs uppercase tracking-wider font-mono">
              <Flame className="h-3 w-3" />
              <span>{item.badge}</span>
            </div>
          )}

          {/* Title and price in header bottom */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
              {item.name}
            </h3>
            <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
              {item.servings && (
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-amber-400" />
                  {item.servings}
                </span>
              )}
              {item.cookingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  {item.cookingTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Options Body with touchpad scroll fix */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-5 space-y-6"
        >
          <p className="text-sm text-stone-300 leading-relaxed">{item.description}</p>

          {/* Option Groups */}
          {item.optionGroups?.map((group) => {
            const currentSelected = selectedOptions[group.id] || []
            return (
              <div key={group.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                    {group.name}
                  </h4>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {group.required
                      ? group.maxSelect && group.maxSelect > 1
                        ? `Elige ${group.maxSelect}`
                        : 'Obligatorio'
                      : 'Opcional'}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.options.map((option) => {
                    const isChecked = currentSelected.some((opt) => opt.id === option.id)
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          handleToggleOption(group.id, option, group.required, group.maxSelect)
                        }
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-left ${
                          isChecked
                            ? 'bg-amber-500/15 border-amber-500/60 text-white'
                            : 'bg-white/[0.03] border-white/[0.08] text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-4 w-4 rounded-md flex items-center justify-center border transition-colors ${
                              isChecked
                                ? 'bg-amber-500 border-amber-500 text-stone-950'
                                : 'border-stone-500'
                            }`}
                          >
                            {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{option.name}</span>
                        </div>
                        {option.price > 0 && (
                          <span className="text-xs font-mono font-bold text-amber-400">
                            +${option.price}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Special Instructions Note */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono block">
              Notas para la cocina (opcional)
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ej: Sin sal en los tostones, chimichurri aparte..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer with Quantity Counter & Add CTA */}
        <div className="p-4 sm:p-5 border-t border-white/[0.1] bg-[#0c0907]/90 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="h-7 w-7 rounded-lg flex items-center justify-center text-stone-300 hover:text-white disabled:opacity-30 cursor-pointer"
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold font-mono text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-7 w-7 rounded-lg flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleConfirm}
            disabled={!isSatisfied}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.5)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-between"
          >
            <span>Agregar al Pedido</span>
            <div className="flex flex-col items-end">
              <span className="font-mono font-black">${finalPrice}</span>
              {finalPriceBs && (
                <span className="text-[10px] font-mono text-stone-900/80 -mt-0.5">
                  {finalPriceBs}
                </span>
              )}
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function ItemCustomizer({ item, onClose, onAddToCart }: ItemCustomizerProps) {
  return (
    <AnimatePresence>
      {item && <ItemCustomizerDialog item={item} onClose={onClose} onAddToCart={onAddToCart} />}
    </AnimatePresence>
  )
}
