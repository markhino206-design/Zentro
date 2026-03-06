import { products } from '../../lib/marketplace';

export default function SellerDashboardPage() {
  const revenue = products.reduce((a, p) => a + p.salesVolume * p.price, 0);
  const sold = products.reduce((a, p) => a + p.salesVolume, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Seller Dashboard</h1>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">Revenue: ${revenue.toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Products sold: {sold.toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Orders received: {(sold * 0.92).toLocaleString()}</div>
      </section>
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Product management</h2>
        <p className="text-slate-600">Add, edit, delete products and manage seller orders (UI scaffold).</p>
      </section>
    </main>
  );
}
