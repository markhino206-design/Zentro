'use client';

import { useI18n } from '../context/I18nContext';

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value as 'es' | 'en' | 'pt')} className="rounded-lg border border-slate-300 px-2 py-1 text-xs">
      <option value="es">ES</option>
      <option value="en">EN</option>
      <option value="pt">PT</option>
    </select>
  );
}
