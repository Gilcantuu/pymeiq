"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  TIERS,
  SEGMENTS,
  ASSUMPTIONS,
  computeMRR,
  computeARR,
  fmtMXN,
} from "../../lib/pricingData";

function defaultInputsForSegment(segment) {
  const seg = SEGMENTS.find((s) => s.id === segment);
  const out = {};
  TIERS.forEach((t) => {
    out[t.id] = {
      customers: seg.defaultCustomersByTier[t.id],
      arpu: t.priceMXN,
      churn: seg.defaultChurn,
    };
  });
  return out;
}

export default function PricingPage() {
  const [segment, setSegment] = useState("Microempresa");
  const [inputs, setInputs] = useState(() => defaultInputsForSegment("Microempresa"));
  const [saved, setSaved] = useState([]);
  const [savingTier, setSavingTier] = useState(null);
  const [error, setError] = useState(null);

  // When segment changes, reset inputs to defaults and reload saved scenarios.
  useEffect(() => {
    setInputs(defaultInputsForSegment(segment));
  }, [segment]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data, error } = await supabase
          .from("pricing_scenarios")
          .select("*")
          .eq("segment", segment)
          .order("created_at", { ascending: false })
          .limit(10);
        if (error) throw error;
        if (!cancelled) setSaved(data || []);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load saved scenarios");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [segment]);

  const rows = useMemo(
    () =>
      TIERS.filter((t) => t.id !== "Free").map((t) => {
        const i = inputs[t.id];
        const mrr = computeMRR(i.customers, i.arpu, i.churn);
        const arr = computeARR(mrr);
        return { tier: t, mrr, arr };
      }),
    [inputs]
  );

  async function saveScenario(tierId) {
    setSavingTier(tierId);
    setError(null);
    const i = inputs[tierId];
    const mrr = computeMRR(i.customers, i.arpu, i.churn);
    const arr = computeARR(mrr);
    const row = {
      segment,
      tier: tierId,
      customers: Number(i.customers),
      arpu: Number(i.arpu),
      churn: Number(i.churn),
      mrr,
      arr,
    };
    try {
      const { data, error } = await supabase
        .from("pricing_scenarios")
        .insert(row)
        .select()
        .single();
      if (error) throw error;
      setSaved((prev) => [data, ...prev].slice(0, 10));
    } catch (e) {
      setError(e.message || "Failed to save scenario");
    } finally {
      setSavingTier(null);
    }
  }

  function updateInput(tierId, field, value) {
    setInputs((prev) => ({
      ...prev,
      [tierId]: { ...prev[tierId], [field]: value },
    }));
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <p className="text-sm font-medium text-gray-500">Pricing</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Pricing and revenue simulator</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Switch segment, adjust customers, ARPU, and churn. The page recalculates MRR and ARR live and lets you save
          named scenarios for comparison with advisors.
        </p>
      </header>

      {/* Segment toggle */}
      <section className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Customer segment</p>
        <div className="mt-3 flex gap-3">
          {SEGMENTS.map((s) => {
            const active = segment === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSegment(s.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tier cards */}
      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <article
            key={t.id}
            className={`rounded-lg border p-6 ${
              t.highlight ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">{t.name}</h2>
              {t.highlight && (
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {t.priceMXN === 0 ? "$0" : `$${t.priceMXN.toLocaleString("es-MX")}`}{" "}
              <span className="text-sm font-medium text-gray-500">MXN/mo</span>
            </p>
            <ul className="mt-4 space-y-1 text-sm text-gray-700">
              {t.features.map((f) => (
                <li key={f}>· {f}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-gray-500">{t.tagline}</p>
          </article>
        ))}
      </section>

      {/* Calculator */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">Revenue calculator</h2>
        <p className="mt-1 text-sm text-gray-600">
          MRR = customers × ARPU × (1 − churn). ARR = MRR × 12. Free tier is excluded because ARPU is zero.
        </p>

        <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Customers</th>
                <th className="px-4 py-3">ARPU (MXN)</th>
                <th className="px-4 py-3">Monthly churn (%)</th>
                <th className="px-4 py-3">MRR</th>
                <th className="px-4 py-3">ARR</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map(({ tier, mrr, arr }) => {
                const i = inputs[tier.id];
                return (
                  <tr key={tier.id}>
                    <td className="px-4 py-3 font-medium text-gray-900">{tier.name}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100000"
                        value={i.customers}
                        onChange={(e) => updateInput(tier.id, "customers", e.target.value)}
                        className="w-28 rounded border border-gray-300 px-2 py-1"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        value={i.arpu}
                        onChange={(e) => updateInput(tier.id, "arpu", e.target.value)}
                        className="w-28 rounded border border-gray-300 px-2 py-1"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={i.churn}
                        onChange={(e) => updateInput(tier.id, "churn", e.target.value)}
                        className="w-24 rounded border border-gray-300 px-2 py-1"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{fmtMXN(mrr)}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{fmtMXN(arr)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => saveScenario(tier.id)}
                        disabled={savingTier === tier.id}
                        className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {savingTier === tier.id ? "Saving..." : "Save"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>

      {/* Assumptions */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">Assumptions</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Assumption</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ASSUMPTIONS.map((a) => (
                <tr key={a.name}>
                  <td className="px-4 py-3 text-gray-900">{a.name}</td>
                  <td className="px-4 py-3 text-gray-900">{a.value}</td>
                  <td className="px-4 py-3 text-gray-600">{a.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Saved scenarios */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900">Saved scenarios — {segment}</h2>
        <p className="mt-1 text-sm text-gray-600">Last 10, newest first. Append-only.</p>

        <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
          {saved.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-500">No saved scenarios yet for this segment.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Customers</th>
                  <th className="px-4 py-3">ARPU</th>
                  <th className="px-4 py-3">Churn</th>
                  <th className="px-4 py-3">ARR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {saved.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(s.created_at).toLocaleString("es-MX")}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{s.tier}</td>
                    <td className="px-4 py-3 text-gray-900">{s.customers.toLocaleString("es-MX")}</td>
                    <td className="px-4 py-3 text-gray-900">{fmtMXN(s.arpu)}</td>
                    <td className="px-4 py-3 text-gray-900">{s.churn}%</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{fmtMXN(s.arr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}
