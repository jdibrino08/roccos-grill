export interface MenuItemOption {
  id: string
  name: string
  price: number
}

export interface MenuItemOptionGroup {
  id: string
  name: string
  required: boolean
  maxSelect?: number
  options: MenuItemOption[]
}

export interface MenuItem {
  id: string
  name: string
  category: 'cortes' | 'burgers' | 'combos' | 'entradas' | 'bebidas'
  badge?: string
  description: string
  price: number // USD
  imageUrl: string
  servings?: string
  cookingTime?: string
  optionGroups?: MenuItemOptionGroup[]
}

export interface MenuCategory {
  id: 'cortes' | 'burgers' | 'combos' | 'entradas' | 'bebidas'
  name: string
  subtitle: string
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'cortes',
    name: 'Cortes al Carbón',
    subtitle: 'Carne madurada y sellada al fuego de leña y brasas vivas',
  },
  {
    id: 'burgers',
    name: 'Burgers Gourmet',
    subtitle: '100% res a la parrilla, pan brioche artesanal tostado con mantequilla',
  },
  {
    id: 'combos',
    name: 'Parrilladas Familiares',
    subtitle: 'Para compartir entre 2 a 4 personas con todos los contornos',
  },
  {
    id: 'entradas',
    name: 'Raciones & Picadas',
    subtitle: 'Para abrir el apetito con toques ahumados y queso fundido',
  },
  {
    id: 'bebidas',
    name: 'Bebidas & Frías',
    subtitle: 'Refrescos, papelón con limón natural y cervezas bien frías',
  },
]

export const MENU_ITEMS: MenuItem[] = [
  // 1. CORTES AL CARBÓN
  {
    id: 'punta-trasera-rocco',
    name: 'Punta Trasera Premium (350g)',
    category: 'cortes',
    badge: 'Corte Estrella',
    description: 'Corte magro con su característica capa de grasa dorada al carbón, sal marina gruesa, chimichurri casero y dos contornos a elección.',
    price: 14,
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80',
    servings: '1 persona',
    cookingTime: '20-25 min',
    optionGroups: [
      {
        id: 'doneness',
        name: 'Término de la Carne',
        required: true,
        options: [
          { id: 'medio', name: 'Término Medio (Centro rojo y jugoso)', price: 0 },
          { id: 'tres-cuartos', name: 'Tres Cuartos (Poco rosado)', price: 0 },
          { id: 'bien-cocido', name: 'Bien Cocido', price: 0 },
        ],
      },
      {
        id: 'sides',
        name: 'Elige 2 Contornos',
        required: true,
        maxSelect: 2,
        options: [
          { id: 'yuca-frita', name: 'Yuca Frita Crujiente', price: 0 },
          { id: 'papas-rusticas', name: 'Papas Rústicas al Romero', price: 0 },
          { id: 'tostones', name: 'Tostones con Queso Llanero', price: 0 },
          { id: 'ensalada-cesar', name: 'Ensalada César Criolla', price: 0 },
          { id: 'halloquita', name: 'Hallaquitas de Maíz con Mantequilla', price: 0 },
        ],
      },
      {
        id: 'extras',
        name: 'Extras Parrilleros',
        required: false,
        options: [
          { id: 'queso-plancha', name: 'Queso Telita / De Mano a la Plancha', price: 2 },
          { id: 'chorizo-extra', name: 'Chorizo Ahumado Artesanal', price: 3 },
          { id: 'aguacate', name: 'Porción de Aguacate Fresco', price: 2 },
        ],
      },
    ],
  },
  {
    id: 'churrasco-solomo',
    name: 'Churrasco de Solomo (400g)',
    category: 'cortes',
    badge: 'Más Jugoso',
    description: 'Tierno solomo de cuerito asado al fuego lento con mantequilla de hierbas aromáticas, chimichurri y dos contornos tradicionales.',
    price: 16,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    servings: '1 persona',
    cookingTime: '20-25 min',
    optionGroups: [
      {
        id: 'doneness',
        name: 'Término de la Carne',
        required: true,
        options: [
          { id: 'medio', name: 'Término Medio (Jugoso)', price: 0 },
          { id: 'tres-cuartos', name: 'Tres Cuartos', price: 0 },
          { id: 'bien-cocido', name: 'Bien Cocido', price: 0 },
        ],
      },
      {
        id: 'sides',
        name: 'Elige 2 Contornos',
        required: true,
        maxSelect: 2,
        options: [
          { id: 'papas-rusticas', name: 'Papas Rústicas al Romero', price: 0 },
          { id: 'yuca-hervida', name: 'Yuca Hervida con Mojo de Ajo', price: 0 },
          { id: 'tostones', name: 'Tostones con Queso', price: 0 },
          { id: 'ensalada-rusa', name: 'Ensalada Rusa Especial', price: 0 },
        ],
      },
    ],
  },
  {
    id: 'costillas-bbq-roble',
    name: 'Costillar Ahumado al Roble (500g)',
    category: 'cortes',
    badge: 'Ahumado Lento',
    description: 'Costillas de cerdo glaseadas en reducción BBQ artesanal con melaza y especias secretas, cocinadas 6 horas a fuego indirecto hasta desprenderse del hueso.',
    price: 15,
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=80',
    servings: '1-2 personas',
    cookingTime: '15-20 min',
    optionGroups: [
      {
        id: 'sides',
        name: 'Elige 2 Contornos',
        required: true,
        maxSelect: 2,
        options: [
          { id: 'papas-fritas', name: 'Papas Fritas Tradicionales', price: 0 },
          { id: 'coleslaw', name: 'Ensalada Cole Slaw Dulce', price: 0 },
          { id: 'yuca-frita', name: 'Yuca Frita con Sal Marina', price: 0 },
        ],
      },
    ],
  },

  // 2. BURGERS GOURMET
  {
    id: 'rocco-double-smash',
    name: 'Rocco Double Smash Burger',
    category: 'burgers',
    badge: 'Best Seller',
    description: 'Doble carne de res premium (2x100g) aplastada al hierro fundido con costra caramelizada, doble queso cheddar americano, tocineta ahumada crujiente, cebolla grillada y salsa secreta Rocco en pan brioche.',
    price: 9,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    servings: 'Incluye Papas Fritas',
    cookingTime: '15 min',
    optionGroups: [
      {
        id: 'extras',
        name: 'Adicionales',
        required: false,
        options: [
          { id: 'extra-patty', name: 'Carne Smash Extra (+100g)', price: 2 },
          { id: 'extra-bacon', name: 'Doble Tocineta Ahumada', price: 1.5 },
          { id: 'huevo-frito', name: 'Huevo a Caballo', price: 1 },
          { id: 'queso-cebolla', name: 'Cebolla Crispy', price: 1 },
        ],
      },
    ],
  },
  {
    id: 'burger-parrillera-rocco',
    name: 'Burger Parrillera con Queso de Mano',
    category: 'burgers',
    badge: 'Criolla Gourmet',
    description: 'Carne gruesa al carbón (180g), queso de mano llanero derretido en parrilla, tocineta, aguacate fresco, guasacaca suave y lechuga hidropónica en brioche de sésamo.',
    price: 10,
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
    servings: 'Incluye Papas Rústicas',
    cookingTime: '15-20 min',
    optionGroups: [
      {
        id: 'extras',
        name: 'Personalización',
        required: false,
        options: [
          { id: 'extra-queso-mano', name: 'Doble Queso de Mano', price: 2 },
          { id: 'chimichurri-side', name: 'Shot de Chimichurri Parrillero', price: 0.5 },
        ],
      },
    ],
  },
  {
    id: 'choripan-artesanal',
    name: 'Choripán Artesanal de la Casa',
    category: 'burgers',
    badge: 'Tradicional',
    description: 'Chorizo parrillero artesanal de cerdo y res marcado a la brasa, servido en baguette recién horneado con chimichurri casero y ensaladilla criolla.',
    price: 7,
    imageUrl: 'https://images.unsplash.com/photo-1627042633706-01a5e04cb284?auto=format&fit=crop&w=1000&q=80',
    servings: 'Incluye Papas Fritas',
    cookingTime: '12 min',
  },

  // 3. COMBOS PARRILLEROS FAMILIARES
  {
    id: 'parrillada-rocco-familiar',
    name: 'Gran Parrillada Rocco (Para 3-4 Personas)',
    category: 'combos',
    badge: 'Para Compartir',
    description: '400g de Punta Trasera, 400g de Pechuga de Pollo a la brasa, 2 Chorizos parrilleros, Chinchurria crocante, Queso a la plancha, Yuca frita, Tostones, Ensalada de la casa, Guasacaca y Chimichurri.',
    price: 32,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    servings: '3 a 4 personas',
    cookingTime: '25-30 min',
    optionGroups: [
      {
        id: 'doneness',
        name: 'Término de la Carne de Res',
        required: true,
        options: [
          { id: 'medio', name: 'Término Medio', price: 0 },
          { id: 'tres-cuartos', name: 'Tres Cuartos', price: 0 },
          { id: 'bien-cocido', name: 'Bien Cocido', price: 0 },
        ],
      },
      {
        id: 'bebida-combo',
        name: 'Agrega Refresco 1.5L',
        required: false,
        options: [
          { id: 'refresco-coca-cola', name: 'Coca-Cola 1.5L', price: 2.5 },
          { id: 'refresco-chinotto', name: 'Chinotto 1.5L', price: 2.5 },
        ],
      },
    ],
  },
  {
    id: 'parrilla-duo-san-diego',
    name: 'Parrilla Dúo San Diego (Para 2 Personas)',
    category: 'combos',
    badge: 'La Más Pedida',
    description: '300g de Solomo de res, 250g de Pollo a la plancha, 1 Chorizo artesanal, ración de yuca frita dorada, tostones con queso y ensalada criolla fresca.',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    servings: '2 personas',
    cookingTime: '20 min',
  },

  // 4. ENTRADAS & PICADAS
  {
    id: 'tequenos-artesanales',
    name: 'Tequeños de Queso Blanco Artesanal (6 uds)',
    category: 'entradas',
    badge: 'Imperdibles',
    description: 'Masa fina y hojaldrada rellena con generoso queso blanco semiduro fundido. Servidos con dip tártaro o salsa de ajo criolla.',
    price: 5,
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1000&q=80',
    servings: '6 unidades',
    cookingTime: '10 min',
  },
  {
    id: 'alitas-ahumadas',
    name: 'Alitas Ahumadas & Crujientes (8 uds)',
    category: 'entradas',
    badge: 'Parrilleras',
    description: 'Alitas marinadas en especias, ahumadas con leña y terminadas a fuego vivo con salsa BBQ Bourbon o Picante Suave.',
    price: 7,
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80',
    servings: '8 unidades',
    cookingTime: '15 min',
    optionGroups: [
      {
        id: 'sauce',
        name: 'Elige tu Salsa',
        required: true,
        options: [
          { id: 'bbq', name: 'BBQ Ahumada al Bourbon', price: 0 },
          { id: 'buffalo', name: 'Buffalo Picante Moderado', price: 0 },
          { id: 'miel-mostaza', name: 'Honey Mustard de la Casa', price: 0 },
        ],
      },
    ],
  },
  {
    id: 'papas-trufadas-parmesano',
    name: 'Papas Rústicas Trufadas con Parmesano',
    category: 'entradas',
    badge: 'Crunchy',
    description: 'Papas corte rústico fritas con aceite de trufa blanca, lluvia de queso parmesano recién rallado y toque de perejil fresco.',
    price: 5,
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
    servings: 'Para picar',
    cookingTime: '10 min',
  },

  // 5. BEBIDAS & FRÍAS
  {
    id: 'papelon-limon-natural',
    name: 'Papelón con Limón Artesanal (Medio Litro)',
    category: 'bebidas',
    badge: '100% Natural',
    description: 'Jugo tradicional preparado con papelón raspado, abundante zumo de limón recién exprimido y servido con hielo frappeado.',
    price: 2,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    servings: 'Vaso 500ml',
  },
  {
    id: 'refresco-lata',
    name: 'Refresco en Lata (355ml)',
    category: 'bebidas',
    description: 'Coca-Cola regular, Coca-Cola Zero, Chinotto, Frescolita o Nestea de Durazno.',
    price: 1.5,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=80',
    optionGroups: [
      {
        id: 'soda-type',
        name: 'Elige el Sabor',
        required: true,
        options: [
          { id: 'coca-cola', name: 'Coca-Cola Regular', price: 0 },
          { id: 'coca-cola-zero', name: 'Coca-Cola Zero', price: 0 },
          { id: 'chinotto', name: 'Chinotto Limón', price: 0 },
          { id: 'frescolita', name: 'Frescolita', price: 0 },
          { id: 'nestea', name: 'Nestea Durazno', price: 0 },
        ],
      },
    ],
  },
  {
    id: 'cerveza-polar-pilsen',
    name: 'Cerveza Polar Pilsen / Light (Tercio Frío)',
    category: 'bebidas',
    badge: 'Vestida de Novia',
    description: 'Botella de tercio a temperatura bajo cero para acompañar la parrilla.',
    price: 2,
    imageUrl: 'https://images.unsplash.com/photo-1608270546103-90038865c3bb?auto=format&fit=crop&w=1000&q=80',
    optionGroups: [
      {
        id: 'beer-type',
        name: 'Tipo de Cerveza',
        required: true,
        options: [
          { id: 'polar-pilsen', name: 'Polar Pilsen (Negra)', price: 0 },
          { id: 'polar-light', name: 'Polar Light (Azul)', price: 0 },
          { id: 'solera-verde', name: 'Solera Premium Verde (+0.5$)', price: 0.5 },
        ],
      },
    ],
  },
]
