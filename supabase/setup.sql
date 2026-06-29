-- Week 4 — Supabase setup for PymeIQ marketing engine.
-- Run this in Supabase SQL Editor on the existing pymeiq project.

create table if not exists public.marketing_assets (
  id              bigserial primary key,
  variant         text not null check (variant in ('A', 'B')),
  impressions_a   integer not null check (impressions_a >= 0),
  impressions_b   integer not null check (impressions_b >= 0),
  headline        text not null,
  saved_at        timestamptz not null default now()
);

create index if not exists marketing_assets_saved_at_idx
  on public.marketing_assets (saved_at desc);

alter table public.marketing_assets enable row level security;

drop policy if exists "marketing_assets_public_insert" on public.marketing_assets;
create policy "marketing_assets_public_insert"
  on public.marketing_assets for insert to anon with check (true);

drop policy if exists "marketing_assets_public_select" on public.marketing_assets;
create policy "marketing_assets_public_select"
  on public.marketing_assets for select to anon using (true);
