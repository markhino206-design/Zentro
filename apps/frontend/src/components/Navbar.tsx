'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useI18n } from '../context/I18nContext';
import { LanguageSelector } from './LanguageSelector';

export function Navbar() {
  const { count } = useCart();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          {t('brand')}
        </Link>
        <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none ring-blue-500 focus:ring" placeholder={t('searchPlaceholder')} />
        <nav className="hidden gap-4 text-sm text-slate-700 md:flex">
          <Link href="/buyer">{t('buyer')}</Link>
          <Link href="/dashboard">{t('seller')}</Link>
          <Link href="/chat">{t('chat')}</Link>
          <Link href="/search">Search</Link>
          <Link href="/disputes">Disputes</Link>
          <Link href="/admin">{t('admin')}</Link>
          <Link href="/terms">{t('terms')}</Link>
        </nav>
        <LanguageSelector />
        <Link href="/cart" className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
          {t('cart')} ({count})
        </Link>
      </div>
      <div className="mx-auto flex max-w-7xl gap-2 px-4 pb-3 text-[11px] text-slate-600">
        <span className="rounded-full bg-slate-100 px-2 py-1">🔒 {t('securePayments')}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1">✅ {t('verifiedSeller')}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1">🛡️ {t('buyerProtection')}</span>
      </div>
    </header>
  );
}
