import { createEscrow, products, shippingTrackingStages } from '../../lib/marketplace';

export default function BuyerDashboardPage() {
  const mockOrders = 4;
  const mockPayments = 4;
  const escrow = createEscrow('ord-3001', 'u1', 's1', 899);
  const tracking = shippingTrackingStages(escrow.status);

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
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Recommended for you</h2>
        <p className="text-slate-600">{products.length} productos disponibles con protección escrow.</p>
      </section>
    </main>
  );
}
