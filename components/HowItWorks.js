const steps = [
  {
    n: 1,
    title: "Conecta tus datos",
    text: "Responde 12 preguntas clave sobre ventas, costos, equipo y mercado de tu negocio.",
  },
  {
    n: 2,
    title: "AI analiza",
    text: "Nuestro modelo compara tu situación con benchmarks reales de tu industria en LATAM.",
  },
  {
    n: 3,
    title: "Recibe plan accionable",
    text: "5 acciones priorizadas con impacto esperado, plazo sugerido y métricas para medir.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
          ¿Cómo funciona?
        </h2>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
          Tres pasos. Diez minutos. Resultado accionable.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-600">
                {s.n}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
