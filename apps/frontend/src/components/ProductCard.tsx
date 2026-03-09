'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product, getSellerById } from '../lib/marketplace';
import { RatingStars } from './RatingStars';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const seller = getSellerById(product.sellerId);
  const { addToCart } = useCart();

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/product/${product.id}`}>
        <div className="relative mb-3 h-44 overflow-hidden rounded-xl bg-slate-100">
          <Image src={product.images[0]} alt={product.title} fill className="object-cover transition group-hover:scale-105" />
        </div>
        <h3 className="line-clamp-1 text-base font-bold text-slate-900">{product.title}</h3>
      </Link>
      <p className="mt-1 text-2xl font-extrabold text-blue-600">${product.price}</p>
      <p className="line-clamp-1 text-sm text-slate-600">{product.shortDescription}</p>
      <div className="mt-2 flex items-center justify-between">
        <RatingStars rating={seller?.rating ?? 0} />
        <button onClick={() => addToCart(product)} className="rounded-lg bg-emerald-500 px-3 py-1 text-sm text-white hover:bg-emerald-600">
          Add
        </button>
      </div>
    </article>
  );
}
