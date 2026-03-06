import { Seller } from '../lib/marketplace';
import { RatingStars } from './RatingStars';

export function SellerCard({ seller }: { seller: Seller }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-500">Vendedor</p>
      <h3 className="text-lg font-bold text-slate-900">{seller.name}</h3>
      <RatingStars rating={seller.rating} />
      <p className="mt-1 text-sm text-slate-600">{seller.reviews} reseñas</p>
      <p className="text-sm text-slate-600">{seller.sales} ventas</p>
      <p className="text-sm text-slate-600">{seller.location}</p>
    </div>
  );
}
