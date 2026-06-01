-- ============================================================
-- Auxilifiers — SECURITY HARDENING
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
--
-- Why: previously ANY logged-in (authenticated) user had admin rights.
-- With public sign-ups enabled, an attacker could register and gain access.
-- This locks all admin actions to an explicit allow-list of admin user IDs.
--
-- ALSO REQUIRED (dashboard): Authentication → Sign In / Providers → Email
--   → turn OFF "Allow new users to sign up".
-- ============================================================

-- 1) Admin allow-list + helper
create table if not exists public.admins (
  user_id uuid primary key,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

drop policy if exists "admins self read" on public.admins;
create policy "admins self read" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- Seed the current admin (auxilifiers@gmail.com)
insert into public.admins (user_id)
values ('cc8e1cb0-db05-4561-8e24-d40388146077')
on conflict do nothing;

create or replace function public.is_admin()
  returns boolean
  language sql
  security definer
  stable
  set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- 2) blog_posts — only admins can write (public still reads published)
drop policy if exists "authenticated full access" on public.blog_posts;
drop policy if exists "admin write blog" on public.blog_posts;
create policy "admin write blog" on public.blog_posts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- 3) testimonials — only admins moderate
drop policy if exists "auth update testimonials" on public.testimonials;
create policy "auth update testimonials" on public.testimonials
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "auth delete testimonials" on public.testimonials;
create policy "auth delete testimonials" on public.testimonials
  for delete to authenticated using (public.is_admin());

-- 4) contact_submissions (leads) — only admins read/delete
drop policy if exists "auth read contacts" on public.contact_submissions;
create policy "auth read contacts" on public.contact_submissions
  for select to authenticated using (public.is_admin());
drop policy if exists "auth delete contacts" on public.contact_submissions;
create policy "auth delete contacts" on public.contact_submissions
  for delete to authenticated using (public.is_admin());

-- 5) site_settings — only admins write (public still reads)
drop policy if exists "auth write settings" on public.site_settings;
create policy "auth write settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- 6) storage (blog-images) — only admins upload/update/delete (public still reads)
drop policy if exists "auth upload blog-images" on storage.objects;
create policy "auth upload blog-images" on storage.objects
  for insert to authenticated with check (bucket_id = 'blog-images' and public.is_admin());
drop policy if exists "auth update blog-images" on storage.objects;
create policy "auth update blog-images" on storage.objects
  for update to authenticated using (bucket_id = 'blog-images' and public.is_admin());
drop policy if exists "auth delete blog-images" on storage.objects;
create policy "auth delete blog-images" on storage.objects
  for delete to authenticated using (bucket_id = 'blog-images' and public.is_admin());
