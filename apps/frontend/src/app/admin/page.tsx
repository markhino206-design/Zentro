import { enforceFraudRules, fraudFlags, products, sellers, users, createEscrow, receptionCenterReview } from '../../lib/marketplace';

export default function AdminPage() {
  const totalSales = products.reduce((a, p) => a + p.salesVolume * p.price, 0);
  const escrow = createEscrow('ord-1001', 'u1', 's1', 899);
  const reception = receptionCenterReview({
    orderId: 'ord-1001',
    productId: 'p1',
    listingCondition: 'new',
    receivedCondition: 'new',
    approved: true,
    notes: ''
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Admin Panel</h1>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">Total sales: ${totalSales.toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Users: {users.length}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Escrow tx: {escrow.id}</div>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Admin controls</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          <li>Approve sellers</li>
          <li>Ban users (fake payments, fake listings, repeated complaints)</li>
          <li>Resolve disputes and escrow releases/refunds</li>
          <li>Manage ads and remove products</li>
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4">
        <h2 className="font-bold text-rose-700">Fraud protection alerts</h2>
        <ul className="mt-2 space-y-2">
          {fraudFlags().map((flag) => (
            <li key={flag.id} className="rounded bg-white p-3 text-sm">
              <b>{flag.type}</b> ({flag.severity}) - {flag.entity}: {flag.note}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Automated anti-fraud rules</h2>
        <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {enforceFraudRules().map((rule) => (
            <li key={rule.rule} className="rounded bg-slate-50 p-2 text-sm">
              {rule.rule} → <b>{rule.action}</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Reception Center status</h2>
        <p className="text-sm text-slate-700">Order {reception.orderId}: {reception.notes}</p>
        <p className="text-sm text-slate-700">Verified sellers: {sellers.filter((s) => s.verified).length}/{sellers.length}</p>
      </section>
    </main>
  );
}
