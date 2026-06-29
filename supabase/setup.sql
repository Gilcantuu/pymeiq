-- Week 5 — Supabase setup for PymeIQ Advisor (chat sessions).

create table if not exists public.chat_sessions (
  id              bigserial primary key,
  business_name   text,
  industry        text,
  pain            text,
  recommendation  text,
  rating          text check (rating in ('up', 'down')),
  transcript      jsonb not null,
  saved_at        timestamptz not null default now()
);

create index if not exists chat_sessions_saved_at_idx
  on public.chat_sessions (saved_at desc);

alter table public.chat_sessions enable row level security;

drop policy if exists "chat_sessions_public_insert" on public.chat_sessions;
create policy "chat_sessions_public_insert"
  on public.chat_sessions for insert to anon with check (true);

drop policy if exists "chat_sessions_public_select" on public.chat_sessions;
create policy "chat_sessions_public_select"
  on public.chat_sessions for select to anon using (true);
