import { nearestReceptionCenter, receptionCenters } from '../../lib/marketplace';

export default function ReceptionMapPage() {
  const centers = receptionCenters();
  const nearest = nearestReceptionCenter(-34.61, -58.42);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-extrabold">Reception Center Map</h1>
      <p className="text-sm text-slate-600">Interactive map placeholder ready for geolocation API integration.</p>
      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <p className="font-semibold">Nearest center: {nearest.city}</p>
        <ul className="mt-2 text-sm">
          {centers.map((c) => (
            <li key={c.id}>• {c.city} ({c.lat}, {c.lng})</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
