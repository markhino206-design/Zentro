export default function TermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-3xl font-extrabold">Términos y Condiciones de Zentro</h1>
      <div className="mt-4 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <p><b>Escrow payment protection:</b> El pago del comprador se mantiene en custodia (escrow) por Zentro hasta completar verificación y entrega.</p>
        <p><b>Reception Center verification:</b> El vendedor envía primero al centro de recepción Zentro para verificar condición y coincidencia con publicación.</p>
        <p><b>Refund policy:</b> Si la condición no coincide con la publicación, el producto se devuelve al vendedor y el comprador recibe reembolso completo.</p>
        <p><b>Escrow failure clause:</b> Si el pago no ingresa al escrow, la transacción se cancela automáticamente.</p>
        <p><b>Marketplace commission:</b> Zentro retiene una comisión fija del 8% por venta completada.</p>
        <p><b>Publication fee:</b> Cada publicación de producto tiene un cargo de $2 USD.</p>
        <p><b>Fraud prevention:</b> Actividades como pagos falsos, publicaciones engañosas, abuso de mensajería o intentos de estafa activan alertas de riesgo.</p>
        <p><b>User bans:</b> Usuarios fraudulentos pueden ser suspendidos o baneados permanentemente por Zentro.</p>
      </div>
    </main>
  );
}
