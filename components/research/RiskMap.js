// RiskMap - 2x2 SVG matrix (Likelihood x Impact) with 4-6 risk dots.
// Server component (pure data + SVG, no client interactivity).

import { RISKS, riskColorClasses } from "../../lib/researchData";

// Maps a 1-3 score to an x or y coordinate in a 480px wide / 250px tall SVG plot area
function position(score, axis) {
  // axis x: lower likelihood = left, higher = right; map 1->100, 2->240, 3->380 (px within 480 wide grid)
  // axis y: lower impact = bottom, higher = top; map 1->210, 2->130, 3->50 (px within 250 tall grid)
  if (axis === "x") {
    if (score <= 1) return 100;
    if (score === 2) return 240;
    return 380;
  }
  if (score <= 1) return 210;
  if (score === 2) return 130;
  return 50;
}

export default function RiskMap() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Risk Map</h2>
      <p className="mt-1 text-sm text-slate-500">
        2×2 grid: Likelihood × Impact. Top-right quadrant = high-priority risks.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* SVG plot */}
        <svg viewBox="0 0 500 280" className="w-full h-auto" aria-label="Risk map 2 by 2 matrix">
          {/* axes */}
          <line x1="60" y1="20" x2="60" y2="250" stroke="#9ca3af" strokeWidth="2" />
          <line x1="60" y1="250" x2="480" y2="250" stroke="#9ca3af" strokeWidth="2" />
          {/* quadrant dividers */}
          <line x1="270" y1="20" x2="270" y2="250" stroke="#e5e7eb" strokeDasharray="4 4" />
          <line x1="60" y1="135" x2="480" y2="135" stroke="#e5e7eb" strokeDasharray="4 4" />
          {/* axis labels */}
          <text x="30" y="135" fontSize="11" fill="#6b7280" transform="rotate(-90 30 135)" textAnchor="middle">Impact</text>
          <text x="270" y="275" fontSize="11" fill="#6b7280" textAnchor="middle">Likelihood</text>
          {/* corner labels */}
          <text x="100" y="35" fontSize="10" fill="#9ca3af">High impact, low likelihood</text>
          <text x="290" y="35" fontSize="10" fill="#9ca3af">High impact, high likelihood</text>
          <text x="100" y="245" fontSize="10" fill="#9ca3af">Low impact, low likelihood</text>
          <text x="290" y="245" fontSize="10" fill="#9ca3af">Low impact, high likelihood</text>
          {/* risk dots */}
          {RISKS.map((r, i) => {
            const cx = position(r.likelihood, "x") + 60; // shift right to align with axis
            const cy = position(r.impact, "y");
            const fill =
              r.color === "high" ? "#dc2626" :
              r.color === "medium" ? "#d97706" : "#10b981";
            return (
              <g key={r.name}>
                <circle cx={cx} cy={cy} r="9" fill={fill}>
                  <title>{r.name}</title>
                </circle>
                <text x={cx + 14} y={cy + 4} fontSize="10" fill="#111827">{r.name}</text>
              </g>
            );
          })}
        </svg>

        {/* Legend + mitigations */}
        <div>
          <h3 className="text-sm font-bold text-slate-900">Legend</h3>
          <ul className="mt-2 space-y-1.5 text-xs">
            <li className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-red-600" /> <span className="font-semibold text-red-700">HIGH</span> — block product unless mitigated</li>
            <li className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-amber-500" /> <span className="font-semibold text-amber-700">MEDIUM</span> — track and plan a workaround</li>
            <li className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-emerald-500" /> <span className="font-semibold text-emerald-700">LOW</span> — acceptable for the MVP</li>
          </ul>

          <h3 className="mt-5 text-sm font-bold text-slate-900">Top mitigation actions (Week 3+)</h3>
          <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-xs text-slate-700">
            {RISKS.filter((r) => r.color === "high" || r.color === "medium").map((r) => (
              <li key={r.name}>
                <span className="font-semibold text-slate-900">{r.name}:</span> {r.mitigation}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
