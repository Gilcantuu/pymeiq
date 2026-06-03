"use client";
// SwotForm — controlled form that captures 5 business inputs and calls
// the mock generator on submit. English UI only.

import { useState } from "react";

const INDUSTRIES = [
  "Retail",
  "Restaurants",
  "Professional Services",
  "E-commerce",
  "Manufacturing",
  "Other",
];

const REVENUE_RANGES = [
  "< $5K/month",
  "$5K-$25K",
  "$25K-$100K",
  "> $100K",
];

export default function SwotForm({ onGenerate }) {
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    revenueRange: "",
    employeeCount: "",
    topChallenge: "",
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onGenerate({
      ...form,
      employeeCount: Number(form.employeeCount) || 0,
    });
  }

  const allFilled =
    form.businessName &&
    form.industry &&
    form.revenueRange &&
    form.employeeCount;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-label="Business intake form"
    >
      <h2 className="text-xl font-bold text-slate-900">Business Intake Form</h2>
      <p className="mt-1 text-sm text-slate-500">All fields required.</p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Business name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            placeholder="e.g. Pizza Don Luis"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Select industry…</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Monthly revenue range (USD) <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.revenueRange}
            onChange={(e) => update("revenueRange", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Select range…</option>
            {REVENUE_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Number of employees <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            required
            value={form.employeeCount}
            onChange={(e) => update("employeeCount", e.target.value)}
            placeholder="e.g. 8"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Top challenge right now
          </label>
          <textarea
            rows={4}
            maxLength={280}
            value={form.topChallenge}
            onChange={(e) => update("topChallenge", e.target.value)}
            placeholder="Describe in 280 characters or less…"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <p className="mt-1 text-xs text-slate-400">
            {form.topChallenge.length}/280
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!allFilled}
        className="mt-8 w-full rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Generate diagnostic
      </button>
    </form>
  );
}
