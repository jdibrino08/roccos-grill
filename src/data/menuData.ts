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
  category: 'brasas' | 'mariscos' | 'alitas-burgers' | 'cocteles' | 'entradas'
  badge?: string
  description: string
  price: number // USD
  imageUrl: string
  servings?: string
  cookingTime?: string
  optionGroups?: MenuItemOptionGroup[]
}

export interface MenuCategory {
  id: 'brasas' | 'mariscos' | 'alitas-burgers' | 'cocteles' | 'entradas'
  name: string
  subtitle: string
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'brasas',
    name: 'Cortes & Brasas',
    subtitle: 'Costillares glaseados, solomo y cortes seleccionados al fuego',
  },
  {
    id: 'mariscos',
    name: 'Paellas & Especialidades',
    subtitle: 'Paella marinera al sartén de hierro y salteados especiales',
  },
  {
    id: 'alitas-burgers',
    name: 'Alitas & Burgers',
    subtitle: 'Alitas glaseadas BBQ con sésamo y smash burgers artesanales',
  },
  {
    id: 'cocteles',
    name: 'Coctelería de Autor',
    subtitle: 'Margaritas frozen escarchadas, mojitos cítricos y tragos de la casa',
  },
  {
    id: 'entradas',
    name: 'Raciones & Picadas',
    subtitle: 'Tequeños dorados, tostones y papas crujientes para abrir mesa',
  },
]

export const MENU_ITEMS: MenuItem[] = [
  // 1. CORTES & BRASAS
  {
    id: 'costillar-bbq-glaseado',
    name: 'Costillar Glaseado BBQ & Puerro Crocante',
    category: 'brasas',
    badge: 'Firma de la Casa',
    description: 'Costillar de cerdo tierno cocido a baja temperatura y terminado al grill con reducción BBQ artesanal caramelizada, julianas finas de puerro fresco y ración de papas fritas doradas.',
    price: 15,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    servings: '1-2 personas',
    cookingTime: '20 min',
    optionGroups: [
      {
        id: 'sides',
        name: 'Elige tu Contorno',
        required: true,
        options: [
          { id: 'papas-fritas', name: 'Papas Fritas Tradicionales', price: 0 },
          { id: 'yuca-frita', name: 'Yuca Frita con Sal Marina', price: 0 },
          { id: 'tostones', name: 'Tostones con Queso Llanero', price: 0 },
        ],
      },
    ],
  },
  {
    id: 'punta-trasera-rocco',
    name: 'Punta Trasera al Carbón (350g)',
    category: 'brasas',
    badge: 'Corte Estrella',
    description: 'Corte de res jugoso sellado a la brasa con costra de sal marina, chimichurri de la casa y dos contornos a elección.',
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
          { id: 'papas-fritas', name: 'Papas Fritas Doradas', price: 0 },
          { id: 'yuca-frita', name: 'Yuca Frita Crujiente', price: 0 },
          { id: 'tostones', name: 'Tostones con Queso', price: 0 },
          { id: 'ensalada-cesar', name: 'Ensalada César Criolla', price: 0 },
        ],
      },
    ],
  },
  {
    id: 'churrasco-solomo',
    name: 'Churrasco de Solomo Premium (400g)',
    category: 'brasas',
    badge: 'Jugoso',
    description: 'Solomo de cuerito marcado a fuego vivo con mantequilla especiada de romero, ajo rostizado y guarniciones artesanales.',
    price: 16,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    servings: '1 persona',
    cookingTime: '20 min',
    optionGroups: [
      {
        id: 'doneness',
        name: 'Término de la Carne',
        required: true,
        options: [
          { id: 'medio', name: 'Término Medio', price: 0 },
          { id: 'tres-cuartos', name: 'Tres Cuartos', price: 0 },
          { id: 'bien-cocido', name: 'Bien Cocido', price: 0 },
        ],
      },
    ],
  },

  // 2. PAELLAS & ESPECIALIDADES
  {
    id: 'paella-marinera-rocco',
    name: 'Gran Paella Marinera al Sartén de Hierro',
    category: 'mariscos',
    badge: 'Especial del Chef',
    description: 'Arroz al azafrán preparado en paellera tradicional con camarones enteros seleccionados, mejillones del caribe, tiras de pimentón rojo asado y guisantes dulces.',
    price: 18,
    imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1000&q=80',
    servings: '1-2 personas',
    cookingTime: '25-30 min',
    optionGroups: [
      {
        id: 'portion',
        name: 'Tamaño de la Paellera',
        required: true,
        options: [
          { id: 'individual', name: 'Porción Personal / Dúo (1-2 personas)', price: 0 },
          { id: 'familiar', name: 'Paellera Familiar (3-4 personas)', price: 16 },
        ],
      },
    ],
  },
  {
    id: 'fajitas-mixtas-hierro',
    name: 'Salteado Mixto en Plancha de Hierro Fundido',
    category: 'mariscos',
    badge: 'Sabor Intenso',
    description: 'Tiras de pollo y res sazonadas y salteadas a fuego vivo sobre sartén de hierro chispeante, servidas sobre base de madera rústica con tortillas de maíz o tostones.',
    price: 13,
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80',
    servings: '1-2 personas',
    cookingTime: '15-20 min',
  },

  // 3. ALITAS & BURGERS
  {
    id: 'alitas-bbq-sesamo',
    name: 'Alitas Glaseadas BBQ al Sésamo (8 uds)',
    category: 'alitas-burgers',
    badge: 'Favorito del Bar',
    description: 'Alitas de pollo crujientes bañadas en generosa salsa BBQ ahumada artesanal, espolvoreadas con semillas de sésamo tostadas y montaña de papas fritas doradas.',
    price: 8,
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80',
    servings: '8 alitas + papas',
    cookingTime: '15 min',
    optionGroups: [
      {
        id: 'sauce-type',
        name: 'Estilo de Salsa',
        required: true,
        options: [
          { id: 'bbq-sesamo', name: 'BBQ Glaseada con Sésamo', price: 0 },
          { id: 'buffalo-hot', name: 'Buffalo Picante Criollo', price: 0 },
          { id: 'honey-mustard', name: 'Mostaza Miel Artesanal', price: 0 },
        ],
      },
    ],
  },
  {
    id: 'rocco-smash-burger',
    name: 'Rocco Double Smash Burger',
    category: 'alitas-burgers',
    badge: 'Best Seller',
    description: 'Doble carne de res 100% fresca aplastada al hierro fundido con costra caramelizada, doble queso cheddar fundido, tocineta ahumada crujiente y salsa especial Rocco en pan brioche de mantequilla.',
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
          { id: 'carne-extra', name: 'Carne Smash Extra (+100g)', price: 2 },
          { id: 'bacon-extra', name: 'Doble Tocineta Ahumada', price: 1.5 },
          { id: 'huevo-frito', name: 'Huevo a Caballo', price: 1 },
        ],
      },
    ],
  },

  // 4. COCTELERÍA DE AUTOR & FROZEN
  {
    id: 'margarita-fresa-frozen',
    name: 'Margarita de Fresa Frozen Escarchada',
    category: 'cocteles',
    badge: 'Trago Estrella',
    description: 'Refrescante margarita frozen preparada con pulpa concentrada de fresas naturales, tequila reposado, triple sec, toque cítrico, copa con borde escarchado en sal y azúcar, decorada con menta fresca.',
    price: 6,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    servings: 'Copa Coctelera',
  },
  {
    id: 'mojito-citrico-rocco',
    name: 'Mojito Cítrico de la Casa con Hierbabuena',
    category: 'cocteles',
    badge: 'Refrescante',
    description: 'Ron blanco superior macerado con abundante hierbabuena fresca, zumo natural de lima, toque dulce de azúcar de caña y soda efervescente servido en vaso alto con hielo frappé.',
    price: 5,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    servings: 'Vaso Highball 450ml',
  },
  {
    id: 'papelon-limon-frappe',
    name: 'Papelón con Limón Natural',
    category: 'cocteles',
    badge: 'Sin Alcohol',
    description: 'Jugo tradicional venezolano preparado a mano con papelón de caña raspado, abundante limón recién exprimido y hielo frappeado.',
    price: 2,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    servings: 'Vaso 500ml',
  },
  {
    id: 'cerveza-tercio-frio',
    name: 'Cerveza Polar Pilsen / Light (Tercio Frío)',
    category: 'cocteles',
    badge: 'Vestida de Novia',
    description: 'Botella de tercio a temperatura bajo cero servida al instante.',
    price: 2,
    imageUrl: 'https://images.unsplash.com/photo-1608270546103-90038865c3bb?auto=format&fit=crop&w=1000&q=80',
  },

  // 5. ENTRADAS & PICADAS
  {
    id: 'tequenos-artesanales',
    name: 'Tequeños de Queso Blanco Artesanal (6 uds)',
    category: 'entradas',
    badge: 'Crujientes',
    description: 'Masa fina dorada rellena de queso blanco semiduro fundido. Servidos con dip tártaro de la casa.',
    price: 5,
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1000&q=80',
    servings: '6 unidades',
    cookingTime: '10 min',
  },
  {
    id: 'papas-fritas-rocco',
    name: 'Ración de Papas Fritas Doradas',
    category: 'entradas',
    description: 'Corte tradicional fritas al momento con sal marina y aderezo especial de la casa.',
    price: 3.5,
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
  },
]
