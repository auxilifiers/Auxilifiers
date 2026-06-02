-- ============================================================
-- Auxilifiers — Add X (Twitter) and Threads social links
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
--
-- Adds two columns to the existing site_settings table so the admin
-- can manage X and Threads links. Safe to run multiple times.
-- ============================================================

alter table public.site_settings add column if not exists x       text;
alter table public.site_settings add column if not exists threads text;
