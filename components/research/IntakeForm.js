"use client";
// IntakeForm - controlled form that captures a new research hypothesis
// and persists it to Supabase research_outputs.

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const INDUSTRIES = [
  "Restaurants",
  "Retail",
  "Professional Services",
  "E-commerce",
  "Manufacturing",
  "Other",
];

const GEOGRAPHIES = ["Mexico", "LATAM", "Global"];

export default function IntakeForm({ onSaved }) {
  const [form, setForm] = useState({
    industry_focus: "",
    geography: "",
    hypothesis: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const allFilled =
    form.industry_focus && form.geography && form.hypothesis.trim().length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const { error: insertError } = await supabase
        .from("research_outputs")
        .insert({
          industry_focus: form.industry_focus,
          geography: form.geography,
          hypothesis: form.hypothesis.trim(),
          notes: form.notes.trim() || null,
        });
      if (insertError) throw insertError;
      setSaved(true);
      setForm({
        industry_focus: "",
        geography: "",
        hypothesis: "",
        notes: "",
      });
      if (typeof onSaved === "function") onSaved();
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e.message || "Save failed. Check console for details.");
      // eslint-disable-next-line no-console
      console.error("[IntakeForm] Save error:", e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-label="Research intake form"
    >
      <h2 className="text-xl font-bold text-slate-900">Research Intake</h2>
      <p className="mt-1 text-sm text-slate-500">
        Record a new research hypothesis. It is saved to Supabase and surfaces on the dashboard.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Industry focus <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.industry_focus}
            onChange={(e) => update("industry_focus", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Select industry...</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Geography <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.geography}
            onChange={(e) => update("geography", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Select geography...</option>
            {GEOGRAPHIES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Hypothesis to validate <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            maxLength={280}
            value={form.hypothesis}
            onChange={(e) => update("hypothesis", e.target.value)}
            placeholder="Describe in 280 characters or less..."
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <p className="mt-1 text-xs text-slate-400">{form.hypothesis.length}/280</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Notes (optional)</label>
          <textarea
            rows={2}
            maxLength={280}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Any extra context..."
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!allFilled || saving || saved}
        className="mt-6 w-full sm:w-auto rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save research"}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>
      )}
    </form>
  );
}
