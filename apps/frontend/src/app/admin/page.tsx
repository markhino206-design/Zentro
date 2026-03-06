import { fraudFlags, products, sellers } from '../../lib/marketplace';

export default function AdminPage() {
  const totalSales = products.reduce((a, p) => a + p.salesVolume * p.price, 0);
  const activeUsers = 120450;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Admin Panel</h1>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">Total sales: ${totalSales.toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Active users: {activeUsers.toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Popular products: {products.length}</div>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Management</h2>
        <p className="text-slate-600">Users: {activeUsers} · Sellers: {sellers.length} · Products: {products.length}</p>
      </section>

      <section className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4">
        <h2 className="font-bold text-rose-700">Fraud protection flags</h2>
        <ul className="mt-2 space-y-2">
          {fraudFlags().map((flag) => (
            <li key={flag.id} className="rounded bg-white p-3 text-sm">
              <b>{flag.type}</b> ({flag.severity}) - {flag.entity}: {flag.note}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
