'use client';

import { useMemo } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { createEscrow, personalizedRecommendations, recentlyViewedProducts, shippingTrackingStages, trendingProducts } from '../../lib/marketplace';

export default function BuyerDashboardPage() {
  const mockOrders = 4;
  const mockPayments = 4;
  const escrow = createEscrow('ord-3001', 'u1', 's1', 899);
  const tracking = shippingTrackingStages(escrow.status);

  const recommended = personalizedRecommendations('u1');
  const popular = trendingProducts();
  const recent = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const ids = JSON.parse(localStorage.getItem('zentro_recently_viewed') ?? '[]') as string[];
    return recentlyViewedProducts(ids);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Buyer Dashboard</h1>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">Orders: {mockOrders}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Payments: {mockPayments}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Escrow: {escrow.id}</div>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Shipment tracking</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {tracking.map((stage) => (
            <li key={stage.name}>{stage.done ? '✅' : '⏳'} {stage.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Recommended for you</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Popular products</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {popular.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Recently viewed</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recent.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
}
