import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Business Intelligence for SMBs
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Smart diagnostic for your business{" "}
          <span className="text-brand-600">in 10 minutes.</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Answer 5 short questions. Get a structured SWOT diagnostic with 3
          prioritized actions. No expensive consultants, no 80-page reports,
          no credit card required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/core"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Try the diagnostic
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center justify-center rounded-xl border-2 border-brand-600 px-6 py-3 text-base font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            See how it works
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          No credit card • Built for SMB owners • Private by default
        </p>
      </div>
    </section>
  );
}
