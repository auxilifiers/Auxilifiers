-- ============================================================
-- Auxilifiers Blog — Supabase setup
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1) Table
create table if not exists public.blog_posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  excerpt     text,
  content     text not null default '',
  cover_image text,
  tags        text[] not null default '{}',
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Helpful index for slug lookups
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

-- 2) Row Level Security
alter table public.blog_posts enable row level security;

-- Public visitors: can read ONLY published posts
drop policy if exists "public read published" on public.blog_posts;
create policy "public read published"
  on public.blog_posts
  for select
  using (published = true);

-- Logged-in admins: full read/write (drafts + everything)
drop policy if exists "authenticated full access" on public.blog_posts;
create policy "authenticated full access"
  on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);
