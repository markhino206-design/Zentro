export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-slate-600 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Zentro. Marketplace startup-grade.</p>
        <p>Privacidad · Términos · Soporte</p>
      </div>
    </footer>
  );
}
