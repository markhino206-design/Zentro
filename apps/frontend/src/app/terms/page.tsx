export default function TermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-3xl font-extrabold">Términos y Condiciones de Zentro</h1>
      <div className="mt-4 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <p><b>Escrow payment protection:</b> El pago del comprador se mantiene en custodia (escrow) por Zentro hasta completar verificación y entrega.</p>
        <p><b>Reception Center verification:</b> El vendedor envía primero al centro de recepción Zentro para verificar condición y coincidencia con publicación.</p>
        <p><b>Refund policy:</b> Si la condición no coincide, se devuelve al vendedor y se reembolsa al comprador.</p>
        <p><b>Fraud prevention policy:</b> Si el pago no entra al escrow, la transacción se cancela automáticamente.</p>
        <p><b>Banned user policy:</b> Usuarios que intenten fraude, pagos falsos o publicaciones engañosas pueden ser baneados permanentemente.</p>
      </div>
    </main>
  );
}
