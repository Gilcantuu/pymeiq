// /dashboard - Week 1 SWOT list + Week 2 "Latest research" widget.
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard — PymeIQ",
  description: "Latest saved SWOT diagnostics and latest research record.",
};

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function DashboardPage() {
  const [{ data: swotData, error: swotError }, { data: researchData, error: researchError }] =
    await Promise.all([
      supabase
        .from("core_outputs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("research_outputs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1),
    ]);

  const latestResearch = researchData && researchData[0];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Latest research record (Week 2) and last 5 SWOT diagnostics (Week 1).
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/research"
            className="inline-flex items-center justify-center rounded-xl border-2 border-brand-600 px-5 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-50"
          >
            View research
          </Link>
          <Link
            href="/core"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            + New diagnostic
          </Link>
        </div>
      </header>

      {/* Latest research widget (Week 2) */}
      <section className="rounded-2xl border border-brand-200 bg-brand-50 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          Latest research
        </p>
        {researchError && (
          <p className="mt-2 text-sm text-red-700">Could not load: {researchError.message}</p>
        )}
        {!researchError && !latestResearch && (
          <p className="mt-2 text-sm text-slate-600">
            No research saved yet. <Link href="/research" className="text-brand-600 hover:underline">Add the first one</Link>.
          </p>
        )}
        {!researchError && latestResearch && (
          <>
            <h2 className="mt-2 text-lg font-bold text-slate-900">{latestResearch.hypothesis}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {latestResearch.industry_focus} · {latestResearch.geography} · {formatDate(latestResearch.created_at)}
            </p>
            {latestResearch.notes && (
              <p className="mt-3 text-sm text-slate-700 italic">{latestResearch.notes}</p>
            )}
            <Link
              href="/research"
              className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline"
            >
              View all research →
            </Link>
          </>
        )}
      </section>

      {/* Recent SWOT diagnostics (Week 1) */}
      <section>
        <h2 className="text-xl font-bold text-slate-900">Recent diagnostics</h2>
        <p className="mt-1 text-sm text-slate-600">Last 5 SWOT diagnostics saved to the database.</p>

        {swotError && (
          <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            Could not load diagnostics: {swotError.message}
          </p>
        )}

        {!swotError && (!swotData || swotData.length === 0) && (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-slate-600">No diagnostics yet.</p>
            <Link href="/core" className="mt-4 inline-block text-brand-600 font-semibold hover:text-brand-700">
              Create the first one at /core →
            </Link>
          </div>
        )}

        {!swotError && swotData && swotData.length > 0 && (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {swotData.map((row) => {
              const topAction = row.actions_json && row.actions_json[0];
              return (
                <li key={row.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900">{row.business_name}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {row.industry} · {row.employee_count} employees · {formatDate(row.created_at)}
                  </p>
                  {topAction && (
                    <p className="mt-4 text-sm text-slate-700">
                      <span className="text-xs font-bold uppercase text-brand-600">Top action:</span> {topAction.title}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-slate-400">ID: {row.id.slice(0, 8)}…</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </section>
  );
}
