import { useState, useEffect } from 'react'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Car,
  Bike,
  Store,
  DollarSign,
  Smartphone,
  CreditCard,
  Send,
  ShoppingBag,
  Copy,
  Check,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useLenis } from 'lenis/react'
import type { CartItem, CheckoutCustomer } from '../types/cart'
import { BRAND_CONFIG } from '../data/brandConfig'
import { useBcvRate, formatVes } from '../hooks/useBcvRate'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  onUpdateQuantity: (cartItemId: string, newQty: number) => void
  onRemoveItem: (cartItemId: string) => void
  onClearCart: () => void
  onOpenMenu: () => void
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMenu,
}: CartDrawerProps) {
  const { rate } = useBcvRate()
  const lenis = useLenis()
  const [copiedData, setCopiedData] = useState(false)

  // Checkout Form State
  const [customer, setCustomer] = useState<CheckoutCustomer>({
    name: '',
    phone: '',
    deliveryMode: 'driveThru',
    deliveryZoneId: BRAND_CONFIG.services.delivery.zones[0].id,
    deliveryAddress: '',
    vehicleDescription: '',
    paymentMethod: 'pagoMovil',
    cashBill: 'Exacto',
    notes: '',
  })

  // Stop Lenis while drawer is open (prevents 2-finger touchpad scroll lock, ERR-11)
  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
    return () => {
      lenis?.start()
    }
  }, [isOpen, lenis])

  // Prevent background scroll and support Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Calculations
  const subtotalUsd = cart.reduce((sum, item) => sum + item.totalPrice, 0)
  
  let deliveryFee = 0
  if (customer.deliveryMode === 'delivery') {
    const selectedZone = BRAND_CONFIG.services.delivery.zones.find(
      (z) => z.id === customer.deliveryZoneId
    )
    deliveryFee = selectedZone ? selectedZone.fee : 2
  }

  const grandTotalUsd = subtotalUsd + deliveryFee
  const grandTotalBs = formatVes(grandTotalUsd, rate)

  // Copy Pago Móvil details to clipboard
  const handleCopyPagoMovil = () => {
    const pm = BRAND_CONFIG.paymentInfo.pagoMovil
    const textToCopy = `Banco: ${pm.bank}\nTeléfono: ${pm.phone}\nCédula: ${pm.idNumber}\nMonto: ${grandTotalBs || '$' + grandTotalUsd}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedData(true)
      setTimeout(() => setCopiedData(false), 2500)
    })
  }

  // Send WhatsApp Comanda
  const handleSendWhatsApp = () => {
    if (cart.length === 0) return

    let text = `🔥 *NUEVO PEDIDO — ROCCO'S GRILL SAN DIEGO*\n`
    text += `━━━━━━━━━━━━━━━━━━━━━\n`
    text += `👤 *Cliente:* ${customer.name || 'Cliente'}\n`
    if (customer.phone) text += `📞 *Teléfono:* ${customer.phone}\n`

    text += `\n📍 *MODALIDAD DE ENTREGA:*\n`
    if (customer.deliveryMode === 'driveThru') {
      text += `🚗 *Auto-Servicio / Drive-Thru* ($0)\n`
      if (customer.vehicleDescription) {
        text += `   Vehículo: ${customer.vehicleDescription}\n`
      }
    } else if (customer.deliveryMode === 'delivery') {
      const zone = BRAND_CONFIG.services.delivery.zones.find((z) => z.id === customer.deliveryZoneId)
      text += `🛵 *Delivery:* ${zone?.name || 'San Diego'} (+$${deliveryFee})\n`
      if (customer.deliveryAddress) {
        text += `   Dirección: ${customer.deliveryAddress}\n`
      }
    } else {
      text += `🍽️ *Consumo en Local* ($0)\n`
    }

    text += `\n🛒 *DETALLE DEL PEDIDO:*\n`
    cart.forEach((item, idx) => {
      text += `*${idx + 1}. ${item.quantity}x ${item.menuItem.name}* — $${item.totalPrice}\n`
      if (item.selectedOptions.length > 0) {
        item.selectedOptions.forEach((opt) => {
          text += `   • ${opt.option.name}${opt.option.price > 0 ? ` (+$${opt.option.price})` : ''}\n`
        })
      }
      if (item.specialInstructions) {
        text += `   Nota: _${item.specialInstructions}_\n`
      }
    })

    text += `\n━━━━━━━━━━━━━━━━━━━━━\n`
    text += `💵 *Subtotal:* $${subtotalUsd}\n`
    if (deliveryFee > 0) text += `🛵 *Delivery:* $${deliveryFee}\n`
    text += `*TOTAL A PAGAR: $${grandTotalUsd} USD*\n`
    if (grandTotalBs) {
      text += `🇻🇪 *Total en Bolívares (Tasa BCV): ${grandTotalBs}*\n`
    }

    text += `\n💳 *MÉTODO DE PAGO:*\n`
    if (customer.paymentMethod === 'pagoMovil') {
      text += `📱 *Pago Móvil* (Total a transferir: ${grandTotalBs || 'Consultar'})\n`
    } else if (customer.paymentMethod === 'cash') {
      text += `💵 *Efectivo USD* (Cambio solicitado: ${customer.cashBill || 'Exacto'})\n`
    } else {
      text += `🏦 *Zelle*\n`
    }

    if (customer.notes) {
      text += `\n📝 *Observaciones:* ${customer.notes}\n`
    }

    text += `\n_Pedido generado desde la carta digital de Rocco's Grill San Diego_`

    const encoded = encodeURIComponent(text)
    const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encoded}`
    window.open(url, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-lg h-full bg-[#09090b] border-l border-white/[0.12] flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.95)] z-10"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.1] bg-[#1a120d] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400">
                  <ShoppingBag className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-white">
                    Tu Pedido — San Diego
                  </h2>
                  <p className="text-[11px] font-mono text-stone-400">
                    {cart.length === 0
                      ? 'Sin productos aún'
                      : `${cart.length} ${cart.length === 1 ? 'producto' : 'productos'} añadidos`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="p-2 rounded-lg text-stone-400 hover:text-red-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
                    title="Vaciar carrito"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-stone-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="Cerrar pedido"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Body with Touchpad Scroll Lock Fix (ERR-11) */}
            <div
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-5 space-y-6"
            >
              {cart.length === 0 ? (
                /* Empty Cart State */
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <div className="h-16 w-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-400/60 mb-4">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Tu comanda está vacía</h3>
                  <p className="text-xs text-stone-400 max-w-xs mb-6 leading-relaxed">
                    Explora nuestros cortes a la brasa, paellas marineras, alitas BBQ y cócteles de autor.
                  </p>
                  <button
                    onClick={() => {
                      onClose()
                      onOpenMenu()
                    }}
                    className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-all cursor-pointer"
                  >
                    Ver Menú Completo
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Item Cards */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all flex gap-3"
                      >
                        <img
                          src={item.menuItem.imageUrl}
                          alt={item.menuItem.name}
                          className="h-16 w-16 rounded-xl object-cover shrink-0 border border-white/[0.08]"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.menuItem.name}
                            </h4>
                            <span className="text-xs font-mono font-bold text-amber-400 shrink-0">
                              ${item.totalPrice}
                            </span>
                          </div>

                          {/* Selected options chips */}
                          {item.selectedOptions.length > 0 && (
                            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
                              {item.selectedOptions.map((o) => o.option.name).join(' · ')}
                            </p>
                          )}

                          {item.specialInstructions && (
                            <p className="text-[10px] text-amber-200/80 italic mt-0.5">
                              Nota: {item.specialInstructions}
                            </p>
                          )}

                          {/* Qty controls */}
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/[0.05]">
                            <div className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded-lg border border-white/[0.08]">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
                                aria-label="Reducir"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-mono font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
                                aria-label="Aumentar"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[11px] text-stone-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 1. Modalidad de Entrega */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                      <span>1. Modalidad de Entrega</span>
                    </h3>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, deliveryMode: 'driveThru' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.deliveryMode === 'driveThru'
                            ? 'bg-amber-400/15 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.02] border-white/[0.08] text-stone-400 hover:border-white/20'
                        }`}
                      >
                        <Car className="h-4 w-4 mb-1" />
                        <span className="text-xs font-bold">Drive-Thru</span>
                        <span className="text-[10px] text-stone-400 font-mono">$0</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, deliveryMode: 'delivery' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.deliveryMode === 'delivery'
                            ? 'bg-amber-400/15 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.02] border-white/[0.08] text-stone-400 hover:border-white/20'
                        }`}
                      >
                        <Bike className="h-4 w-4 mb-1" />
                        <span className="text-xs font-bold">Delivery</span>
                        <span className="text-[10px] text-stone-400 font-mono">+${deliveryFee}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, deliveryMode: 'pickup' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.deliveryMode === 'pickup'
                            ? 'bg-amber-400/15 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.02] border-white/[0.08] text-stone-400 hover:border-white/20'
                        }`}
                      >
                        <Store className="h-4 w-4 mb-1" />
                        <span className="text-xs font-bold">En Local</span>
                        <span className="text-[10px] text-stone-400 font-mono">$0</span>
                      </button>
                    </div>

                    {/* Drive-thru extra vehicle note (Zero raw emojis in UI, ERR-01 fix) */}
                    {customer.deliveryMode === 'driveThru' && (
                      <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/25 text-xs">
                        <label className="text-[11px] font-bold text-amber-200 flex items-center mb-1">
                          <Car className="h-3.5 w-3.5 text-amber-400 inline mr-1.5" />
                          <span>Datos de tu auto (Para llevártelo a la ventana):</span>
                        </label>
                        <input
                          type="text"
                          value={customer.vehicleDescription || ''}
                          onChange={(e) =>
                            setCustomer({ ...customer, vehicleDescription: e.target.value })
                          }
                          placeholder="Ej: Toyota Corolla gris o Ford Fiesta blanco..."
                          className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    )}

                    {/* Delivery zone selector & address */}
                    {customer.deliveryMode === 'delivery' && (
                      <div className="space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <label className="text-[11px] font-bold text-stone-300 block">
                          Zona de San Diego / Valencia:
                        </label>
                        <select
                          value={customer.deliveryZoneId}
                          onChange={(e) =>
                            setCustomer({ ...customer, deliveryZoneId: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-[#141418] border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          {BRAND_CONFIG.services.delivery.zones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.name} (+${zone.fee} · {zone.estimate})
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={customer.deliveryAddress || ''}
                          onChange={(e) =>
                            setCustomer({ ...customer, deliveryAddress: e.target.value })
                          }
                          placeholder="Urbanización, calle, casa/edificio, punto de referencia..."
                          className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 mt-2"
                        />
                      </div>
                    )}
                  </div>

                  {/* 2. Método de Pago */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                      <span>2. Método de Pago</span>
                    </h3>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, paymentMethod: 'pagoMovil' })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.paymentMethod === 'pagoMovil'
                            ? 'bg-amber-400/15 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.02] border-white/[0.08] text-stone-400'
                        }`}
                      >
                        <Smartphone className="h-4 w-4 mb-1" />
                        <span className="text-xs font-bold">Pago Móvil</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, paymentMethod: 'cash' })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.paymentMethod === 'cash'
                            ? 'bg-amber-400/15 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.02] border-white/[0.08] text-stone-400'
                        }`}
                      >
                        <DollarSign className="h-4 w-4 mb-1" />
                        <span className="text-xs font-bold">Efectivo USD</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, paymentMethod: 'zelle' })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.paymentMethod === 'zelle'
                            ? 'bg-amber-400/15 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.02] border-white/[0.08] text-stone-400'
                        }`}
                      >
                        <CreditCard className="h-4 w-4 mb-1" />
                        <span className="text-xs font-bold">Zelle</span>
                      </button>
                    </div>

                    {/* Pago Móvil Details Card with 1-Click Copy */}
                    {customer.paymentMethod === 'pagoMovil' && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-xs text-stone-300 space-y-2">
                        <div className="flex items-center justify-between text-emerald-300 font-bold">
                          <span>Datos Pago Móvil:</span>
                          {grandTotalBs && (
                            <span className="font-mono text-white text-xs bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/30">
                              {grandTotalBs}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-stone-300">
                          <p>Banco: <strong className="text-white">{BRAND_CONFIG.paymentInfo.pagoMovil.bank}</strong></p>
                          <p>Teléfono: <strong className="text-white">{BRAND_CONFIG.paymentInfo.pagoMovil.phone}</strong></p>
                          <p className="col-span-2">Cédula: <strong className="text-white">{BRAND_CONFIG.paymentInfo.pagoMovil.idNumber}</strong></p>
                        </div>

                        {/* Copy details button */}
                        <button
                          type="button"
                          onClick={handleCopyPagoMovil}
                          className="w-full py-1.5 px-3 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedData ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-300 font-bold">¡Datos copiados!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copiar datos de Pago Móvil</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Cash USD change option */}
                    {customer.paymentMethod === 'cash' && (
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs">
                        <label className="text-[11px] font-bold text-stone-300 block mb-1">
                          ¿Con cuánto billete pagarás? (Para llevarte vuelto exacto):
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {['Exacto', '$10', '$20', '$50'].map((bill) => (
                            <button
                              key={bill}
                              type="button"
                              onClick={() => setCustomer({ ...customer, cashBill: bill })}
                              className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                                customer.cashBill === bill
                                  ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                                  : 'bg-white/[0.05] border-white/10 text-stone-300'
                              }`}
                            >
                              {bill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Zelle Details */}
                    {customer.paymentMethod === 'zelle' && (
                      <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-stone-300 space-y-1">
                        <p className="text-purple-300 font-bold">Datos Zelle:</p>
                        <p className="font-mono text-[11px] text-stone-200">
                          {BRAND_CONFIG.paymentInfo.zelle.email}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          Titular: {BRAND_CONFIG.paymentInfo.zelle.holder}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 3. Datos del Cliente */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                      3. Tus Datos
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="Tu Nombre completo"
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="Teléfono / WhatsApp"
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer with Totals & WhatsApp CTA */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-white/[0.1] bg-[#110c09]/95 shrink-0 space-y-3">
                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold text-white">${subtotalUsd}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="font-mono font-bold text-amber-400">+${deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-white/[0.08]">
                    <span>Total a Pagar:</span>
                    <div className="text-right">
                      <div className="font-mono text-amber-400 font-bold">${grandTotalUsd} USD</div>
                      {grandTotalBs && (
                        <div className="text-[11px] font-mono text-emerald-400 font-normal">
                          {grandTotalBs}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm tracking-wide shadow-[0_6px_28px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_36px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar Pedido a WhatsApp</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
