// SWOT Generator — Week 1 mock function.
// IMPORTANT: this is a SIMULATED AI output. It is deterministic and
// templated, NOT a real model call. The course allows this and we label
// it visibly in the UI (see components/SwotCard.js).
//
// Input shape:
//   {
//     businessName: string,
//     industry: "Retail" | "Restaurants" | "Professional Services" |
//               "E-commerce" | "Manufacturing" | "Other",
//     revenueRange: "< $5K/month" | "$5K-$25K" | "$25K-$100K" | "> $100K",
//     employeeCount: number,
//     topChallenge: string
//   }
//
// Output shape:
//   {
//     strengths: string[3],
//     weaknesses: string[3],
//     opportunities: string[3],
//     threats: string[3],
//     actions: Array<{ title: string, impact: "high"|"medium"|"low",
//                      timeframe: string }>
//   }

const TEMPLATES = {
  Retail: {
    strengths: ["Wide product range", "Strong supplier relationships", "Physical store traffic"],
    weaknesses: ["No inventory analytics", "Limited e-commerce", "Outdated POS system"],
    opportunities: ["Online catalog launch", "Bundle promotions for slow stock", "B2B wholesale segment"],
    threats: ["Online-only competitors", "Currency fluctuation", "Seasonal demand swings"],
  },
  Restaurants: {
    strengths: ["Established local presence", "Loyal customer base", "Low overhead structure"],
    weaknesses: ["No digital marketing", "Manual accounting", "High dependency on owner"],
    opportunities: ["Online delivery channels", "Loyalty program adoption", "Local partnerships"],
    threats: ["Chain competitors", "Rising ingredient costs", "Talent retention"],
  },
  "Professional Services": {
    strengths: ["Personal customer relationships", "Flexible operating hours", "Quick service delivery"],
    weaknesses: ["No formal sales process", "No online presence", "Limited service offering"],
    opportunities: ["Local Google business profile", "Referral incentive program", "Adjacent service expansion"],
    threats: ["Newer competitors with apps", "Price-sensitive customers", "Owner burnout"],
  },
  "E-commerce": {
    strengths: ["Direct customer data", "Lean operations", "Scalable distribution"],
    weaknesses: ["High ad costs", "Single-channel reliance", "No subscription revenue"],
    opportunities: ["Marketplace expansion (Amazon/Mercado Libre)", "Email automation", "Subscription model"],
    threats: ["Algorithm changes", "Shipping cost increases", "Customer acquisition costs"],
  },
  Manufacturing: {
    strengths: ["Production capacity", "Technical know-how", "Established B2B clients"],
    weaknesses: ["Long sales cycles", "Capital-intensive", "Low marketing investment"],
    opportunities: ["Direct-to-consumer launch", "Export markets", "Service contracts"],
    threats: ["Raw material volatility", "Cheap imports", "Skilled labor shortage"],
  },
  Other: {
    strengths: ["Operational experience", "Customer relationships", "Industry knowledge"],
    weaknesses: ["Limited digital tools", "Owner-dependent operations", "No formal strategy"],
    opportunities: ["Process automation", "New customer segments", "Strategic partnerships"],
    threats: ["Market changes", "Competitive pressure", "Regulatory changes"],
  },
};

const ACTIONS_BY_REVENUE = {
  "< $5K/month": [
    { title: "Create Google Business Profile with photos and reviews", impact: "high", timeframe: "1 week" },
    { title: "Launch a simple referral program (give $5, get $5)", impact: "medium", timeframe: "2 weeks" },
    { title: "Add one adjacent service to increase revenue per customer", impact: "high", timeframe: "4 weeks" },
  ],
  "$5K-$25K": [
    { title: "Launch WhatsApp Business + Instagram presence", impact: "high", timeframe: "2 weeks" },
    { title: "Set up basic accounting in a free tool", impact: "medium", timeframe: "1 week" },
    { title: "Document operating procedures so business runs without owner", impact: "high", timeframe: "4 weeks" },
  ],
  "$25K-$100K": [
    { title: "Run 30% off bundle promotion to clear slow stock", impact: "high", timeframe: "3 weeks" },
    { title: "Launch online catalog with WhatsApp ordering", impact: "high", timeframe: "4 weeks" },
    { title: "Implement basic inventory tracking spreadsheet", impact: "medium", timeframe: "2 weeks" },
  ],
  "> $100K": [
    { title: "Hire a part-time operations manager to reduce owner load", impact: "high", timeframe: "4 weeks" },
    { title: "Migrate to a proper ERP (free tier of Odoo or similar)", impact: "high", timeframe: "8 weeks" },
    { title: "Run a customer NPS survey to find churn drivers", impact: "medium", timeframe: "2 weeks" },
  ],
};

export function generateSwot(input) {
  const industry = TEMPLATES[input.industry] ? input.industry : "Other";
  const swot = TEMPLATES[industry];

  const actions =
    ACTIONS_BY_REVENUE[input.revenueRange] || ACTIONS_BY_REVENUE["$5K-$25K"];

  // Lightweight personalization: if the user mentioned "online" or "digital"
  // in their top challenge, swap one opportunity to address it.
  const personalizedOpportunities = [...swot.opportunities];
  if (input.topChallenge && /online|digital|web|app/i.test(input.topChallenge)) {
    personalizedOpportunities[0] = "Quick-win digital presence (website + social)";
  }
  if (input.topChallenge && /staff|employee|team|hire/i.test(input.topChallenge)) {
    personalizedOpportunities[1] = "Hire 1 key role to unblock growth";
  }

  // If team is very small (<=2), surface owner-dependency as weakness #1
  const personalizedWeaknesses = [...swot.weaknesses];
  if (Number(input.employeeCount) <= 2) {
    personalizedWeaknesses[0] = "Very high owner dependency (single point of failure)";
  }

  return {
    strengths: swot.strengths,
    weaknesses: personalizedWeaknesses,
    opportunities: personalizedOpportunities,
    threats: swot.threats,
    actions,
    _simulated: true, // internal flag — UI checks this and shows the badge
  };
}
