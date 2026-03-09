import { products } from '../../lib/marketplace';

export default function BuyerDashboardPage() {
  const mockOrders = 4;
  const mockPayments = 4;
  const tracking = '2 in transit · 2 delivered';

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Buyer Dashboard</h1>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">Orders: {mockOrders}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Payments: {mockPayments}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Tracking: {tracking}</div>
      </section>
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Recommended for you</h2>
        <p className="text-slate-600">{products.length} productos disponibles con protección escrow.</p>
      </section>
    </main>
  );
}
