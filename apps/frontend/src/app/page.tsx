import Link from 'next/link';
import { ProductCard } from '../components/ProductCard';
import { SidebarAds } from '../components/SidebarAds';
import { rankedProducts } from '../lib/marketplace';

const categories = ['Tecnología', 'Hogar', 'Moda', 'Deportes', 'Gaming', 'Ofertas'];

export default function HomePage() {
  const products = rankedProducts();
  const featured = products[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-sm">
        <p className="text-sm uppercase tracking-wider text-blue-100">Secure marketplace</p>
        <h1 className="text-3xl font-extrabold">{featured.title}</h1>
        <p className="max-w-2xl text-blue-100">Compra y vende con escrow, recepción verificada y protección anti-fraude.</p>
        <div className="mt-3 flex gap-2">
          <Link href="/register" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600">Crear cuenta verificada</Link>
          <Link href="/search" className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-white">Buscar productos</Link>
          <Link href="/terms" className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-white">Ver términos</Link>
        </div>
      </section>

      <section className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <span key={cat} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
            {cat}
          </span>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <SidebarAds />
        </div>
      </section>
    </main>
  );
}
