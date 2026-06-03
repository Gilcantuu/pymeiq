-- ============================================================
-- PymeIQ — Week 1 Supabase setup
-- Run this in your Supabase project: SQL Editor → New query → paste → Run
-- Project: pymeiq-dev
-- Author: Gilberto Cantu Armas
-- Date: June 2026
-- ============================================================

-- 1) Create the core_outputs table
create table if not exists public.core_outputs (
  id              uuid primary key default gen_random_uuid(),
  business_name   text not null,
  industry        text not null,
  revenue_range   text not null,
  employee_count  integer not null,
  top_challenge   text,
  swot_json       jsonb not null,
  actions_json    jsonb not null,
  created_at      timestamptz not null default now()
);

-- 2) Index for dashboard ordering (last N by created_at)
create index if not exists core_outputs_created_at_idx
  on public.core_outputs (created_at desc);

-- 3) Enable Row Level Security but allow anonymous read/insert for Week 1
--    (Week 1 has no auth; we restrict in a later week.)
alter table public.core_outputs enable row level security;

-- Allow anyone to read
drop policy if exists "anon_read_core_outputs" on public.core_outputs;
create policy "anon_read_core_outputs"
  on public.core_outputs
  for select
  using (true);

-- Allow anyone to insert
drop policy if exists "anon_insert_core_outputs" on public.core_outputs;
create policy "anon_insert_core_outputs"
  on public.core_outputs
  for insert
  with check (true);

-- 4) Seed data (3 sample rows so the dashboard is not empty on first deploy
--    and so we satisfy the Week 0 follow-up: "Supabase table with at least one row")
insert into public.core_outputs
  (business_name, industry, revenue_range, employee_count, top_challenge, swot_json, actions_json)
values
  ('Pizza Don Luis', 'Restaurants', '$5K-$25K', 4,
   'Sales are flat and competitors have aggressive promotions.',
   '{"strengths":["Established local presence","Loyal customer base","Low overhead structure"],"weaknesses":["No digital marketing","Manual accounting","High dependency on owner"],"opportunities":["Online delivery channels","Loyalty program adoption","Local partnerships"],"threats":["Chain competitors","Rising ingredient costs","Talent retention"]}',
   '[{"title":"Launch WhatsApp Business + Instagram presence","impact":"high","timeframe":"2 weeks"},{"title":"Set up basic accounting in a free tool","impact":"medium","timeframe":"1 week"},{"title":"Document operating procedures so business runs without owner","impact":"high","timeframe":"4 weeks"}]'
  ),
  ('Lava Express', 'Professional Services', '< $5K/month', 2,
   'Hard to find new customers; relying only on word of mouth.',
   '{"strengths":["Personal customer relationships","Flexible operating hours","Quick service delivery"],"weaknesses":["No formal sales process","No online presence","Limited service offering"],"opportunities":["Local Google business profile","Referral incentive program","Adjacent service expansion"],"threats":["Newer competitors with apps","Price-sensitive customers","Owner burnout"]}',
   '[{"title":"Create Google Business Profile with photos and reviews","impact":"high","timeframe":"1 week"},{"title":"Launch a simple referral program (give $5, get $5)","impact":"medium","timeframe":"2 weeks"},{"title":"Add one adjacent service to increase revenue per customer","impact":"high","timeframe":"4 weeks"}]'
  ),
  ('Telas Norte', 'Retail', '$25K-$100K', 12,
   'Inventory turns are slow and we have dead stock from last season.',
   '{"strengths":["Wide product range","Strong supplier relationships","Physical store traffic"],"weaknesses":["No inventory analytics","Limited e-commerce","Outdated POS system"],"opportunities":["Online catalog launch","Bundle promotions for dead stock","B2B wholesale segment"],"threats":["Online-only competitors","Currency fluctuation","Seasonal demand swings"]}',
   '[{"title":"Run 30% off bundle promotion to clear dead stock","impact":"high","timeframe":"3 weeks"},{"title":"Launch online catalog with WhatsApp ordering","impact":"high","timeframe":"4 weeks"},{"title":"Implement basic inventory tracking spreadsheet","impact":"medium","timeframe":"2 weeks"}]'
  );

-- 5) Verify
select count(*) as total_rows from public.core_outputs;
select business_name, industry, created_at from public.core_outputs order by created_at desc;
