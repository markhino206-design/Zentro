'use client';

import { useState } from 'react';
import { chatThreads, detectMessageSpam } from '../../lib/marketplace';

export default function ChatPage() {
  const [messages, setMessages] = useState(chatThreads);
  const [text, setText] = useState('');

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Buyer-Seller Chat</h1>
      <p className="text-sm text-slate-600">Mensajería interna con detección básica de spam/abuso.</p>
      <div className="mt-4 space-y-2 rounded-2xl bg-white p-4 shadow-sm">
        {messages.map((m) => (
          <div key={m.id} className="rounded border border-slate-200 p-2 text-sm">
            <b>{m.from}</b>: {m.text} {m.flaggedSpam ? <span className="text-rose-600">(flagged spam)</span> : null}
          </div>
        ))}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const flaggedSpam = detectMessageSpam(text);
          setMessages((prev) => [...prev, { id: `m-${Date.now()}`, from: 'buyer', text, timestamp: new Date().toISOString(), flaggedSpam }]);
          setText('');
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded border p-2" placeholder="Escribe al vendedor..." />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Send</button>
      </form>
    </main>
  );
}
