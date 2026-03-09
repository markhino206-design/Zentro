'use client';

import { useState } from 'react';
import { createEscrow } from '../../lib/marketplace';
import { useCart } from '../../context/CartContext';

const shippingStages = [
  'Pending payment',
  'Payment secured in escrow',
  'Seller shipment to reception center',
  'Verification in reception center',
  'Shipment to buyer',
  'Delivered'
];

export default function CheckoutPage() {
  const { total, count, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const escrow = createEscrow('ord-2001', 'u1', 's1', total || 0);

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Checkout seguro</h1>
      <p className="text-slate-600">Paso {step} de 4</p>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {step === 1 && <p>1) Cart review ({count} items) - total ${total.toFixed(2)}</p>}
        {step === 2 && <p>2) Shipping address confirmation (secure)</p>}
        {step === 3 && <p>3) Payment method (mocked, escrow-enabled)</p>}
        {step === 4 && !confirmed && <p>4) Order confirmation</p>}
        {confirmed && (
          <div>
            <p className="font-semibold text-emerald-600">Order confirmed ✅</p>
            <p className="text-sm text-slate-600">Escrow transaction: {escrow.id} ({escrow.status})</p>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {step > 1 && (
            <button onClick={() => setStep((s) => s - 1)} className="rounded-xl border border-slate-300 px-4 py-2">
              Back
            </button>
          )}
          {step < 4 && (
            <button onClick={() => setStep((s) => s + 1)} className="rounded-xl bg-blue-600 px-4 py-2 text-white">
              Next
            </button>
          )}
          {step === 4 && (
            <button
              onClick={() => {
                setConfirmed(true);
                localStorage.setItem('zentro_last_order', JSON.stringify({ total, at: Date.now(), escrowId: escrow.id }));
                clearCart();
              }}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-white"
            >
              Confirm
            </button>
          )}
        </div>
      </div>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold">Shipping workflow</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {shippingStages.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
