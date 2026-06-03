# supabase/

SQL setup for the PymeIQ Supabase project.

Run `setup.sql` in your Supabase project (SQL Editor → New query → paste → Run) before the first deploy. The script creates the `core_outputs` table, sets up Row-Level Security policies for anon read/insert, and seeds 3 sample diagnostics so the /dashboard route is not empty on first visit.