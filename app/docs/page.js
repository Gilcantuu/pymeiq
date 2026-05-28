export const metadata = {
  title: "Docs — PymeIQ",
  description: "Documentación del producto PymeIQ.",
};

export default function DocsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        Documentación
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Próximamente: documentación del producto, guía de uso, referencia de API
        y casos de éxito. Esta página se irá llenando conforme avancemos en las
        semanas del curso.
      </p>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Estado actual (Week 0)
        </h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li>Infraestructura base desplegada en Vercel</li>
          <li>Repositorio GitHub conectado</li>
          <li>Proyecto Supabase creado (sin tablas aún)</li>
          <li>Stack: Next.js 14 + Tailwind CSS 3</li>
        </ul>
      </div>

      <a
        href="/"
        className="mt-10 inline-block text-brand-600 hover:text-brand-700 font-medium"
      >
        ← Regresar al inicio
      </a>
    </section>
  );
}
