// SavedList - server component. Reads last 5 rows from Supabase research_outputs.
import { supabase } from "../../lib/supabaseClient";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function SavedList() {
  const { data, error } = await supabase
    .from("research_outputs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Saved Research</h2>
      <p className="mt-1 text-sm text-slate-500">Most recent records from the database.</p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Could not load saved research: {error.message}
        </p>
      )}

      {!error && (!data || data.length === 0) && (
        <p className="mt-6 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
          No research saved yet. Use the intake form above to record your first hypothesis.
        </p>
      )}

      {!error && data && data.length > 0 && (
        <ul className="mt-5 space-y-3">
          {data.map((row) => (
            <li key={row.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">{row.hypothesis}</p>
              <p className="mt-1 text-xs text-slate-500">
                {row.industry_focus} · {row.geography} · {formatDate(row.created_at)}
              </p>
              {row.notes && <p className="mt-2 text-xs text-slate-600 italic">Notes: {row.notes}</p>}
              <p className="mt-2 text-[10px] text-slate-400">ID: {row.id.slice(0, 8)}…</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
