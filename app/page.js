// Week 4 — Homepage upgraded to a credible product landing page.
// Server component (no client interactivity needed).

import { LANDING_COPY } from "../lib/marketingData";

export const metadata = {
  title: "PymeIQ — Run the diagnosis your SMB is missing",
  description:
    "A ten-minute, AI-native check on your business — strategy, competition, and pricing in one place. Built for Mexican SMBs.",
};

const PRODUCT_CARDS = [
  {
    name: "Diagnose",
    href: "/core",
    blurb: "SWOT in ten minutes, saved to your account.",
    color: "blue",
  },
  {
    name: "Research",
    href: "/research",
    blurb: "Benchmark against three competitors and get a 0-100 score.",
    color: "green",
  },
  {
    name: "Pricing",
    href: "/pricing",
    blurb: "Model MRR and ARR by tier and segment before you publish a price.",
    color: "amber",
  },
];

const CARD_TONE = {
  blue: { card: "bg-blue-50 border-blue-200", title: "text-blue-900" },
  green: { card: "bg-green-50 border-green-200", title: "text-green-900" },
  amber: { card: "bg-amber-50 border-amber-200", title: "text-amber-900" },
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {LANDING_COPY.hero}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">{LANDING_COPY.subhero}</p>
        <div className="mt-8 flex justify-center">
          <a
            href={LANDING_COPY.ctaHref}
            className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
          >
            {LANDING_COPY.cta}
          </a>
        </div>
      </section>

      {/* Three product cards */}
      <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRODUCT_CARDS.map((c) => (
          <article key={c.name} className={`rounded-lg border p-6 ${CARD_TONE[c.color].card}`}>
            <h2 className={`text-xl font-bold ${CARD_TONE[c.color].title}`}>{c.name}</h2>
            <p className="mt-3 text-sm text-gray-700">{c.blurb}</p>
            <a href={c.href} className="mt-4 inline-flex text-sm font-medium text-gray-900 underline">
              Open {c.href}
            </a>
          </article>
        ))}
      </section>

      {/* Why bullets */}
      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-gray-900">What you get this week</h2>
        <ul className="mt-6 space-y-3 text-base text-gray-700">
          {LANDING_COPY.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="font-bold text-blue-600">·</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing */}
      <section className="mt-16 text-center">
        <p className="text-sm text-gray-500">{LANDING_COPY.closing}</p>
      </section>
    </main>
  );
}
