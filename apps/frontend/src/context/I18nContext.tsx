'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import es from '../locales/es/common.json';
import en from '../locales/en/common.json';
import pt from '../locales/pt/common.json';

type Locale = 'es' | 'en' | 'pt';

const dictionaries = { es, en, pt };

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof es) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');

  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale,
    t: (key) => dictionaries[locale][key] ?? key
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
