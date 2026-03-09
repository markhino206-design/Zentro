'use client';

import Image from 'next/image';
import { CartSummary } from '../../components/Cart';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();

  return (
    <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
      <section className="lg:col-span-8 space-y-3">
        <h1 className="text-2xl font-extrabold">Shopping cart</h1>
        {items.length === 0 ? <p className="text-slate-600">Tu carrito está vacío.</p> : null}
        {items.map((item) => (
          <article key={item.product.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-slate-100">
              <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{item.product.title}</h3>
              <p className="text-sm text-slate-600">${item.product.price}</p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                  className="w-20 rounded border border-slate-300 px-2 py-1"
                />
                <button onClick={() => removeFromCart(item.product.id)} className="text-sm text-rose-600">
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="lg:col-span-4">
        <CartSummary />
      </section>
    </main>
  );
}
