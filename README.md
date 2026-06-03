# PymeIQ

> AI diagnostic for SMBs in Latin America.
> Course project for AI-101: Free-Stack Agentic Builder Studio — Negocios Inteligentes.
> Student: Gilberto Cantú Armas. Instructor: MBA Patricia Navarro.

PymeIQ helps SMB owners diagnose their business in 10 minutes by answering 5 quick questions. It returns a structured SWOT analysis with 3 prioritized action recommendations.

This repository contains the Week 1 deliverable: the Generative Core Agent at /core.

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| UI | Tailwind CSS 3 |
| Hosting | Vercel (free tier) |
| Repository | GitHub |
| Database | Supabase (free tier) |
| AI generation | Simulated / mock generator in lib/swotGenerator.js (no real LLM call) |
| Language | JavaScript (ES2022) |

The course is in English; all UI, code comments, and commit messages are in English.

---

## Local setup

### 1. Prerequisites
- Node.js 20.x or higher (node -v)
- npm 10+ (npm -v)
- GitHub account (linked to the repo)
- Vercel account (linked to GitHub)
- Supabase account (with project provisioned)

### 2. Clone and install
git clone https://github.com/Gilcantuu/pymeiq.git
cd pymeiq
npm install

### 3. Environment variables
cp .env.example .env.local

Edit .env.local with values from Supabase → Settings → API:
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000

### 4. Create the Supabase table
In your Supabase project: SQL Editor → New query, paste the contents of supabase/setup.sql, and click Run.

### 5. Run dev server
npm run dev
Open http://localhost:3000.

---

## Project structure

pymeiq/
- app/
  - layout.js (Root layout with Navbar and Footer)
  - page.js (Homepage)
  - globals.css (Tailwind base)
  - core/page.js (/core — SWOT generator)
  - dashboard/page.js (/dashboard — last 5 saved diagnostics)
  - docs/page.js (/docs — prompt library)
- components/
  - Navbar.js
  - Footer.js
  - Hero.js
  - HowItWorks.js
  - Roadmap.js
  - TechStack.js
  - SwotForm.js (Controlled intake form)
  - SwotCard.js (SWOT output renderer)
- lib/
  - supabaseClient.js (Supabase JS client singleton)
  - swotGenerator.js (Deterministic mock generator)
- supabase/
  - setup.sql (Table + RLS + seed data)
- .env.example
- .gitignore
- next.config.js
- package.json
- postcss.config.js
- tailwind.config.js
- README.md

---

## Important note on AI

The Week 1 generator is a deterministic mock function (lib/swotGenerator.js). It does not call any external LLM. The SWOT output card prominently displays a badge that reads "Simulated AI output (mock generator)" to keep the educational nature of the demo transparent. Real LLM integration is deferred to a later week to keep this week's scope tight and cost at zero.

---

## Roadmap

| Week | Deliverable | Status |
| --- | --- | --- |
| Week 0 | Setup infrastructure | Completed |
| Week 1 | Generative Core Agent (SWOT mock) | In progress |
| Week 2 | Research + Benchmarking Dashboard | Upcoming |
| Week 3 | Pricing simulator | Upcoming |
| Week 4 | Marketing engine + landing upgrade | Upcoming |
| Week 5 | Public chatbot / guided assistant | Upcoming |
| Week 6 | Integrated agentic venture | Upcoming |

---

## License

Educational project — © 2026 Gilberto Cantú Armas.

_Last update: June 2026 — Week 1 Generative Core Agent shipped._