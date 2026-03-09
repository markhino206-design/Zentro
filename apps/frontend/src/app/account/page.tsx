'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../lib/marketplace';

export default function AccountPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-extrabold">My Account</h1>
        <p className="mt-2">You need to login first.</p>
        <Link href="/login" className="mt-3 inline-block rounded bg-blue-600 px-4 py-2 text-white">Go to login</Link>
      </main>
    );
  }

  const listings = products.length;
  const sales = Math.floor(products.reduce((a, p) => a + p.salesVolume, 0) * 0.3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">My Account</h1>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-bold">Account Overview</h2>
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <p>Membership: {user.membership}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-bold">Order History</h2>
          <p>Order date: 2026-03-08</p>
          <p>Product: Zentro Phone X1</p>
          <p>Status: Payment secured</p>
          <p>Tracking: ZTRK-12015</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-bold">My Sales & Listings</h2>
          <p>My Listings: {listings}</p>
          <p>My Sales: {sales}</p>
          <p>Listing fee per product: $2 USD</p>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-bold">Account Settings</h2>
          <p className="text-sm text-slate-600">Email verification: {user.emailVerified ? 'verified' : 'pending'}</p>
          <p className="text-sm text-slate-600">Roles: {user.roles.join(', ')}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="font-bold">Membership Plan</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>Free Plan</li>
            <li>Pro Seller (lower commission)</li>
            <li>Premium Seller (higher visibility + promotions)</li>
          </ul>
        </div>
      </section>

      <button onClick={logout} className="mt-6 rounded bg-slate-900 px-4 py-2 text-white">Logout</button>
    </main>
  );
}
