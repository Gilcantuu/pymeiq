"use client";
// CompetitorTable - 8 rows with filter (category) and search (name).
// Client component because of useState for filter and search.

import { useState, useMemo } from "react";
import {
  COMPETITORS,
  CATEGORY_LABELS,
  categoryBadgeClasses,
} from "../../lib/researchData";

const CATEGORIES = [
  { value: "all", label: "All categories" },
  { value: "direct", label: "Direct" },
  { value: "substitute", label: "Substitute" },
  { value: "adjacent", label: "Adjacent" },
];

export default function CompetitorTable() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPETITORS.filter((c) => {
      const passCategory = category === "all" || c.category === category;
      const passSearch = q.length === 0 || c.name.toLowerCase().includes(q);
      return passCategory && passSearch;
    });
  }, [category, search]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">8 Mexican Competitors and Substitutes</h2>
      <p className="mt-1 text-sm text-slate-500">
        Filter by category. Search by name. Each row links to the company.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="w-full sm:w-56 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          aria-label="Search competitors by name"
          className="w-full sm:max-w-md rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <span className="self-center text-xs text-slate-500">{filtered.length} shown</span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-600">
              <th className="px-3 py-3 font-bold">Name</th>
              <th className="px-3 py-3 font-bold">Category</th>
              <th className="px-3 py-3 font-bold">Coverage</th>
              <th className="px-3 py-3 font-bold">Strength</th>
              <th className="px-3 py-3 font-bold">Weakness</th>
              <th className="px-3 py-3 font-bold">Source</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-sm text-slate-500">
                  No competitors match the current filter and search.
                </td>
              </tr>
            )}
            {filtered.map((c) => (
              <tr key={c.name} className="border-t border-slate-200 align-top">
                <td className="px-3 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-3 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${categoryBadgeClasses(c.category)}`}>
                    {CATEGORY_LABELS[c.category]}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-700">{c.coverage}</td>
                <td className="px-3 py-3 text-slate-700">{c.strength}</td>
                <td className="px-3 py-3 text-slate-700">{c.weakness}</td>
                <td className="px-3 py-3">
                  <a
                    href={c.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-600 hover:underline"
                  >
                    Visit ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
