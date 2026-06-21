// Static pricing data for /pricing.
// Not user-generated, so it lives as a module instead of in Supabase.

export const TIERS = [
  {
    id: "Free",
    name: "Free",
    priceMXN: 0,
    tagline: "Acquisition tier",
    features: [
      "1 SWOT diagnosis per month",
      "Read-only research benchmarks",
      "Email support",
    ],
    highlight: false,
  },
  {
    id: "Pro",
    name: "Pro",
    priceMXN: 499,
    tagline: "Single-owner tier",
    features: [
      "Unlimited diagnoses",
      "Saved research scenarios",
      "Pricing simulator",
      "Priority support",
    ],
    highlight: true,
  },
  {
    id: "Business",
    name: "Business",
    priceMXN: 2499,
    tagline: "Multi-user tier",
    features: [
      "Up to 5 users",
      "Saved scenarios history",
      "Advisor share link",
      "Dedicated onboarding",
    ],
    highlight: false,
  },
];

export const SEGMENTS = [
  {
    id: "Microempresa",
    name: "Microempresa (1-10)",
    universeMX: 4_100_000,
    defaultCustomersByTier: { Free: 5000, Pro: 800, Business: 0 },
    defaultChurn: 5,
  },
  {
    id: "PyME",
    name: "PyME (11-100)",
    universeMX: 220_000,
    defaultCustomersByTier: { Free: 1500, Pro: 400, Business: 120 },
    defaultChurn: 3,
  },
];

export const ASSUMPTIONS = [
  { name: "Microempresa universe (Mexico)", value: "4.1M", source: "INEGI ENAPROCE 2023" },
  { name: "PyME universe (Mexico)", value: "220K", source: "INEGI ENAPROCE 2023" },
  { name: "Target year-1 penetration", value: "0.02%", source: "Founder estimate" },
  { name: "Pro default ARPU", value: "$499 MXN", source: "Pricing decision (Week 3)" },
  { name: "Business default ARPU", value: "$2,499 MXN", source: "Pricing decision (Week 3)" },
  { name: "Default monthly churn (Microempresa)", value: "5%", source: "SaaS SMB benchmark" },
  { name: "Default monthly churn (PyME)", value: "3%", source: "SaaS SMB benchmark" },
  { name: "Sales cycle (Microempresa)", value: "7 days", source: "Self-serve assumption" },
  { name: "Sales cycle (PyME)", value: "30 days", source: "Advisor interview" },
  { name: "CAC payback target", value: "< 6 months", source: "Founder constraint" },
  { name: "Gross margin (assumed)", value: "85%", source: "Comparable SaaS public data" },
  { name: "Free-to-Pro conversion (year 1)", value: "3%", source: "Industry benchmark" },
];

// Pure math, exported so tests can import them.
export function computeMRR(customers, arpu, churnPct) {
  const c = clamp(Number(customers) || 0, 0, 100000);
  const a = Math.max(0, Number(arpu) || 0);
  const ch = clamp(Number(churnPct) || 0, 0, 50);
  return c * a * (1 - ch / 100);
}

export function computeARR(mrr) {
  return mrr * 12;
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export const fmtMXN = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n || 0);
