// GlobalExamples - renders 5 international SMB diagnostic products.
// Server component: pure data, no client interactivity needed.
import { GLOBAL_EXAMPLES } from "../../lib/researchData";

export default function GlobalExamples() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">5 Global Examples</h2>
      <p className="mt-1 text-sm text-slate-500">
        International products that solve adjacent problems for SMB owners. Validates the problem is real globally.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {GLOBAL_EXAMPLES.map((ex) => (
          <article
            key={ex.name}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <h3 className="text-sm font-bold text-slate-900">{ex.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{ex.flag} {ex.country}</p>
            <p className="mt-3 flex-1 text-xs text-slate-700 leading-relaxed">{ex.description}</p>
            <p className="mt-3 text-xs font-semibold text-brand-600">{ex.pricingModel}</p>
            <a
              href={ex.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-brand-600 hover:underline"
            >
              Source ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
