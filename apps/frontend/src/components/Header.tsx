export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-yellow-400 shadow">
      <div className="mx-auto flex max-w-7xl items-center gap-4 p-4">
        <div className="text-xl font-bold">Zentro</div>
        <input
          className="w-full rounded-md border border-yellow-500 px-3 py-2"
          placeholder="Buscar productos, marcas y más..."
        />
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white">Buscar</button>
      </div>
    </header>
  );
}
