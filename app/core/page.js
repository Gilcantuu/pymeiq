// Layout root with optimized SEO metadata
"use client";
import { useState } from "react";
import SwotForm from "../../components/SwotForm";
import SwotCard from "../../components/SwotCard";
import { generateSwot } from "../../lib/swotGenerator";

export default function CorePage() {
  const [result, setResult] = useState(null);
  const [formInput, setFormInput] = useState(null);

  function handleGenerate(input) {
    setFormInput(input);
    setResult(generateSwot(input));
    // Scroll to result on mobile
    setTimeout(() => {
      const el = document.getElementById("swot-result");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleReset() {
    setResult(null);
    setFormInput(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Generative Core Agent
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Generate your business SWOT
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Answer 5 quick questions about your business and receive a
          structured SWOT diagnostic with 3 prioritized actions.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <SwotForm onGenerate={handleGenerate} />
        <div id="swot-result">
          {result ? (
            <SwotCard data={result} formInput={formInput} onReset={handleReset} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
              <p className="text-sm text-slate-500">
                Fill the form on the left and click <strong>Generate diagnostic</strong> to see your SWOT here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
