"use client";
// SwotCard — renders SWOT in a 2x2 grid + numbered action list.
// IMPORTANT: prominently shows "Simulated AI output" badge because the
// generator is a mock function, not a real model call.

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const QUADRANTS = [
  { key: "strengths",     title: "STRENGTHS",     bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", label: "text-emerald-700" },
  { key: "weaknesses",    title: "WEAKNESSES",    bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-900",   label: "text-amber-700" },
  { key: "opportunities", title: "OPPORTUNITIES", bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-900",    label: "text-blue-700" },
  { key: "threats",       title: "THREATS",       bg: "bg-red-50",     border: "border-red-200",     text: "text-red-900",     label: "text-red-700" },
];

function impactColor(impact) {
  if (impact === "high")   return "bg-red-100 text-red-800";
  if (impact === "medium") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-700";
}

export default function SwotCard({ data, formInput, onReset }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const { error: insertError } = await supabase
        .from("core_outputs")
        .insert({
          business_name: formInput.businessName,
          industry: formInput.industry,
          revenue_range: formInput.revenueRange,
          employee_count: formInput.employeeCount,
          top_challenge: formInput.topChallenge || null,
          swot_json: {
            strengths: data.strengths,
            weaknesses: data.weaknesses,
            opportunities: data.opportunities,
            threats: data.threats,
          },
          actions_json: data.actions,
        });
      if (insertError) throw insertError;
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e.message || "Save failed. Check console for details.");
      // eslint-disable-next-line no-console
      console.error("[SwotCard] Save error:", e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">SWOT Diagnostic</h2>
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          Simulated AI output (mock generator)
        </span>
      </div>

      {/* 2x2 SWOT grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUADRANTS.map((q) => (
          <div
            key={q.key}
            className={`rounded-xl border ${q.border} ${q.bg} p-4`}
          >
            <h3 className={`text-xs font-bold tracking-wider ${q.label}`}>
              {q.title}
            </h3>
            <ul className={`mt-3 space-y-1.5 text-sm ${q.text}`}>
              {data[q.key].map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8">
        <h3 className="text-base font-bold text-slate-900">
          3 prioritized actions
        </h3>
        <ol className="mt-3 space-y-3">
          {data.actions.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-slate-900">{a.title}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${impactColor(a.impact)}`}>
                    {a.impact} impact
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {a.timeframe}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:bg-slate-300"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save diagnostic"}
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-xl border-2 border-brand-600 px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
        >
          Generate another
        </button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </article>
  );
}
