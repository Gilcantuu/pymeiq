// Static marketing assets for /marketing.
// Edit the strings here to change the page content.

export const BRAND = {
  colors: [
    { name: "Primary", hex: "#2563EB" },
    { name: "Ink", hex: "#111827" },
    { name: "Surface", hex: "#F9FAFB" },
    { name: "Accent", hex: "#16A34A" },
  ],
  typography: {
    family: "Inter",
    weights: "400 / 600 / 700",
  },
  voice: [
    "Pragmatic — no hype, no big promises.",
    "Founder-to-founder — talk like a peer, not a vendor.",
    "Spanglish welcome — Mexican context, English UI for the course.",
    "Numbers over adjectives — show MRR/ARR/score, not 'amazing'.",
  ],
};

export const PERSONA = {
  name: "Carlos Hernandez",
  age: 42,
  business: "Refacciones del Norte",
  industry: "Auto parts wholesale",
  location: "Monterrey, Nuevo Leon",
  size: "Microempresa, 6 employees",
  pains: [
    "Prices off feel, not data.",
    "Just lost a fleet negotiation because the margin was guesswork.",
    "Reads LinkedIn for B2B suppliers and Instagram for shop-floor culture.",
  ],
  trigger:
    "Lost a price negotiation with a fleet customer last week and needs a defensible model before the next one.",
  jtbd:
    "When I quote a fleet client, I want a defensible price built on assumptions I can show, so I do not give up margin without a fight.",
};

export const LANDING_COPY = {
  hero: "Run the diagnosis your SMB is missing.",
  subhero:
    "A ten-minute, AI-native check on your business — strategy, competition, and pricing in one place.",
  bullets: [
    "SWOT in ten minutes, saved to your account.",
    "Benchmark against three competitors and get a 0-100 score.",
    "Model MRR and ARR by tier and segment before you publish a price.",
  ],
  cta: "Try the free diagnosis",
  ctaHref: "/core",
  closing:
    "Built by Mexican founders for Mexican founders. Free to try, no credit card.",
};

export const SOCIAL_POSTS = [
  {
    id: "LI-1",
    channel: "LinkedIn",
    title: "Pricing by feel is not pricing",
    body:
      "Most SMB owners in Mexico price by feel and call it 'experience'. After losing a fleet contract, I built PymeIQ to put a defensible model in front of every quote. Free to try at pymeiq.vercel.app/pricing.",
  },
  {
    id: "LI-2",
    channel: "LinkedIn",
    title: "Lost a fleet contract because my margin was guesswork",
    body:
      "Story: a customer asked for a quote, I rounded to a 'fair' price, and a competitor with a real model won. Built PymeIQ so I never round to fair again. Try the simulator: pymeiq.vercel.app/pricing.",
  },
  {
    id: "LI-3",
    channel: "LinkedIn",
    title: "10-minute SWOT before any big decision",
    body:
      "If you cannot describe your business in four quadrants, you cannot defend a decision. The PymeIQ SWOT runs in ten minutes and writes to your account. Try it at pymeiq.vercel.app/core.",
  },
  {
    id: "LI-4",
    channel: "LinkedIn",
    title: "Benchmark before you launch",
    body:
      "Three competitors, three KPIs, one score from 0 to 100. PymeIQ /research is the cheapest benchmarking exercise you will ever run. Free, no signup.",
  },
  {
    id: "LI-5",
    channel: "LinkedIn",
    title: "MRR is not pricing, MRR is math",
    body:
      "MRR = customers × ARPU × (1 − churn). ARR = MRR × 12. The PymeIQ simulator lets you play with all three numbers in real time, in MXN. pymeiq.vercel.app/pricing.",
  },
  {
    id: "IG-1",
    channel: "Instagram",
    title: "Behind the diagnosis",
    body:
      "Quick reel: opening PymeIQ on the shop floor and running a SWOT in under ten minutes. No login, no credit card. Link in bio.",
  },
  {
    id: "IG-2",
    channel: "Instagram",
    title: "Three numbers your SMB should know",
    body:
      "Customers. ARPU. Churn. Multiply them and you have MRR. Twelve MRRs make ARR. That is the whole story. Try the simulator — link in bio.",
  },
  {
    id: "IG-3",
    channel: "Instagram",
    title: "When the price gets challenged",
    body:
      "Carlos, owner of an auto-parts shop in Monterrey, was about to lose a fleet quote. He opened PymeIQ, modeled the deal, and held the margin. Link in bio.",
  },
  {
    id: "IG-4",
    channel: "Instagram",
    title: "Pricing tier reveal",
    body:
      "Free for one diagnosis. Pro at 499 MXN per month for unlimited diagnoses and the pricing simulator. Business at 2,499 MXN per month for up to five users.",
  },
  {
    id: "IG-5",
    channel: "Instagram",
    title: "Founder note",
    body:
      "PymeIQ started as a Week 1 SWOT generator for an MBA course. Six weeks later it is a real product for Mexican SMBs. Built with Next.js, Tailwind, Supabase, on Vercel.",
  },
];

export const VIDEO_SCRIPTS = [
  {
    id: "VS-1",
    format: "Instagram Reel",
    length: "30 seconds",
    hook: "Three numbers your SMB should know before pricing.",
    beats: [
      "Hook (0-3s): Show shop floor, voice: 'Three numbers your SMB should know.'",
      "Beat 1 (3-12s): Customers — count today.",
      "Beat 2 (12-21s): ARPU — average revenue per customer.",
      "Beat 3 (21-27s): Churn — % who do not return.",
      "CTA (27-30s): Link in bio. Free simulator.",
    ],
  },
  {
    id: "VS-2",
    format: "LinkedIn Carousel",
    length: "7 slides",
    hook: "How I run a 10-minute SWOT on any business.",
    beats: [
      "Slide 1: 10-Minute SWOT — title and promise.",
      "Slide 2: Strengths — what your business already does well.",
      "Slide 3: Weaknesses — be honest, no audience here.",
      "Slide 4: Opportunities — where the market moved.",
      "Slide 5: Threats — what could end this in 12 months.",
      "Slide 6: Save it. Share it. Re-run it monthly.",
      "Slide 7: Try the PymeIQ SWOT, free at pymeiq.vercel.app/core.",
    ],
  },
  {
    id: "VS-3",
    format: "LinkedIn Live",
    length: "5 minutes",
    hook: "Open Q&A: pricing for Mexican PyMEs.",
    beats: [
      "0-30s: Intro, who I am, what we will cover.",
      "30s-2m: Walk through the PymeIQ pricing simulator on screen.",
      "2m-4m: Take live questions on tier mix, ARPU, and churn.",
      "4m-5m: Wrap. Share /pricing link. Invite to follow.",
    ],
  },
];

export const CALENDAR_14_DAYS = [
  { day: "Mon 1", channel: "LinkedIn", asset: "LI-1 Pricing by feel", status: "Ready" },
  { day: "Tue 2", channel: "Instagram", asset: "IG-1 Behind the diagnosis", status: "Ready" },
  { day: "Wed 3", channel: "LinkedIn", asset: "VS-2 Carousel (7 slides)", status: "Draft" },
  { day: "Thu 4", channel: "Instagram", asset: "VS-1 Reel — Three numbers", status: "Draft" },
  { day: "Fri 5", channel: "LinkedIn", asset: "LI-2 Lost a fleet contract", status: "Ready" },
  { day: "Sat 6", channel: "Instagram", asset: "IG-2 Three numbers", status: "Ready" },
  { day: "Sun 7", channel: "—", asset: "Off day — review week 1 KPIs", status: "Note" },
  { day: "Mon 8", channel: "LinkedIn", asset: "LI-3 10-minute SWOT", status: "Ready" },
  { day: "Tue 9", channel: "Instagram", asset: "IG-3 Carlos story", status: "Ready" },
  { day: "Wed 10", channel: "LinkedIn", asset: "VS-3 Live — Pricing Q&A", status: "Draft" },
  { day: "Thu 11", channel: "Instagram", asset: "IG-4 Pricing tier reveal", status: "Draft" },
  { day: "Fri 12", channel: "LinkedIn", asset: "LI-4 Benchmark before launch", status: "Ready" },
  { day: "Sat 13", channel: "Instagram", asset: "IG-5 Founder note", status: "Ready" },
  { day: "Sun 14", channel: "LinkedIn", asset: "LI-5 MRR is math", status: "Ready" },
];

export const AB_HEADLINES = [
  { id: "A", text: "Run the diagnosis your SMB is missing." },
  { id: "B", text: "Stop pricing your SMB by feel. Use the model." },
];
