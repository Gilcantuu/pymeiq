const steps = [
  {
    n: 1,
    title: "Connect your data",
    text: "Answer 5 key questions about your business: name, industry, revenue, team, top challenge.",
  },
  {
    n: 2,
    title: "AI analyzes",
    text: "Our model compares your situation with templates inspired by SMB benchmarks across LATAM.",
  },
  {
    n: 3,
    title: "Get an actionable plan",
    text: "3 prioritized actions with expected impact, suggested timeframe, and clear next steps.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
          How it works
        </h2>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
          Three steps. Ten minutes. An actionable result.
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
