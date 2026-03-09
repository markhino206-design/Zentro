'use client';

import { useState } from 'react';
import { calculatePublicationCharge, canSellerPublish, isValidProductImageUrl, loginRateLimitExceeded, products, promotionPlans } from '../../lib/marketplace';

export default function SellerDashboardPage() {
  const revenue = products.reduce((a, p) => a + p.salesVolume * p.price, 0);
  const sold = products.reduce((a, p) => a + p.salesVolume, 0);
  const verifiedPublish = canSellerPublish('s1');
  const [imageUrl, setImageUrl] = useState('');
  const listingFee = calculatePublicationCharge(1);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Seller Dashboard</h1>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">Revenue: ${revenue.toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Products sold: {sold.toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Orders received: {(sold * 0.92).toLocaleString()}</div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">Conversion rate: 3.9%</div>
      </section>
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Seller verification gate</h2>
        <p className="text-slate-600">Can publish products: {verifiedPublish ? 'Yes (verified)' : 'No (verification required)'}</p>
        <p className="text-slate-600">Publication fee per listing: ${listingFee.toFixed(2)} USD</p>
      </section>
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Product listing validation</h2>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://...image.jpg" className="mt-2 w-full rounded border p-2" />
        {imageUrl ? <p className="mt-2 text-sm">Image valid: {isValidProductImageUrl(imageUrl) ? 'Yes' : 'No'}</p> : null}
      </section>
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Promotion system</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {promotionPlans().map((plan) => (
            <li key={plan.id}>{plan.name} - ${plan.priceUSD}</li>
          ))}
        </ul>
      </section>
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold">Security controls</h2>
        <p className="text-slate-600">Brute-force login protection active: {loginRateLimitExceeded(5) ? 'Rate-limited' : 'Open'}</p>
      </section>
    </main>
  );
}
