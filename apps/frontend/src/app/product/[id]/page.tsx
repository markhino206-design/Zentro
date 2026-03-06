import { notFound } from 'next/navigation';
import { ProductGallery } from '../../../components/ProductGallery';
import { SellerCard } from '../../../components/SellerCard';
import { ProductCard } from '../../../components/ProductCard';
import { calculateCommission, getSellerById, products, recommendations } from '../../../lib/marketplace';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  const seller = getSellerById(product.sellerId);
  if (!seller) return notFound();

  const recs = recommendations(product);
  const commission = calculateCommission(product.price);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ProductGallery images={product.images} title={product.title} />
        </div>
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-extrabold">{product.title}</h1>
          <p className="mt-2 text-3xl font-extrabold text-blue-600">${product.price}</p>
          <p className="mt-1 text-sm text-slate-600">Stock: {product.stock > 0 ? 'Disponible' : 'Sin stock'}</p>
          <p className="mt-4 text-slate-700">{product.description}</p>
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
            <p>Comisión marketplace: {(commission.rate * 100).toFixed(0)}%</p>
            <p>Neto vendedor: ${commission.sellerNet}</p>
          </div>
        </div>
        <div className="space-y-3 lg:col-span-3">
          <SellerCard seller={seller} />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <button className="mb-2 w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white">Buy Now</button>
            <button className="w-full rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-white">Add to Cart</button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Related products</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recs.related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
