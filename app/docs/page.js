// Layout root with optimized SEO metadata
import Link from "next/link";

export const metadata = {
  title: "Docs — PymeIQ",
  description: "PymeIQ product documentation and prompt library.",
};

const swotPromptText = `You are a business strategy assistant for an SMB owner in Latin America.

Given the following business inputs:
- Business name
- Industry (Retail, Restaurants, Professional Services, E-commerce, Manufacturing, Other)
- Monthly revenue range
- Number of employees
- Top challenge (free text)

Produce a structured SWOT analysis with exactly:
- 3 Strengths
- 3 Weaknesses
- 3 Opportunities
- 3 Threats

Then produce 3 prioritized actions. For each action, return:
- title (short, actionable, in English)
- impact (high | medium | low)
- timeframe (e.g. "2 weeks", "4 weeks")

Constraints:
- Plain language, no jargon.
- Each item must be 1 sentence max.
- Output must be a JSON object matching this shape:
  {
    "strengths": ["...","...","..."],
    "weaknesses": ["...","...","..."],
    "opportunities": ["...","...","..."],
    "threats": ["...","...","..."],
    "actions": [
      { "title": "...", "impact": "high|medium|low", "timeframe": "..." },
      { "title": "...", "impact": "high|medium|low", "timeframe": "..." },
      { "title": "...", "impact": "high|medium|low", "timeframe": "..." }
    ]
  }

IMPLEMENTATION NOTE (Week 1):
This prompt is the design contract. The Week 1 implementation uses a
deterministic mock generator (lib/swotGenerator.js) that returns the same
output shape based on input templates. The UI labels every output with
"Simulated AI output (mock generator)" to keep the educational nature of
the demo transparent. Real LLM integration is deferred to a later week.`;

export default function DocsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        Documentation
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Product reference, prompt library, and progress notes for PymeIQ.
      </p>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Current status (Week 1)
        </h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li>Marketing site deployed on Vercel.</li>
          <li>GitHub repo connected with continuous deployment.</li>
          <li>Supabase project provisioned; <code>core_outputs</code> table created.</li>
          <li>Generative Core Agent live at <Link className="text-brand-600 hover:underline" href="/core">/core</Link>.</li>
          <li>Saved diagnostics dashboard at <Link className="text-brand-600 hover:underline" href="/dashboard">/dashboard</Link>.</li>
          <li>Stack: Next.js 14 + Tailwind 3 + Supabase JS v2.</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Prompt Library — Week 1: SWOT Generator
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          The exact design prompt used for the SWOT generator. The
          implementation this week is a deterministic mock; the prompt below
          is the contract a real LLM call would be expected to follow.
        </p>

        <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-5 text-xs leading-relaxed text-slate-100">
{swotPromptText}
        </pre>
      </div>

      <div className="mt-12 flex gap-4">
        <Link
          href="/core"
          className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Try the generator →
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border-2 border-brand-600 px-5 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-50"
        >
          View dashboard
        </Link>
      </div>
    </section>
  );
}
