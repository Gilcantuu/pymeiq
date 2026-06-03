// /dashboard — reads last 5 saved diagnostics from Supabase.
// Server component: data is fetched at request time, secrets stay on server.
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export const dynamic = "force-dynamic"; // always fetch fresh

export const metadata = {
  title: "Dashboard — PymeIQ",
  description: "Latest saved SWOT diagnostics.",
};

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function DashboardPage() {
  const { data, error } = await supabase
    .from("core_outputs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Recent diagnostics
          </h1>
          <p className="mt-2 text-slate-600">
            Last 5 SWOT diagnostics saved to the database.
          </p>
        </div>
        <Link
          href="/core"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          + New diagnostic
        </Link>
      </header>

      {error && (
        <p className="mt-8 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Could not load diagnostics: {error.message}
        </p>
      )}

      {!error && (!data || data.length === 0) && (
        <div className="mt-12 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-slate-600">No diagnostics yet.</p>
          <Link
            href="/core"
            className="mt-4 inline-block text-brand-600 font-semibold hover:text-brand-700"
          >
            Create the first one at /core →
          </Link>
        </div>
      )}

      {!error && data && data.length > 0 && (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((row) => {
            const topAction = row.actions_json && row.actions_json[0];
            return (
              <li
                key={row.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-lg font-bold text-slate-900">
                  {row.business_name}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {row.industry} · {row.employee_count} employees · {formatDate(row.created_at)}
                </p>
                {topAction && (
                  <p className="mt-4 text-sm text-slate-700">
                    <span className="text-xs font-bold uppercase text-brand-600">
                      Top action:
                    </span>{" "}
                    {topAction.title}
                  </p>
                )}
                <p className="mt-4 text-xs text-slate-400">
                  ID: {row.id.slice(0, 8)}…
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
