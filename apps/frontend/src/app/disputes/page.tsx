import { disputes } from '../../lib/marketplace';

export default function DisputesPage() {
  const cases = disputes();

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Dispute Resolution Center</h1>
      <div className="mt-4 space-y-3">
        {cases.map((c) => (
          <article key={c.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-semibold">Case {c.id} · {c.orderId}</p>
            <p className="text-sm text-slate-600">Status: {c.status}</p>
            <p className="text-sm text-slate-600">Reason: {c.reason}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
