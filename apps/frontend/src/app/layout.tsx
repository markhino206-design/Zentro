import './globals.css';
import type { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import { I18nProvider } from '../context/I18nContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900">
        <I18nProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
