import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl p-4">
        <nav className="mb-4 flex gap-2 overflow-auto text-sm">
          {['Tecnología', 'Hogar', 'Moda', 'Supermercado', 'Vehículos', 'Ofertas'].map((cat) => (
            <span key={cat} className="rounded-full bg-white px-3 py-1 shadow">
              {cat}
            </span>
          ))}
        </nav>
      </section>
      <ProductGrid />
    </main>
  );
}
