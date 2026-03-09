export type UserRole = 'buyer' | 'seller' | 'admin';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  phone: string;
  email: string;
  passwordHash: string;
  address: string;
  city: string;
  country: string;
  roles: UserRole[];
  emailVerified: boolean;
  smsVerified: boolean;
  isBanned: boolean;
  fraudFlags: number;
};

export type Seller = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  sales: number;
  location: string;
  verified: boolean;
  governmentIdVerified: boolean;
  phoneVerified: boolean;
  fullAddressVerified: boolean;
};

export type ProductCondition = 'new' | 'refurbished' | 'used';

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
  condition: ProductCondition;
  productRating: number;
  salesVolume: number;
  views: number;
};

export type EscrowStatus =
  | 'pending_payment'
  | 'payment_secured_escrow'
  | 'seller_shipping_to_reception'
  | 'verification_in_reception_center'
  | 'shipping_to_buyer'
  | 'delivered'
  | 'refunded';

export type EscrowTransaction = {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  commissionRate: number;
  status: EscrowStatus;
};

export type ReceptionReview = {
  orderId: string;
  productId: string;
  listingCondition: ProductCondition;
  receivedCondition: ProductCondition;
  approved: boolean;
  notes: string;
};

export const commissionConfig = { min: 0.05, max: 0.1, default: 0.08 };

export const users: User[] = [
  {
    id: 'u1',
    firstName: 'Lucía',
    lastName: 'Pérez',
    nationalId: 'AR-12345678',
    phone: '+541112223333',
    email: 'lucia@zentro.com',
    passwordHash: 'bcrypt$mock',
    address: 'Av. Siempre Viva 123',
    city: 'Buenos Aires',
    country: 'Argentina',
    roles: ['buyer', 'seller'],
    emailVerified: true,
    smsVerified: true,
    isBanned: false,
    fraudFlags: 0
  }
];

export const sellers: Seller[] = [
  {
    id: 's1',
    name: 'NovaTech',
    rating: 4.8,
    reviews: 3520,
    sales: 14800,
    location: 'Buenos Aires',
    verified: true,
    governmentIdVerified: true,
    phoneVerified: true,
    fullAddressVerified: true
  },
  {
    id: 's2',
    name: 'UrbanHome',
    rating: 4.5,
    reviews: 1940,
    sales: 8400,
    location: 'CDMX',
    verified: true,
    governmentIdVerified: true,
    phoneVerified: true,
    fullAddressVerified: true
  },
  {
    id: 's3',
    name: 'EcoStyle',
    rating: 4.7,
    reviews: 1220,
    sales: 5600,
    location: 'Bogotá',
    verified: false,
    governmentIdVerified: false,
    phoneVerified: true,
    fullAddressVerified: false
  }
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
    condition: 'new',
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
    condition: 'new',
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
    condition: 'refurbished',
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
    condition: 'used',
    productRating: 4.5,
    salesVolume: 4700,
    views: 34000
  }
];

export function getSellerById(id: string) {
  return sellers.find((s) => s.id === id);
}

export function isValidNationalId(nationalId: string) {
  return /^[A-Z]{2}-\d{7,10}$/.test(nationalId);
}

export function canRegisterUser(payload: Pick<User, 'email' | 'nationalId' | 'phone'>) {
  const duplicate = users.find((u) => u.email === payload.email || u.nationalId === payload.nationalId || u.phone === payload.phone);
  return !duplicate && isValidNationalId(payload.nationalId);
}

export function canSellerPublish(sellerId: string) {
  const seller = getSellerById(sellerId);
  return Boolean(seller?.verified && seller?.governmentIdVerified && seller?.phoneVerified && seller?.fullAddressVerified);
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
  const safeRate = Math.min(commissionConfig.max, Math.max(commissionConfig.min, rate));
  const commission = Number((price * safeRate).toFixed(2));
  return { commission, sellerNet: Number((price - commission).toFixed(2)), rate: safeRate };
}

export function createEscrow(orderId: string, buyerId: string, sellerId: string, amount: number): EscrowTransaction {
  return {
    id: `escrow-${orderId}`,
    orderId,
    buyerId,
    sellerId,
    amount,
    commissionRate: commissionConfig.default,
    status: 'payment_secured_escrow'
  };
}

export function receptionCenterReview(review: ReceptionReview) {
  const approved = review.listingCondition === review.receivedCondition;
  return {
    ...review,
    approved,
    notes: approved ? 'Condition matches listing. Ship to buyer and release escrow.' : 'Condition mismatch. Return to seller and refund buyer.'
  };
}

export function fraudFlags() {
  return [
    { id: 'f1', type: 'Fake reviews', severity: 'high', entity: 'seller:s2', note: 'Picos anormales de reseñas en 24h.' },
    { id: 'f2', type: 'Abnormal order activity', severity: 'medium', entity: 'buyer:u44', note: 'Intentos de pago fallidos repetidos.' },
    { id: 'f3', type: 'Suspicious seller behavior', severity: 'high', entity: 'seller:s3', note: 'Producto enviado no coincide con descripción.' }
  ];
}

export function enforceFraudRules() {
  return [
    { rule: 'payment_failed', action: 'cancel_order' },
    { rule: 'repeated_payment_refusal', action: 'flag_buyer' },
    { rule: 'buyer_scam_attempt', action: 'ban_buyer' },
    { rule: 'seller_wrong_product', action: 'flag_seller' },
    { rule: 'repeated_fraud', action: 'ban_user' }
  ];
}
