// MexicoStats - 3 KPI cards localized to the Mexican SMB market.
// Server component.
import { MEXICO_STATS } from "../../lib/researchData";

export default function MexicoStats() {
  return (
    <section className="rounded-2xl border border-brand-200 bg-brand-50 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Mexico Localization</h2>
      <p className="mt-1 text-sm text-slate-600">
        Why Mexico is structurally different. Each statistic links to its primary source.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {MEXICO_STATS.map((s) => (
          <article
            key={s.label}
            className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"
          >
            <p className="text-3xl font-bold text-brand-600">{s.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{s.label}</p>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.note}</p>
            <a
              href={s.citationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-brand-600 hover:underline"
            >
              {s.citation} ↗
            </a>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-600 italic leading-relaxed">
        Note: the Mexican SMB market has three structural features that differ from the US/EU:
        (1) ~40% informality, (2) institutional distrust of cloud-stored data due to SAT (tax authority) concerns,
        and (3) strong preference for local brands (Aspel/Contpaqi dominate vs. foreign SaaS). PymeIQ leans
        explicitly Mexican in its branding and includes a 'no SAT sharing' privacy statement.
      </p>
    </section>
  );
}
