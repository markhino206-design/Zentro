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

export type ChatMessage = {
  id: string;
  from: 'buyer' | 'seller';
  text: string;
  timestamp: string;
  flaggedSpam: boolean;
};

export const commissionConfig = { min: 0.08, max: 0.08, default: 0.08 };
export const publicationFeeUSD = 2;

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
  { id: 's1', name: 'NovaTech', rating: 4.8, reviews: 3520, sales: 14800, location: 'Buenos Aires', verified: true, governmentIdVerified: true, phoneVerified: true, fullAddressVerified: true },
  { id: 's2', name: 'UrbanHome', rating: 4.5, reviews: 1940, sales: 8400, location: 'CDMX', verified: true, governmentIdVerified: true, phoneVerified: true, fullAddressVerified: true },
  { id: 's3', name: 'EcoStyle', rating: 4.7, reviews: 1220, sales: 5600, location: 'Bogotá', verified: false, governmentIdVerified: false, phoneVerified: true, fullAddressVerified: false }
];

export const products: Product[] = [
  { id: 'p1', title: 'Zentro Phone X1', description: 'Smartphone premium con pantalla OLED 6.7", cámara 108MP y batería de larga duración.', shortDescription: 'OLED 6.7", 256GB, cámara 108MP.', price: 899, category: 'Tecnología', images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200'], stock: 18, sellerId: 's1', condition: 'new', productRating: 4.7, salesVolume: 7200, views: 54000 },
  { id: 'p2', title: 'AirBuds Pro Z', description: 'Auriculares inalámbricos con cancelación activa de ruido y audio espacial.', shortDescription: 'ANC, estuche con carga rápida.', price: 159, category: 'Tecnología', images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200'], stock: 120, sellerId: 's1', condition: 'new', productRating: 4.6, salesVolume: 9800, views: 63000 },
  { id: 'p3', title: 'Silla ErgoCloud', description: 'Silla ergonómica con soporte lumbar dinámico y malla transpirable.', shortDescription: 'Oficina pro, ajuste 4D.', price: 299, category: 'Hogar', images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1200'], stock: 45, sellerId: 's2', condition: 'refurbished', productRating: 4.4, salesVolume: 3100, views: 28000 },
  { id: 'p4', title: 'Chaqueta StormFlex', description: 'Chaqueta impermeable con diseño urbano, ligera y respirable.', shortDescription: 'Impermeable, corte urbano.', price: 89, category: 'Moda', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200'], stock: 78, sellerId: 's3', condition: 'used', productRating: 4.5, salesVolume: 4700, views: 34000 }
];

export const chatThreads: ChatMessage[] = [
  { id: 'm1', from: 'buyer', text: 'Hola, ¿el producto es nuevo y sellado?', timestamp: '2026-03-09T10:00:00Z', flaggedSpam: false },
  { id: 'm2', from: 'seller', text: 'Sí, nuevo y con garantía oficial.', timestamp: '2026-03-09T10:02:00Z', flaggedSpam: false }
];

export function getSellerById(id: string) {
  return sellers.find((s) => s.id === id);
}

export function isValidNationalId(nationalId: string) {
  return /^[A-Z]{2}-\d{7,10}$/.test(nationalId);
}

export function isStrongPassword(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/.test(password);
}

export function isValidProductImageUrl(url: string) {
  return /^https:\/\/.+\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(url) || /images\.unsplash\.com/.test(url);
}

export function validateCaptcha(token: string) {
  return token.trim().length > 10;
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
  return { related: sameCategory.slice(0, 4), alsoViewed: similarPrice.slice(0, 4), forYou: popular };
}

export function calculateCommission(price: number, rate = commissionConfig.default) {
  const safeRate = Math.min(commissionConfig.max, Math.max(commissionConfig.min, rate));
  const commission = Number((price * safeRate).toFixed(2));
  return { commission, sellerNet: Number((price - commission).toFixed(2)), rate: safeRate };
}

export function createEscrow(orderId: string, buyerId: string, sellerId: string, amount: number): EscrowTransaction {
  return { id: `escrow-${orderId}`, orderId, buyerId, sellerId, amount, commissionRate: commissionConfig.default, status: 'payment_secured_escrow' };
}

export function receptionCenterReview(review: ReceptionReview) {
  const approved = review.listingCondition === review.receivedCondition;
  return { ...review, approved, notes: approved ? 'Condition matches listing. Ship to buyer and release escrow.' : 'Condition mismatch. Return to seller and refund buyer.' };
}

export function shippingTrackingStages(status: EscrowStatus) {
  const stages = ['Pending Payment', 'Escrow Confirmed', 'Seller Shipment', 'Reception Center Verification', 'Shipped to Buyer', 'Delivered'];
  const index = ['pending_payment', 'payment_secured_escrow', 'seller_shipping_to_reception', 'verification_in_reception_center', 'shipping_to_buyer', 'delivered'].indexOf(status);
  return stages.map((name, idx) => ({ name, done: idx <= Math.max(index, 0) }));
}

export function detectMessageSpam(text: string) {
  const suspicious = /(http:\/\/|free money|bitcoin now|wa\.me)/i.test(text) || text.length > 400;
  return suspicious;
}

export function loginRateLimitExceeded(failedAttempts: number) {
  return failedAttempts >= 5;
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

export function bannedAccounts() {
  return [
    { id: 'u88', reason: 'Fake payment receipts', permanent: true },
    { id: 's77', reason: 'Repeated false product descriptions', permanent: true }
  ];
}

export function securityChecklist() {
  return ['bcrypt password hashing', 'input validation', 'SQL injection protection', 'XSS protection', 'CSRF protection', 'rate limiting', 'brute-force login protection'];
}


export function calculatePublicationCharge(listings: number) {
  return Number((publicationFeeUSD * Math.max(0, listings)).toFixed(2));
}

export function searchProducts(query: string, filters?: { category?: string; minPrice?: number; maxPrice?: number; minRating?: number }) {
  const q = query.trim().toLowerCase();
  return rankedProducts().filter((p) => {
    const seller = getSellerById(p.sellerId);
    const matchText = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCategory = !filters?.category || p.category === filters.category;
    const matchMin = filters?.minPrice == null || p.price >= filters.minPrice;
    const matchMax = filters?.maxPrice == null || p.price <= filters.maxPrice;
    const matchRating = filters?.minRating == null || (seller?.rating ?? 0) >= filters.minRating;
    return matchText && matchCategory && matchMin && matchMax && matchRating;
  });
}

export function paymentProviders() {
  return ['Stripe', 'PayPal', 'MercadoPago'];
}

export function promotionPlans() {
  return [
    { id: 'promo1', name: 'Featured listing', priceUSD: 4.99 },
    { id: 'promo2', name: 'Promoted search result', priceUSD: 7.99 },
    { id: 'promo3', name: 'Homepage promotion', priceUSD: 12.99 }
  ];
}

export function logisticsQuote(distanceKm: number, weightKg: number) {
  const base = 4.5;
  const cost = base + distanceKm * 0.08 + weightKg * 0.9;
  return {
    cost: Number(cost.toFixed(2)),
    trackingCode: `ZTRK-${Math.floor(distanceKm * 100 + weightKg * 10)}`
  };
}

export function disputes() {
  return [
    { id: 'd1', orderId: 'ord-777', status: 'open', reason: 'Item condition mismatch' },
    { id: 'd2', orderId: 'ord-778', status: 'resolved', reason: 'Late delivery' }
  ];
}

export type BehaviorEvent = {
  userId: string;
  type: 'view' | 'search' | 'add_to_cart' | 'purchase' | 'abandon_cart';
  productId?: string;
  category?: string;
  query?: string;
  ts: string;
};

export const behaviorEvents: BehaviorEvent[] = [
  { userId: 'u1', type: 'view', productId: 'p1', category: 'Tecnología', ts: '2026-03-09T10:00:00Z' },
  { userId: 'u1', type: 'search', query: 'phone', category: 'Tecnología', ts: '2026-03-09T10:02:00Z' },
  { userId: 'u1', type: 'add_to_cart', productId: 'p2', category: 'Tecnología', ts: '2026-03-09T10:05:00Z' },
  { userId: 'u1', type: 'abandon_cart', productId: 'p2', category: 'Tecnología', ts: '2026-03-09T10:20:00Z' }
];

export function personalizedRecommendations(userId: string) {
  const userEvents = behaviorEvents.filter((e) => e.userId === userId);
  const preferredCategories = [...new Set(userEvents.map((e) => e.category).filter(Boolean))] as string[];
  return rankedProducts().filter((p) => preferredCategories.length === 0 || preferredCategories.includes(p.category)).slice(0, 6);
}

export function trendingProducts() {
  return rankedProducts().slice(0, 6);
}

export function recentlyViewedProducts(productIds: string[]) {
  return productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
}

export function autocompleteSuggestions(input: string) {
  const q = input.toLowerCase();
  if (!q) return [];
  return products
    .map((p) => p.title)
    .filter((t) => t.toLowerCase().includes(q))
    .slice(0, 5);
}

export function searchHistoryForUser(userId: string) {
  return behaviorEvents.filter((e) => e.userId === userId && e.type === 'search').map((e) => e.query).filter(Boolean) as string[];
}

export function trendingSearches() {
  return ['iphone', 'notebook gamer', 'silla ergonómica', 'auriculares bluetooth', 'smart tv'];
}

export function intelligentRankingScore(product: Product) {
  const base = calculateRankingScore(product);
  const conversionRate = product.salesVolume / Math.max(product.views, 1);
  const trustBoost = (getSellerById(product.sellerId)?.verified ? 1.1 : 0.9) * product.productRating;
  return base + conversionRate * 10000 + trustBoost * 200;
}

export function aiRankedProducts() {
  return [...products].sort((a, b) => intelligentRankingScore(b) - intelligentRankingScore(a));
}

export function detectFraudAI() {
  return [
    { id: 'af1', risk: 0.92, actor: 'seller:s3', reason: 'Repeated disputes + condition mismatch', action: 'freeze payouts' },
    { id: 'af2', risk: 0.78, actor: 'buyer:u44', reason: 'Suspicious payment retries', action: 'manual verification' },
    { id: 'af3', risk: 0.66, actor: 'review_cluster:r99', reason: 'Fake review language pattern', action: 'review moderation' }
  ];
}

export function analyzeReviewAI(review: string) {
  const spam = /(great great great|buy now|http:\/\/|wa\.me)/i.test(review);
  const abusive = /(idiot|scammer|stupid)/i.test(review);
  return { spam, abusive, flagged: spam || abusive };
}

export function reputationScore(sellerId: string) {
  const seller = getSellerById(sellerId);
  if (!seller) return 0;
  const complaints = fraudFlags().filter((f) => f.entity === `seller:${sellerId}`).length;
  return Math.max(0, seller.rating * 20 + Math.min(seller.sales / 200, 20) - complaints * 8);
}

export function marketplaceInsights() {
  return {
    trendingProducts: trendingProducts().map((p) => p.title),
    fastestGrowingCategories: ['Tecnología', 'Hogar Inteligente', 'Moda Deportiva'],
    buyerDemandPatterns: ['Mobile high intent at night', 'Price-sensitive in weekdays', 'High conversion with verified sellers']
  };
}

export function receptionCenters() {
  return [
    { id: 'rc1', city: 'Buenos Aires', lat: -34.6037, lng: -58.3816 },
    { id: 'rc2', city: 'São Paulo', lat: -23.5505, lng: -46.6333 },
    { id: 'rc3', city: 'Ciudad de México', lat: 19.4326, lng: -99.1332 }
  ];
}

export function nearestReceptionCenter(lat: number, lng: number) {
  const centers = receptionCenters();
  let best = centers[0];
  let bestD = Number.POSITIVE_INFINITY;
  for (const c of centers) {
    const d = Math.hypot(c.lat - lat, c.lng - lng);
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

export function aiShippingOptimizer(distanceKm: number, weightKg: number) {
  const quote = logisticsQuote(distanceKm, weightKg);
  const etaDays = Math.max(1, Math.round(distanceKm / 220 + weightKg / 8));
  return { ...quote, etaDays, routeQuality: distanceKm < 400 ? 'fast-lane' : 'standard' };
}

export function supportBotReply(question: string) {
  const q = question.toLowerCase();
  if (q.includes('refund')) return 'Tu reembolso se procesa automáticamente si Reception Center rechaza el producto.';
  if (q.includes('escrow')) return 'El pago se retiene en escrow hasta verificar condición y entrega.';
  if (q.includes('publish') || q.includes('publicar')) return 'Para publicar debes verificar identidad y pagar la tarifa de listing de $2 USD.';
  return 'Hola, soy Zentro AI Support. Puedo ayudarte con órdenes, pagos, publicación y disputas.';
}
