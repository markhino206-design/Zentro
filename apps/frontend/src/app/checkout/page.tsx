'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const { total, count, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Checkout</h1>
      <p className="text-slate-600">Paso {step} de 4</p>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {step === 1 && <p>Cart ({count} items) - total ${total.toFixed(2)}</p>}
        {step === 2 && <p>Shipping address (mocked)</p>}
        {step === 3 && <p>Payment method (mocked, listo para Stripe/PayPal/MercadoPago)</p>}
        {step === 4 && !confirmed && <p>Confirm order</p>}
        {confirmed && <p className="font-semibold text-emerald-600">Order confirmed ✅</p>}

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
                clearCart();
              }}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-white"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
