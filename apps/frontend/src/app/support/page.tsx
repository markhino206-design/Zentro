'use client';

import { useState } from 'react';
import { supportBotReply } from '../../lib/marketplace';

export default function SupportPage() {
  const [q, setQ] = useState('');
  const [a, setA] = useState('Hola, soy Zentro AI Support.');

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">AI Customer Support</h1>
      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-600">Ask about orders, escrow, refunds, listings or disputes.</p>
        <input value={q} onChange={(e) => setQ(e.target.value)} className="mt-3 w-full rounded border p-2" placeholder="Type your question..." />
        <button onClick={() => setA(supportBotReply(q))} className="mt-3 rounded bg-blue-600 px-4 py-2 text-white">Ask AI</button>
        <p className="mt-3 rounded bg-slate-50 p-3 text-sm">{a}</p>
      </div>
    </main>
  );
}
