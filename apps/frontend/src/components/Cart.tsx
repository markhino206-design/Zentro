'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export function CartSummary() {
  const { total, count } = useCart();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-bold">Resumen</h3>
      <p className="text-sm text-slate-600">Items: {count}</p>
      <p className="text-xl font-bold text-blue-600">Total: ${total.toFixed(2)}</p>
      <Link href="/checkout" className="mt-3 inline-block rounded-xl bg-slate-900 px-4 py-2 text-white">
        Ir a checkout
      </Link>
    </div>
  );
}
