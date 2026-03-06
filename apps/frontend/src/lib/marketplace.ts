export type Seller = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  sales: number;
  location: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  sellerId: string;
  productRating: number;
  salesVolume: number;
  views: number;
};

export const commissionConfig = { min: 0.05, max: 0.1, default: 0.08 };

export const sellers: Seller[] = [
  { id: 's1', name: 'NovaTech', rating: 4.8, reviews: 3520, sales: 14800, location: 'Buenos Aires' },
  { id: 's2', name: 'UrbanHome', rating: 4.5, reviews: 1940, sales: 8400, location: 'CDMX' },
  { id: 's3', name: 'EcoStyle', rating: 4.7, reviews: 1220, sales: 5600, location: 'Bogotá' }
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Zentro Phone X1',
    description: 'Smartphone premium con pantalla OLED 6.7", cámara 108MP y batería de larga duración.',
    shortDescription: 'OLED 6.7", 256GB, cámara 108MP.',
    price: 899,
    category: 'Tecnología',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200'],
    stock: 18,
    sellerId: 's1',
    productRating: 4.7,
    salesVolume: 7200,
    views: 54000
  },
  {
    id: 'p2',
    title: 'AirBuds Pro Z',
    description: 'Auriculares inalámbricos con cancelación activa de ruido y audio espacial.',
    shortDescription: 'ANC, estuche con carga rápida.',
    price: 159,
    category: 'Tecnología',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200'],
    stock: 120,
    sellerId: 's1',
    productRating: 4.6,
    salesVolume: 9800,
    views: 63000
  },
  {
    id: 'p3',
    title: 'Silla ErgoCloud',
    description: 'Silla ergonómica con soporte lumbar dinámico y malla transpirable.',
    shortDescription: 'Oficina pro, ajuste 4D.',
    price: 299,
    category: 'Hogar',
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1200'],
    stock: 45,
    sellerId: 's2',
    productRating: 4.4,
    salesVolume: 3100,
    views: 28000
  },
  {
    id: 'p4',
    title: 'Chaqueta StormFlex',
    description: 'Chaqueta impermeable con diseño urbano, ligera y respirable.',
    shortDescription: 'Impermeable, corte urbano.',
    price: 89,
    category: 'Moda',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200'],
    stock: 78,
    sellerId: 's3',
    productRating: 4.5,
    salesVolume: 4700,
    views: 34000
  },
  {
    id: 'p5',
    title: 'Monitor UltraWide 34"',
    description: 'Monitor QHD 165Hz para productividad y gaming profesional.',
    shortDescription: 'QHD, 165Hz, ultrawide.',
    price: 649,
    category: 'Tecnología',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200'],
    stock: 22,
    sellerId: 's1',
    productRating: 4.8,
    salesVolume: 2600,
    views: 41000
  },
  {
    id: 'p6',
    title: 'Lámpara Aura Minimal',
    description: 'Lámpara inteligente con escenas de color y control por app.',
    shortDescription: 'RGB, smart home.',
    price: 59,
    category: 'Hogar',
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200'],
    stock: 140,
    sellerId: 's2',
    productRating: 4.3,
    salesVolume: 3900,
    views: 26000
  }
];

export function getSellerById(id: string) {
  return sellers.find((s) => s.id === id);
}

export function calculateRankingScore(product: Product) {
  const seller = getSellerById(product.sellerId);
  const sellerRating = seller?.rating ?? 0;
  return product.salesVolume * 0.4 + sellerRating * 1000 * 0.2 + product.productRating * 1000 * 0.2 + product.views * 0.2;
}

export function rankedProducts() {
  return [...products].sort((a, b) => calculateRankingScore(b) - calculateRankingScore(a));
}

export function recommendations(product: Product) {
  const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
  const similarPrice = products.filter((p) => p.id !== product.id && Math.abs(p.price - product.price) < 120);
  const popular = rankedProducts().filter((p) => p.id !== product.id).slice(0, 4);

  return {
    related: sameCategory.slice(0, 4),
    alsoViewed: similarPrice.slice(0, 4),
    forYou: popular
  };
}

export function calculateCommission(price: number, rate = commissionConfig.default) {
  const commission = Number((price * rate).toFixed(2));
  return { commission, sellerNet: Number((price - commission).toFixed(2)), rate };
}

export function fraudFlags() {
  return [
    { id: 'f1', type: 'Fake reviews', severity: 'high', entity: 'seller:s2', note: 'Picos anormales de reseñas en 24h.' },
    { id: 'f2', type: 'Abnormal order activity', severity: 'medium', entity: 'seller:s3', note: 'Pedidos repetitivos desde misma IP.' },
    { id: 'f3', type: 'Suspicious seller behavior', severity: 'low', entity: 'seller:s1', note: 'Cambios de precios extremos.' }
  ];
}
