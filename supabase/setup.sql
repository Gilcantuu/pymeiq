-- ============================================================
-- PymeIQ — Week 2 Supabase migration
-- Adds the research_outputs table for the Research + Benchmarking
-- Dashboard at /research.
-- Run this in: Supabase project pymeiq-dev → SQL Editor → New query
-- ============================================================

create table if not exists public.research_outputs (
  id              uuid primary key default gen_random_uuid(),
  industry_focus  text not null,
  geography       text not null,
  hypothesis      text not null,
  notes           text,
  created_at      timestamptz not null default now()
);

create index if not exists research_outputs_created_at_idx
  on public.research_outputs (created_at desc);

alter table public.research_outputs enable row level security;

drop policy if exists "anon_read_research_outputs" on public.research_outputs;
create policy "anon_read_research_outputs"
  on public.research_outputs for select using (true);

drop policy if exists "anon_insert_research_outputs" on public.research_outputs;
create policy "anon_insert_research_outputs"
  on public.research_outputs for insert with check (true);

insert into public.research_outputs
  (industry_focus, geography, hypothesis, notes)
values
  ('Restaurants', 'Mexico',
   'Mexican restaurant owners would pay MXN $300 per diagnostic if results are concrete and local.',
   'Hypothesis to test in Week 4 marketing experiments.'),
  ('Retail', 'Mexico',
   'B2B2C channel via CANACO chambers is cheaper than direct SMB acquisition.',
   'Surfaced by Week 2 human validation conversation.'),
  ('Professional Services', 'LATAM',
   'AI + expert-review tier converts older SMB owners better than AI-only.',
   'Direct outcome of Week 2 risk-map insight on trust gap.');

select count(*) as total_rows from public.research_outputs;
