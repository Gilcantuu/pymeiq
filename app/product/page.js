export const metadata = {
  title: "Product — PymeIQ",
  description: "PymeIQ product architecture: three modules that turn a Mexican SMB into a data-backed decision in under ten minutes.",
};

const MODULES = [
  {
    n: 1,
    name: "Diagnose",
    color: "blue",
    href: "/core",
    description:
      "SWOT generator. Owner enters business name, industry, and size; the page returns four quadrants and saves them to Supabase.",
    tiers: { Free: true, Pro: true, Business: true },
    status: "Live since Week 1",
    bullets: [
      "Inputs: name, industry, size",
      "Output: 4 SWOT quadrants",
      "Persistence: swot_outputs table",
    ],
  },
  {
    n: 2,
    name: "Research",
    color: "green",
    href: "/research",
    description:
      "Benchmarks dashboard. Three competitors, three KPIs, an overall score from 0 to 100, saved per session.",
    tiers: { Free: false, Pro: true, Business: true },
    status: "Live since Week 2",
    bullets: [
      "Competitor compare grid",
      "Score: 0 to 100",
      "Persistence: research_outputs table",
    ],
  },
  {
    n: 3,
    name: "Pricing + Roadmap",
    color: "amber",
    href: "/pricing",
    description:
      "Revenue simulator. Three tiers, two customer segments, a calculator that returns MRR and ARR, and append-only saved scenarios.",
    tiers: { Free: false, Pro: true, Business: true },
    status: "Live since Week 3",
    bullets: [
      "3 tiers, 2 segments",
      "MRR and ARR live",
      "Persistence: pricing_scenarios table",
    ],
  },
];

const COLOR = {
  blue: { card: "bg-blue-50 border-blue-200", title: "text-blue-900", badge: "bg-blue-100 text-blue-900" },
  green: { card: "bg-green-50 border-green-200", title: "text-green-900", badge: "bg-green-100 text-green-900" },
  amber: { card: "bg-amber-50 border-amber-200", title: "text-amber-900", badge: "bg-amber-100 text-amber-900" },
};

function TierBadge({ label, active, color }) {
  const tone = active ? COLOR[color].badge : "bg-gray-100 text-gray-400";
  return (
    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${tone}`}>
      {active ? label : "—"}
    </span>
  );
}

export default function ProductPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-gray-500">Product</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">PymeIQ product architecture</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Three modules that turn a Mexican small business owner into a data-backed decision in under ten minutes.
          Each module is a standalone page; together they form the diagnostic-to-pricing loop.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {MODULES.map((m) => (
          <article key={m.n} className={`flex flex-col rounded-lg border p-6 ${COLOR[m.color].card}`}>
            <div className="flex items-baseline gap-3">
              <span className={`text-xs font-semibold ${COLOR[m.color].title}`}>Module {m.n}</span>
            </div>
            <h2 className={`mt-1 text-xl font-bold ${COLOR[m.color].title}`}>{m.name}</h2>
            <p className="mt-3 text-sm text-gray-700">{m.description}</p>

            <ul className="mt-4 space-y-1 text-sm text-gray-700">
              {m.bullets.map((b) => (
                <li key={b}>· {b}</li>
              ))}
            </ul>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tier coverage</p>
              <div className="mt-2 flex gap-2">
                <TierBadge label="Free" active={m.tiers.Free} color={m.color} />
                <TierBadge label="Pro" active={m.tiers.Pro} color={m.color} />
                <TierBadge label="Business" active={m.tiers.Business} color={m.color} />
              </div>
            </div>

            <div className="mt-auto pt-6">
              <p className="text-xs text-gray-500">{m.status}</p>
              <a
                href={m.href}
                className="mt-2 inline-flex text-sm font-medium text-gray-900 underline"
              >
                Open {m.href}
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">How the modules connect</h2>
        <p className="mt-2 text-sm text-gray-700">
          A new owner usually starts in Diagnose, then jumps to Research to compare against three competitors, then
          uses Pricing to size what each tier and segment could mean in MRR and ARR. Each step writes to Supabase, so
          an advisor can review the chain after a single share link.
        </p>
      </section>
    </main>
  );
}
