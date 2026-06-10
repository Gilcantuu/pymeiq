// Static research data for the /research page.
// These are research findings authored by the PymeIQ founder.
// They are NOT user-generated, so they live in code, not in the DB.
// Sources are cited per entry; URLs open in new tabs from the UI.

export const GLOBAL_EXAMPLES = [
  {
    name: "SCORE Business Health Assessment",
    country: "United States",
    flag: "🇺🇸",
    description: "Non-profit, government-backed SMB diagnostic plus mentor matching. Free baseline assessment with optional 1:1 mentoring.",
    pricingModel: "Free (mentor-funded)",
    sourceUrl: "https://www.score.org/resource/business-health-checkup",
  },
  {
    name: "LivePlan",
    country: "United States",
    flag: "🇺🇸",
    description: "Business planning SaaS with industry benchmarks and performance dashboards. Targets SMBs that have outgrown spreadsheets.",
    pricingModel: "USD $15–$30 / month",
    sourceUrl: "https://www.liveplan.com/",
  },
  {
    name: "QuickBooks Smart Insights",
    country: "United States",
    flag: "🇺🇸",
    description: "AI-driven financial diagnostic layered on top of accounting data. Surfaces cash-flow risks and opportunities to existing QuickBooks users.",
    pricingModel: "USD $30+ / month (bundle)",
    sourceUrl: "https://quickbooks.intuit.com/",
  },
  {
    name: "Bench Insights",
    country: "Canada / US",
    flag: "🇨🇦",
    description: "Bookkeeping service plus AI-driven monthly business health report. Service-led model, not pure SaaS.",
    pricingModel: "USD $299+ / month",
    sourceUrl: "https://www.bench.co/",
  },
  {
    name: "Xero Analytics Plus",
    country: "New Zealand",
    flag: "🇳🇿",
    description: "Cash-flow forecasting and KPI dashboards for SMBs. Strong in Australia/NZ/UK accounting ecosystem.",
    pricingModel: "USD $7+ / month (add-on)",
    sourceUrl: "https://www.xero.com/us/features-and-tools/accounting-software/analytics/",
  },
];

export const MEXICO_STATS = [
  {
    value: "4.9M",
    label: "SMBs in Mexico",
    note: "Account for ~52% of GDP and 78% of formal employment.",
    citation: "INEGI 2024",
    citationUrl: "https://www.inegi.org.mx/temas/pibe/",
  },
  {
    value: "~50%",
    label: "Close before year 5",
    note: "Lack of strategic planning is one of the top three documented causes.",
    citation: "INEGI / CONDUSEF reports",
    citationUrl: "https://www.condusef.gob.mx/?p=contenido&idc=1037&idcat=1",
  },
  {
    value: "USD $1.5–5K",
    label: "Avg. consulting diagnostic",
    note: "Out of reach for most SMBs. Creates a clear price ceiling for PymeIQ to undercut.",
    citation: "PwC Mexico SMB report 2023",
    citationUrl: "https://www.pwc.com/mx/es/publicaciones.html",
  },
];

export const COMPETITORS = [
  {
    name: "Contpaqi",
    category: "direct",
    coverage: "National (Mexico)",
    strength: "Dominant brand trust; deep accountant channel.",
    weakness: "Transactional accounting only, no diagnostic layer.",
    sourceUrl: "https://www.contpaqi.com/",
  },
  {
    name: "Aspel SAE",
    category: "direct",
    coverage: "National (Mexico)",
    strength: "Wide partner/reseller network across Mexico.",
    weakness: "Legacy UX; weak on advisory and forward-looking insights.",
    sourceUrl: "https://www.aspel.com.mx/",
  },
  {
    name: "Bind ERP",
    category: "direct",
    coverage: "National (Mexico)",
    strength: "Modern cloud ERP designed for Mexican SMBs.",
    weakness: "Operational ERP, not a diagnostic / advisory tool.",
    sourceUrl: "https://www.bind.com.mx/",
  },
  {
    name: "Konfío",
    category: "substitute",
    coverage: "National (Mexico)",
    strength: "Fintech with deep SMB data via lending relationships.",
    weakness: "Lending-first; insights are a by-product, not the product.",
    sourceUrl: "https://konfio.mx/",
  },
  {
    name: "Clip Plus",
    category: "substitute",
    coverage: "National (Mexico)",
    strength: "Massive payments installed base; analytics inside POS.",
    weakness: "Insights are surface-level; no strategic SWOT logic.",
    sourceUrl: "https://www.clip.mx/",
  },
  {
    name: "Independent CPA (Contador)",
    category: "substitute",
    coverage: "Local / fragmented",
    strength: "Pre-existing trust relationship; multi-year context.",
    weakness: "Tax-focused; not strategic; price varies wildly.",
    sourceUrl: "https://imcp.org.mx/",
  },
  {
    name: "Endeavor Mexico",
    category: "adjacent",
    coverage: "National (Mexico)",
    strength: "Top-tier mentor network and global founder community.",
    weakness: "High-growth only; not the bottom 80% of Mexican SMBs.",
    sourceUrl: "https://endeavor.org.mx/",
  },
  {
    name: "KPMG SMB Advisory",
    category: "adjacent",
    coverage: "National (Mexico)",
    strength: "Top-of-mind brand for credibility.",
    weakness: "Pricing out of reach for SMBs; targeted at upper mid-market.",
    sourceUrl: "https://home.kpmg/mx/",
  },
];

// Risk map: position via likelihood (1-3) and impact (1-3)
// likelihood: 1=Low, 2=Medium, 3=High
// impact: 1=Low, 2=Medium, 3=High
// color: "high" (red) | "medium" (amber) | "low" (green)
export const RISKS = [
  {
    name: "Trust gap with accountants",
    likelihood: 3,
    impact: 3,
    color: "high",
    mitigation: "Add a 'Validated by expert' tier; partner with accountants directly.",
  },
  {
    name: "B2C unit economics",
    likelihood: 3,
    impact: 2,
    color: "high",
    mitigation: "Pivot go-to-market to B2B2C via chambers and SMB-focused banks.",
  },
  {
    name: "AI hallucination → wrong advice",
    likelihood: 2,
    impact: 3,
    color: "medium",
    mitigation: "Label all outputs 'Simulated' until expert review is in the loop.",
  },
  {
    name: "Data privacy concerns (SAT)",
    likelihood: 2,
    impact: 2,
    color: "medium",
    mitigation: "Add explicit 'no SAT sharing' badge; encrypt at rest.",
  },
  {
    name: "Vendor lock-in (Supabase)",
    likelihood: 1,
    impact: 2,
    color: "low",
    mitigation: "Standard Postgres schema; portable to RDS if needed.",
  },
  {
    name: "Single-developer bus factor",
    likelihood: 1,
    impact: 1,
    color: "low",
    mitigation: "Document everything in /docs; keep dependencies minimal.",
  },
];

// Category label and color helpers used by CompetitorTable
export const CATEGORY_LABELS = {
  direct: "DIRECT",
  substitute: "SUBSTITUTE",
  adjacent: "ADJACENT",
};

export function categoryBadgeClasses(category) {
  if (category === "direct") return "bg-red-100 text-red-800";
  if (category === "substitute") return "bg-amber-100 text-amber-800";
  if (category === "adjacent") return "bg-blue-100 text-blue-800";
  return "bg-slate-100 text-slate-700";
}

export function riskColorClasses(color) {
  if (color === "high") return { dot: "bg-red-600", text: "text-red-700" };
  if (color === "medium") return { dot: "bg-amber-500", text: "text-amber-700" };
  return { dot: "bg-emerald-500", text: "text-emerald-700" };
}
