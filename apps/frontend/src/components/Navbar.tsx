'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          Zentro
        </Link>
        <input
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none ring-blue-500 focus:ring"
          placeholder="Buscar en Zentro"
        />
        <nav className="hidden gap-4 text-sm text-slate-700 md:flex">
          <Link href="/buyer">Comprador</Link>
          <Link href="/dashboard">Vendedor</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/terms">Términos</Link>
        </nav>
        <Link href="/cart" className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
          Cart ({count})
        </Link>
      </div>
    </header>
  );
}
