const weeks = [
  { n: 0, title: "Setup",                status: "En curso" },
  { n: 1, title: "Generative Core",      status: "Próxima" },
  { n: 2, title: "Research + Benchmarks",status: "Próxima" },
  { n: 3, title: "Pricing",              status: "Próxima" },
  { n: 4, title: "Marketing",            status: "Próxima" },
  { n: 5, title: "Chatbot",              status: "Próxima" },
  { n: 6, title: "Launch",               status: "Próxima" },
];

function badgeStyle(status) {
  if (status === "En curso") return "bg-emerald-100 text-emerald-700";
  if (status === "Completada") return "bg-slate-200 text-slate-700";
  return "bg-slate-100 text-slate-500";
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
          Roadmap del producto
        </h2>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
          Construimos PymeIQ en 6 semanas, una capa a la vez. Cada semana entrega
          un módulo funcional desplegado.
        </p>

        <ol className="mt-16 grid gap-4 md:grid-cols-7">
          {weeks.map((w) => (
            <li
              key={w.n}
              className="rounded-xl bg-white border border-slate-200 p-4 text-center shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                Week {w.n}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                {w.title}
              </p>
              <span
                className={`mt-3 inline-block text-[10px] px-2 py-1 rounded-full font-semibold ${badgeStyle(
                  w.status
                )}`}
              >
                {w.status}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
