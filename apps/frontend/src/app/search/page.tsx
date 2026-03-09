'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { searchProducts } from '../../lib/marketplace';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');

  const results = useMemo(
    () =>
      searchProducts(query, {
        category: category || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minRating: minRating ? Number(minRating) : undefined
      }),
    [query, category, minPrice, maxPrice, minRating]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Advanced Search</h1>
      <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-5">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search text" className="rounded border p-2" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="rounded border p-2" />
        <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" className="rounded border p-2" />
        <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" className="rounded border p-2" />
        <input value={minRating} onChange={(e) => setMinRating(e.target.value)} placeholder="Min seller rating" className="rounded border p-2" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
