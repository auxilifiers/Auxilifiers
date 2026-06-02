-- ============================================================
-- Auxilifiers — Per-page SEO overrides
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
--
-- Stores ADMIN OVERRIDES per page (keyed by path). Code defaults in
-- lib/page-seo.ts apply when no row exists, so SEO keeps working
-- even before this table has any data.
-- ============================================================

create table if not exists public.page_seo (
  path             text primary key,        -- "/", "/about", "/build", ...
  meta_title       text,
  meta_description text,
  keywords         text[] not null default '{}',
  og_title         text,
  og_description   text,
  og_image         text,
  canonical        text,
  noindex          boolean not null default false,
  custom_schema    jsonb,                    -- optional extra JSON-LD
  updated_at       timestamptz not null default now()
);

alter table public.page_seo enable row level security;

-- Public/anon: read only (needed so the live site can render SEO)
drop policy if exists "public read page_seo" on public.page_seo;
create policy "public read page_seo"
  on public.page_seo for select using (true);

-- Logged-in admins: full write. If you ran security_hardening.sql and
-- have public.is_admin(), prefer the admin-guarded version below.
drop policy if exists "auth write page_seo" on public.page_seo;
create policy "auth write page_seo"
  on public.page_seo for all to authenticated using (true) with check (true);

-- ---- Optional hardening (uncomment if public.is_admin() exists) ----
-- drop policy if exists "auth write page_seo" on public.page_seo;
-- create policy "admin write page_seo"
--   on public.page_seo for all to authenticated
--   using (public.is_admin()) with check (public.is_admin());
