import type { MenuItem, MenuItemOption } from '../data/menuData'

export interface SelectedOption {
  groupId: string
  groupName: string
  option: MenuItemOption
}

export interface CartItem {
  id: string // unique cart item id (e.g. item.id + options hash)
  menuItem: MenuItem
  quantity: number
  selectedOptions: SelectedOption[]
  specialInstructions?: string
  totalPricePerUnit: number
  totalPrice: number
}

export type DeliveryMode = 'pickup' | 'driveThru' | 'delivery'
export type PaymentMethod = 'pagoMovil' | 'cash' | 'zelle'

export interface CheckoutCustomer {
  name: string
  phone: string
  deliveryMode: DeliveryMode
  deliveryZoneId?: string
  deliveryAddress?: string
  vehicleDescription?: string // for drive-thru
  paymentMethod: PaymentMethod
  cashBill?: string // e.g. "Exacto", "$10", "$20", "$50"
  notes?: string
}
