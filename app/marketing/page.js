"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  BRAND,
  PERSONA,
  LANDING_COPY,
  SOCIAL_POSTS,
  VIDEO_SCRIPTS,
  CALENDAR_14_DAYS,
  AB_HEADLINES,
} from "../../lib/marketingData";

export default function MarketingPage() {
  const [channel, setChannel] = useState("LinkedIn");
  const [impA, setImpA] = useState(0);
  const [impB, setImpB] = useState(0);
  const [selA, setSelA] = useState(0);
  const [selB, setSelB] = useState(0);
  const [saved, setSaved] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data, error } = await supabase
          .from("marketing_assets")
          .select("*")
          .order("saved_at", { ascending: false })
          .limit(10);
        if (error) throw error;
        if (!cancelled) setSaved(data || []);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load saved assets");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function pickA() {
    setImpA((n) => n + 1);
    setSelA((n) => n + 1);
  }
  function pickB() {
    setImpB((n) => n + 1);
    setSelB((n) => n + 1);
  }

  async function saveWinner() {
    setSaving(true);
    setError(null);
    const variant = selA >= selB ? "A" : "B";
    const headline = AB_HEADLINES.find((h) => h.id === variant).text;
    const row = {
      variant,
      impressions_a: impA,
      impressions_b: impB,
      headline,
    };
    try {
      const { data, error } = await supabase
        .from("marketing_assets")
        .insert(row)
        .select()
        .single();
      if (error) throw error;
      setSaved((prev) => [data, ...prev].slice(0, 10));
      flashToast("Winner saved");
    } catch (e) {
      setError(e.message || "Failed to save winner");
    } finally {
      setSaving(false);
    }
  }

  function flashToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 1200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      flashToast("Copied");
    } catch {
      flashToast("Copy failed");
    }
  }

  const filteredPosts = SOCIAL_POSTS.filter((p) => p.channel === channel);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-gray-500">Marketing</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Marketing engine and content system</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          The single workspace where the brand, the persona, the landing copy, the social calendar, and the A/B
          headline test live for PymeIQ.
        </p>
      </header>

      {/* 1. Brand */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">1. Brand system</h2>
        <div className="mt-4 rounded-lg border bg-white p-6">
          <div className="flex flex-wrap gap-6">
            {BRAND.colors.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded border" style={{ background: c.hex }} />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="text-gray-500">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Typography:</span> {BRAND.typography.family} ·{" "}
              {BRAND.typography.weights}
            </p>
          </div>
          <ul className="mt-3 list-disc pl-6 text-sm text-gray-700">
            {BRAND.voice.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Persona */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">2. Target persona</h2>
        <article className="mt-4 rounded-lg border bg-white p-6">
          <p className="text-base font-semibold text-gray-900">
            {PERSONA.name}, {PERSONA.age} — {PERSONA.business}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {PERSONA.industry} · {PERSONA.location} · {PERSONA.size}
          </p>
          <p className="mt-4 text-sm font-semibold text-gray-900">Pains</p>
          <ul className="mt-1 list-disc pl-6 text-sm text-gray-700">
            {PERSONA.pains.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold text-gray-900">Buying trigger</p>
          <p className="mt-1 text-sm text-gray-700">{PERSONA.trigger}</p>
          <p className="mt-4 text-sm font-semibold text-gray-900">Jobs to be done</p>
          <p className="mt-1 text-sm italic text-gray-700">{PERSONA.jtbd}</p>
        </article>
      </section>

      {/* 3. Landing copy */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">3. Landing copy</h2>
        <div className="mt-4 rounded-lg border bg-white p-6">
          <CopyRow label="Hero" text={LANDING_COPY.hero} onCopy={copyText} />
          <CopyRow label="Sub-hero" text={LANDING_COPY.subhero} onCopy={copyText} />
          <CopyRow label="CTA" text={LANDING_COPY.cta} onCopy={copyText} />
          <CopyRow label="Closing" text={LANDING_COPY.closing} onCopy={copyText} />
          <p className="mt-4 text-sm font-semibold text-gray-900">Bullets</p>
          <ul className="mt-1 list-disc pl-6 text-sm text-gray-700">
            {LANDING_COPY.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Social posts */}
      <section className="mb-10">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold text-gray-900">4. Social posts</h2>
          <div className="flex gap-2">
            {["LinkedIn", "Instagram"].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannel(ch)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  channel === ch
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredPosts.map((p) => (
            <article key={p.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-semibold text-gray-500">{p.id}</p>
                <button
                  onClick={() => copyText(p.body)}
                  className="rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Copy
                </button>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Video scripts */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">5. Video scripts</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {VIDEO_SCRIPTS.map((v) => (
            <article key={v.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {v.format}
                </span>
                <span className="text-xs text-gray-500">{v.length}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-900">{v.hook}</p>
              <ul className="mt-3 list-decimal pl-5 text-xs text-gray-700">
                {v.beats.map((b, i) => (
                  <li key={i} className="mb-1">
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Calendar */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">6. 14-day campaign calendar</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Day</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CALENDAR_14_DAYS.map((r) => (
                <tr key={r.day}>
                  <td className="px-4 py-2 font-medium text-gray-900">{r.day}</td>
                  <td className="px-4 py-2 text-gray-900">{r.channel}</td>
                  <td className="px-4 py-2 text-gray-900">{r.asset}</td>
                  <td className="px-4 py-2">
                    <StatusBadge value={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. A/B Headline test */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900">7. A/B headline test</h2>
        <p className="mt-1 text-sm text-gray-600">
          Click a variant to register an impression. Save the winner (or the leader so far) to Supabase.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ABCard
            variant="A"
            text={AB_HEADLINES[0].text}
            impressions={impA}
            selected={selA}
            tone="sky"
            onPick={pickA}
          />
          <ABCard
            variant="B"
            text={AB_HEADLINES[1].text}
            impressions={impB}
            selected={selB}
            tone="orange"
            onPick={pickB}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={saveWinner}
            disabled={saving || (impA === 0 && impB === 0)}
            className="rounded bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save winner"}
          </button>
          <p className="text-xs text-gray-500">
            Saves variant "{selA >= selB ? "A" : "B"}" with current impression counts.
          </p>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>

      {/* 8. Saved assets */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900">8. Saved marketing assets</h2>
        <p className="mt-1 text-sm text-gray-600">Last 10, newest first.</p>
        <div className="mt-4 overflow-x-auto rounded-lg border bg-white">
          {saved.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-500">No saved assets yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Variant</th>
                  <th className="px-4 py-3">Impressions A</th>
                  <th className="px-4 py-3">Impressions B</th>
                  <th className="px-4 py-3">Headline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {saved.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(s.saved_at).toLocaleString("es-MX")}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900">{s.variant}</td>
                    <td className="px-4 py-2 text-gray-900">{s.impressions_a}</td>
                    <td className="px-4 py-2 text-gray-900">{s.impressions_b}</td>
                    <td className="px-4 py-2 text-gray-700">{s.headline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow">
          {toast}
        </div>
      )}
    </main>
  );
}

function CopyRow({ label, text, onCopy }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <p className="text-sm text-gray-900">{text}</p>
      </div>
      <button
        onClick={() => onCopy(text)}
        className="rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        Copy
      </button>
    </div>
  );
}

function ABCard({ variant, text, impressions, selected, tone, onPick }) {
  const colors =
    tone === "sky"
      ? { card: "border-sky-300 bg-sky-50", chip: "text-sky-900", btn: "bg-sky-600 hover:bg-sky-700" }
      : { card: "border-orange-300 bg-orange-50", chip: "text-orange-900", btn: "bg-orange-600 hover:bg-orange-700" };
  return (
    <article className={`rounded-lg border p-5 ${colors.card}`}>
      <p className={`text-xs font-semibold ${colors.chip}`}>Variant {variant}</p>
      <p className="mt-2 text-base font-medium text-gray-900">{text}</p>
      <p className={`mt-3 text-xs ${colors.chip}`}>
        Impressions: {impressions} · Selected {selected}x
      </p>
      <button
        onClick={onPick}
        className={`mt-4 rounded px-4 py-2 text-sm font-semibold text-white ${colors.btn}`}
      >
        Pick {variant}
      </button>
    </article>
  );
}

function StatusBadge({ value }) {
  const tone =
    value === "Ready"
      ? "bg-green-100 text-green-800"
      : value === "Draft"
      ? "bg-amber-100 text-amber-800"
      : "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>{value}</span>
  );
}
