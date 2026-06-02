-- ============================================================
-- Auxilifiers — Technical SEO (tracking scripts, robots, redirects)
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to run multiple times.
-- ============================================================

-- 1) New columns on site_settings: custom head scripts + robots controls
alter table public.site_settings add column if not exists head_scripts   text;
alter table public.site_settings add column if not exists site_indexable boolean not null default true;
alter table public.site_settings add column if not exists robots_extra   text;

-- 2) 301 Redirects
create table if not exists public.redirects (
  id         uuid primary key default gen_random_uuid(),
  from_path  text not null unique,   -- e.g. /old-page
  to_path    text not null,          -- e.g. /new-page  (or full https URL)
  enabled    boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.redirects enable row level security;

-- Public/anon: read only (middleware uses the anon key to look up redirects)
drop policy if exists "public read redirects" on public.redirects;
create policy "public read redirects"
  on public.redirects for select using (true);

-- Logged-in admins: full write
drop policy if exists "auth write redirects" on public.redirects;
create policy "auth write redirects"
  on public.redirects for all to authenticated using (true) with check (true);
