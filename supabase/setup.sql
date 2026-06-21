-- Week 3 — Supabase setup for PymeIQ pricing simulator.
-- Run this in Supabase SQL Editor on the existing project.
-- Same project as Weeks 1 and 2 (swot_outputs, research_outputs).

-- 1. Table
create table if not exists public.pricing_scenarios (
  id          bigserial primary key,
  segment     text not null check (segment in ('Microempresa', 'PyME')),
  tier        text not null check (tier in ('Free', 'Pro', 'Business')),
  customers   integer not null check (customers >= 0 and customers <= 100000),
  arpu        numeric(12, 2) not null check (arpu >= 0),
  churn       numeric(5, 2) not null check (churn >= 0 and churn <= 50),
  mrr         numeric(14, 2) not null,
  arr         numeric(14, 2) not null,
  created_at  timestamptz not null default now()
);

-- 2. Index for the "last 10 by segment" query.
create index if not exists pricing_scenarios_segment_created_at_idx
  on public.pricing_scenarios (segment, created_at desc);

-- 3. RLS — same pattern as Weeks 1 and 2: public insert + public select.
alter table public.pricing_scenarios enable row level security;

drop policy if exists "pricing_scenarios_public_insert" on public.pricing_scenarios;
create policy "pricing_scenarios_public_insert"
  on public.pricing_scenarios
  for insert
  to anon
  with check (true);

drop policy if exists "pricing_scenarios_public_select" on public.pricing_scenarios;
create policy "pricing_scenarios_public_select"
  on public.pricing_scenarios
  for select
  to anon
  using (true);

-- 4. Seed (optional). Uncomment to populate two example rows for the demo.
-- insert into public.pricing_scenarios (segment, tier, customers, arpu, churn, mrr, arr) values
--   ('Microempresa', 'Pro',      800, 499,   5, 379240,   4550880),
--   ('PyME',         'Business', 120, 2499,  3, 290884,   3490608);
