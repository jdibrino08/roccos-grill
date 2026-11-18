import { useState, useEffect } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { HeroFlyThrough } from './components/HeroFlyThrough'
import { MenuSection } from './components/MenuSection'
import { ItemCustomizer } from './components/ItemCustomizer'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import type { MenuItem } from './data/menuData'
import type { CartItem } from './types/cart'

const CART_STORAGE_KEY = 'roccos_cart_v1'

export default function App() {
  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Selected item for customizer modal
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null)

  // Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Ignore storage errors in private browsing
    }
  }, [cart])

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Check if identical item already exists (same id/options)
      const existingIdx = prev.findIndex((item) => item.id === newItem.id)
      if (existingIdx > -1) {
        const updated = [...prev]
        const current = updated[existingIdx]
        const newQty = current.quantity + newItem.quantity
        updated[existingIdx] = {
          ...current,
          quantity: newQty,
          totalPrice: current.totalPricePerUnit * newQty,
        }
        return updated
      }
      return [...prev, newItem]
    })
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId)
      return
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.totalPricePerUnit * newQty,
          }
        }
        return item
      })
    )
  }

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  const handleClearCart = () => {
    setCart([])
  }

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0c0907] text-[#fbf8f2] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
        {/* Navigation */}
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onScrollToMenu={handleScrollToMenu}
        />

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroFlyThrough
            onScrollToMenu={handleScrollToMenu}
            onOpenCart={() => setIsCartOpen(true)}
          />

          {/* Menu Catalog Section */}
          <MenuSection onSelectItem={(item) => setCustomizingItem(item)} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Item Customizer Modal */}
        <ItemCustomizer
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddToCart}
        />

        {/* Cart / WhatsApp Checkout Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onOpenMenu={handleScrollToMenu}
        />
      </div>
    </SmoothScroll>
  )
}
