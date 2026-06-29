"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  INITIAL_MESSAGES,
  HUMAN_CHECKPOINT,
  nextBotMessage,
} from "../../lib/advisorBot";

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [step, setStep] = useState(1);
  const [intake, setIntake] = useState({
    business_name: "",
    industry: "",
    pain: "",
    recommendation: "",
  });
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(null);
  const [saved, setSaved] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data, error } = await supabase
          .from("chat_sessions")
          .select("*")
          .order("saved_at", { ascending: false })
          .limit(5);
        if (error) throw error;
        if (!cancelled) setSaved(data || []);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load saved sessions");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: "user", kind: "text", text };
    const { reply, nextStep, intakeDelta } = nextBotMessage(step, text, intake);
    setMessages((prev) => [...prev, userMsg, reply]);
    setStep(nextStep);
    setIntake((prev) => ({ ...prev, ...intakeDelta }));
    setInput("");
  }

  function openCheckpoint() {
    setMessages((prev) => [
      ...prev,
      { role: "bot", kind: "checkpoint", ...HUMAN_CHECKPOINT },
    ]);
  }

  function resetSession() {
    setMessages(INITIAL_MESSAGES);
    setStep(1);
    setIntake({ business_name: "", industry: "", pain: "", recommendation: "" });
    setRating(null);
    setInput("");
  }

  async function saveSession() {
    setSaving(true);
    setError(null);
    try {
      const row = {
        business_name: intake.business_name || null,
        industry: intake.industry || null,
        pain: intake.pain || null,
        recommendation: intake.recommendation || null,
        rating,
        transcript: messages,
      };
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert(row)
        .select()
        .single();
      if (error) throw error;
      setSaved((prev) => [data, ...prev].slice(0, 5));
      resetSession();
    } catch (e) {
      setError(e.message || "Failed to save session");
    } finally {
      setSaving(false);
    }
  }

  const canSave = step >= 4 && rating !== null;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-6">
        <p className="text-sm font-medium text-gray-500">PymeIQ Advisor</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">A guided 3-question intake</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Tell the advisor your business name, industry, and biggest pain. It will recommend the PymeIQ module to
          open next.
        </p>
        <span className="mt-4 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
          Rules-based · no LLM
        </span>
      </header>

      {/* Chat window */}
      <div
        ref={scrollRef}
        className="h-[480px] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4"
      >
        <ul className="space-y-3">
          {messages.map((m, i) => (
            <li key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              {m.kind === "recommendation" ? <Recommendation m={m} /> : null}
              {m.kind === "guardrail" ? <Guardrail m={m} /> : null}
              {m.kind === "checkpoint" ? <Checkpoint m={m} /> : null}
              {m.kind === "text" ? <Bubble m={m} /> : null}
            </li>
          ))}
        </ul>
      </div>

      {/* Composer */}
      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            step === 1
              ? "Your business name…"
              : step === 2
              ? "Your industry…"
              : step === 3
              ? "Your biggest pain this quarter…"
              : "Ask one follow-up…"
          }
          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Send
        </button>
        <button
          type="button"
          onClick={openCheckpoint}
          className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Talk to founder
        </button>
      </form>

      {/* Save + rate */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Save this conversation</h2>
        <div className="mt-3 flex items-center gap-3 rounded-lg border bg-white p-4">
          <span className="text-sm text-gray-600">Rate:</span>
          <button
            type="button"
            onClick={() => setRating("up")}
            className={`rounded border px-4 py-1.5 text-base ${
              rating === "up" ? "border-green-600 bg-green-50" : "border-gray-300 bg-white"
            }`}
            aria-label="Thumbs up"
          >
            👍
          </button>
          <button
            type="button"
            onClick={() => setRating("down")}
            className={`rounded border px-4 py-1.5 text-base ${
              rating === "down" ? "border-red-600 bg-red-50" : "border-gray-300 bg-white"
            }`}
            aria-label="Thumbs down"
          >
            👎
          </button>
          <div className="ml-auto">
            <button
              type="button"
              onClick={saveSession}
              disabled={!canSave || saving}
              className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save session"}
            </button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {!canSave && (
          <p className="mt-2 text-xs text-gray-500">
            Save unlocks after the third intake answer AND a rating.
          </p>
        )}
      </section>

      {/* Saved sessions */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Saved sessions</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border bg-white">
          {saved.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-500">No saved sessions yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Business</th>
                  <th className="px-4 py-3">Pain</th>
                  <th className="px-4 py-3">Rec</th>
                  <th className="px-4 py-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {saved.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(s.saved_at).toLocaleString("es-MX")}
                    </td>
                    <td className="px-4 py-2 text-gray-900">{s.business_name}</td>
                    <td className="px-4 py-2 text-gray-900">{s.pain}</td>
                    <td className="px-4 py-2 text-gray-700">{s.recommendation}</td>
                    <td className="px-4 py-2">{s.rating === "up" ? "👍" : "👎"}</td>
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

function Bubble({ m }) {
  const isUser = m.role === "user";
  return (
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
        isUser ? "bg-blue-100 text-blue-900" : "bg-white text-gray-900 border border-gray-200"
      }`}
    >
      <p className="mb-1 text-xs font-semibold opacity-70">{isUser ? "You" : "PymeIQ Advisor"}</p>
      <p>{m.text}</p>
    </div>
  );
}

function Recommendation({ m }) {
  return (
    <article className="max-w-[80%] rounded-2xl border-2 border-blue-600 bg-blue-50 px-4 py-3 text-sm">
      <p className="text-xs font-semibold text-blue-900">PymeIQ Advisor — recommendation</p>
      <p className="mt-1 text-base font-semibold text-gray-900">{m.text}</p>
      <p className="mt-2 text-gray-700">{m.reason}</p>
      <a
        href={m.href}
        className="mt-3 inline-flex rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
      >
        {m.ctaLabel}
      </a>
    </article>
  );
}

function Guardrail({ m }) {
  return (
    <article className="max-w-[80%] rounded-2xl border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm">
      <p className="text-xs font-semibold text-amber-900">PymeIQ Advisor — guardrail</p>
      <p className="mt-1 text-gray-900">{m.text}</p>
    </article>
  );
}

function Checkpoint({ m }) {
  return (
    <article className="max-w-[80%] rounded-2xl border-2 border-green-600 bg-green-50 px-4 py-3 text-sm">
      <p className="text-xs font-semibold text-green-900">Human checkpoint</p>
      <p className="mt-1 text-base font-semibold text-gray-900">{m.title}</p>
      <p className="mt-1 text-gray-700">{m.body}</p>
      <a
        href={m.href}
        className="mt-3 inline-flex rounded bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
      >
        {m.cta}
      </a>
    </article>
  );
}
