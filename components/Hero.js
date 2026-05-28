export default function Hero() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Negocios Inteligentes
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Diagnóstico inteligente para tu PYME{" "}
          <span className="text-brand-600">en 10 minutos.</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Responde 12 preguntas. Recibe un plan de acción concreto comparado
          contra benchmarks de tu industria. Sin consultores caros, sin reportes
          de 80 páginas, sin tarjetas de crédito.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#cta"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Solicitar acceso anticipado
          </a>
          <a
            href="#how"
            className="inline-flex items-center justify-center rounded-xl border-2 border-brand-600 px-6 py-3 text-base font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            Ver cómo funciona
          </a>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Sin tarjeta de crédito • 100% en español • Datos privados
        </p>
      </div>
    </section>
  );
}
