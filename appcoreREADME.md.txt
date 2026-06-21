# /core route

Generative Core Agent — Week 1 deliverable.

The user fills a 5-field intake form (business name, industry, revenue range, employee count, top challenge). The SWOT generator (`lib/swotGenerator.js`) returns a structured analysis with 3 prioritized actions. The result can be saved to Supabase `core_outputs` table.

The AI output is simulated. The output card displays a "Simulated AI output (mock generator)" badge.
## Week 3 — Product Architecture + Pricing Simulator
   
   - `/product` — feature map (Diagnose, Research, Pricing + Roadmap)
   - `/pricing` — revenue simulator with 3 tiers and 2 segments
   - New Supabase table: `pricing_scenarios`