export interface Product {
  id: string
  name: string
  description: string
  price: number
  priceInCents: number
  image: string
  category: string
  rating: number
  inStock: boolean
  featured?: boolean
}

export interface Category {
  slug: string
  name: string
  description: string
}

export const categories: Category[] = [
  {
    slug: "eletronicos",
    name: "Eletrônicos",
    description: "Tecnologia de ponta para o seu dia a dia",
  },
  {
    slug: "casa",
    name: "Casa & Decoração",
    description: "Transforme sua casa em um lar aconchegante",
  },
  {
    slug: "moda",
    name: "Moda",
    description: "Estilo e conforto para todas as ocasiões",
  },
  {
    slug: "esportes",
    name: "Esportes",
    description: "Equipamentos para uma vida mais ativa",
  },
]

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    name: "Fone de Ouvido Bluetooth",
    description: "Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de 30 horas e som de alta qualidade.",
    price: 199.9,
    priceInCents: 19990,
    image: "/wireless-headphones.jpg",
    category: "eletronicos",
    rating: 4.5,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Watch Fitness",
    description: "Relógio inteligente com monitor de frequência cardíaca, GPS integrado e resistência à água.",
    price: 349.9,
    priceInCents: 34990,
    image: "/smartwatch-lifestyle.jpg",
    category: "eletronicos",
    rating: 4.8,
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Câmera de Segurança WiFi",
    description: "Câmera de segurança com visão noturna, detecção de movimento e armazenamento em nuvem.",
    price: 279.9,
    priceInCents: 27990,
    image: "/outdoor-security-camera.jpg",
    category: "eletronicos",
    rating: 4.6,
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Teclado Mecânico RGB",
    description: "Teclado mecânico gamer com iluminação RGB personalizável e switches de alta qualidade.",
    price: 429.9,
    priceInCents: 42990,
    image: "/mechanical-keyboard.jpg",
    category: "eletronicos",
    rating: 4.7,
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Mouse Gamer Wireless",
    description: "Mouse sem fio de alta precisão com sensor óptico de 16000 DPI e bateria de longa duração.",
    price: 189.9,
    priceInCents: 18990,
    image: "/gaming-mouse-wireless.jpg",
    category: "eletronicos",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "6",
    name: "Webcam Full HD",
    description: "Webcam com resolução 1080p, microfone integrado e foco automático para videoconferências.",
    price: 249.9,
    priceInCents: 24990,
    image: "/webcam-full-hd.jpg",
    category: "eletronicos",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "7",
    name: "Luminária LED Inteligente",
    description: "Luminária com controle por aplicativo, 16 milhões de cores e compatível com assistentes de voz.",
    price: 159.9,
    priceInCents: 15990,
    image: "/smart-led-lamp.jpg",
    category: "casa",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "8",
    name: "Aspirador Robô",
    description: "Aspirador robô inteligente com mapeamento a laser e limpeza programável via app.",
    price: 899.9,
    priceInCents: 89990,
    image: "/robot-vacuum-cleaner.png",
    category: "casa",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "9",
    name: "Cafeteira Elétrica Premium",
    description: "Cafeteira programável com moedor integrado, timer e jarra térmica de 1.5L.",
    price: 329.9,
    priceInCents: 32990,
    image: "/premium-coffee-maker.png",
    category: "casa",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "10",
    name: "Jaqueta Impermeável",
    description: "Jaqueta esportiva impermeável com capuz ajustável e bolsos com zíper.",
    price: 249.9,
    priceInCents: 24990,
    image: "/waterproof-jacket.png",
    category: "moda",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "11",
    name: "Tênis Running Pro",
    description: "Tênis de corrida com amortecimento avançado e solado antiderrapante.",
    price: 399.9,
    priceInCents: 39990,
    image: "/running-shoes.jpg",
    category: "esportes",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "12",
    name: "Mochila Executiva",
    description: "Mochila para notebook até 15.6 polegadas com compartimentos organizadores e porta USB.",
    price: 179.9,
    priceInCents: 17990,
    image: "/executive-backpack.png",
    category: "moda",
    rating: 4.6,
    inStock: true,
  },
]

export function getCategories() {
  return categories
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getProducts() {
  return products
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.category === categorySlug)
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}

export function getCategoryName(categorySlug: string): string {
  const category = categories.find((c) => c.slug === categorySlug)
  return category ? category.name : categorySlug
}
