const products = [
  { id: 1, title: 'iPhone 15 Pro', price: '$1,199', seller: 'StoreTech', rating: 4.8 },
  { id: 2, title: 'Notebook Gamer RTX', price: '$1,899', seller: 'GigaShop', rating: 4.6 },
  { id: 3, title: 'Auriculares Bluetooth', price: '$149', seller: 'AudioLab', rating: 4.4 },
  { id: 4, title: 'Smart TV 55" 4K', price: '$799', seller: 'VisionHome', rating: 4.7 }
];

export function ProductGrid() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <article key={product.id} className="rounded-lg bg-white p-4 shadow">
          <div className="mb-3 h-40 rounded bg-gray-100" />
          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-xl text-green-700">{product.price}</p>
          <p className="text-sm text-gray-500">Vendedor: {product.seller}</p>
          <p className="text-sm text-amber-600">⭐ {product.rating}</p>
        </article>
      ))}
    </section>
  );
}
