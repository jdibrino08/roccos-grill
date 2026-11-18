export interface BrandConfig {
  name: string
  legalName: string
  tagline: string
  heroHeadline: string
  heroSubheadline: string
  address: string
  addressShort: string
  city: string
  state: string
  country: string
  googleMapsUrl: string
  phone: string
  whatsappNumber: string // digits only for wa.me
  instagramHandle: string
  instagramUrl: string
  schedule: {
    days: string
    hours: string
    isOpenToday: boolean
    statusBadge: string
  }
  services: {
    driveThru: {
      enabled: boolean
      fee: number
      label: string
      description: string
    }
    pickup: {
      enabled: boolean
      fee: number
      label: string
      description: string
    }
    delivery: {
      enabled: boolean
      zones: {
        id: string
        name: string
        fee: number
        estimate: string
      }[]
    }
  }
  paymentInfo: {
    pagoMovil: {
      bank: string
      idNumber: string
      phone: string
      holder: string
    }
    zelle: {
      email: string
      holder: string
    }
    cash: {
      acceptedCurrencies: string[]
      notes: string
    }
  }
}

export const BRAND_CONFIG: BrandConfig = {
  name: "Rocco's Grill",
  legalName: "Rocco's Grill San Diego C.A.",
  tagline: "Auténtica Parrilla al Carbón, Cortes Premium & Burgers Gourmet",
  heroHeadline: "AUTÉNTICO SABOR A LA BRASA.",
  heroSubheadline: "Cortes madurados a leña de roble, smash burgers al hierro candente y guarniciones artesanales en el corazón de San Diego, Carabobo.",
  address: "Av. Intercomunal Don Julio Centeno, a la altura de Urb. El Remanso, San Diego, Carabobo, Venezuela",
  addressShort: "Av. Don Julio Centeno (El Remanso), San Diego",
  city: "San Diego",
  state: "Carabobo",
  country: "Venezuela",
  googleMapsUrl: "https://www.google.com/maps/place/roccos+grill/@10.2630277,-67.9624031,17z/data=!4m6!3m5!1s0x8e805de3ddcf0e35:0x542173a22c491da3!8m2!3d10.2630229!4d-67.9623134!16s%2Fg%2F11ywqhtk75",
  phone: "+58 412-7622671",
  whatsappNumber: "584127622671",
  instagramHandle: "@roccosgrill.sd",
  instagramUrl: "https://instagram.com",
  schedule: {
    days: "Miércoles a Domingo",
    hours: "12:00 PM – 11:00 PM",
    isOpenToday: true,
    statusBadge: "Abierto hoy hasta las 11:00 PM",
  },
  services: {
    driveThru: {
      enabled: true,
      fee: 0,
      label: "Auto-Servicio / Drive-Thru",
      description: "Recibe tu pedido caliente directamente en tu vehículo sin bajarte.",
    },
    pickup: {
      enabled: true,
      fee: 0,
      label: "Retiro en Local",
      description: "Listo para retirar en barra en 20 minutos.",
    },
    delivery: {
      enabled: true,
      zones: [
        {
          id: "san-diego-centro",
          name: "San Diego (El Remanso, La Esmeralda, Los Jarales, Tulipán)",
          fee: 2,
          estimate: "30-40 min",
        },
        {
          id: "san-diego-norte-sur",
          name: "San Diego Extendido (El Morro, Magallanes, Valle Verde)",
          fee: 2.5,
          estimate: "35-45 min",
        },
        {
          id: "valencia-norte",
          name: "Valencia Norte (Trigal, Prebo, El Viñedo, Guaparo, Mañongo)",
          fee: 4,
          estimate: "40-55 min",
        },
        {
          id: "naguanagua-tazajal",
          name: "Naguanagua / Tazajal / Metrópolis",
          fee: 4,
          estimate: "40-55 min",
        },
      ],
    },
  },
  paymentInfo: {
    pagoMovil: {
      bank: "Banesco (0134)",
      idNumber: "V-26.890.123",
      phone: "0412-7622671",
      holder: "Rocco's Grill C.A.",
    },
    zelle: {
      email: "pagos@roccosgrill.com",
      holder: "Rocco's Grill Group LLC",
    },
    cash: {
      acceptedCurrencies: ["USD Efectivo", "Euros en billete"],
      notes: "Por favor indicar billete exacto o denominación para llevar cambio en efectivo.",
    },
  },
}
