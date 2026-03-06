import './globals.css';
import type { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
