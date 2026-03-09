export function SidebarAds() {
  const ads = [
    { title: 'Deal Flash', text: 'Hasta 35% OFF en tecnología.' },
    { title: 'Sponsor Pro', text: 'Publica tu tienda destacada.' },
    { title: 'Envío Full', text: 'Envío gratis en compras +$99.' }
  ];

  return (
    <aside className="space-y-4">
      {ads.map((ad) => (
        <div key={ad.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Patrocinado</p>
          <h4 className="mt-1 font-bold text-slate-900">{ad.title}</h4>
          <p className="text-sm text-slate-600">{ad.text}</p>
        </div>
      ))}
    </aside>
  );
}
