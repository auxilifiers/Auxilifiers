-- ============================================================
-- Auxilifiers Admin — full control panel setup
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to run multiple times.
-- ============================================================

-- ---------- 1) SITE SETTINGS (SEO + contact + social) ----------
create table if not exists public.site_settings (
  id                   smallint primary key default 1,
  meta_title           text,
  meta_title_template  text,
  meta_description     text,
  keywords             text[] not null default '{}',
  contact_email        text,
  whatsapp             text,
  instagram            text,
  facebook             text,
  linkedin             text,
  youtube              text,
  ga_id                text,
  updated_at           timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

alter table public.site_settings enable row level security;

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);

drop policy if exists "auth write settings" on public.site_settings;
create policy "auth write settings" on public.site_settings for all to authenticated using (true) with check (true);

-- Seed the single row with the site's current values (only if it doesn't exist yet)
insert into public.site_settings
  (id, meta_title, meta_title_template, meta_description, keywords, contact_email, whatsapp, instagram, facebook, linkedin, youtube, ga_id)
values (
  1,
  'Auxilifiers — Orbiting around your success.',
  '%s | Auxilifiers',
  'Auxilifiers is a tech and growth agency for ambitious small and mid-size businesses. We build the tech, automate the operations, and grow the reach — websites, AI automation, SEO, and ads, all under one roof.',
  '{"tech agency Pakistan","web development","AI automation","chatbots","voice AI agents","SEO agency","Google Ads","Meta Ads","Shopify development","mobile app development"}',
  'info@auxilifiers.com',
  'https://wa.me/923190809171',
  'https://www.instagram.com/auxilifires',
  'https://web.facebook.com/profile.php?id=61590733731265',
  'https://www.linkedin.com/company/auxilifiers',
  '',
  'G-EPCBPTTJBL'
)
on conflict (id) do nothing;


-- ---------- 2) TESTIMONIALS moderation ----------
alter table public.testimonials add column if not exists hidden boolean not null default false;
alter table public.testimonials enable row level security;

drop policy if exists "anon read testimonials" on public.testimonials;
create policy "anon read testimonials" on public.testimonials for select using (true);

drop policy if exists "anon insert testimonials" on public.testimonials;
create policy "anon insert testimonials" on public.testimonials for insert with check (true);

drop policy if exists "auth update testimonials" on public.testimonials;
create policy "auth update testimonials" on public.testimonials for update to authenticated using (true) with check (true);

drop policy if exists "auth delete testimonials" on public.testimonials;
create policy "auth delete testimonials" on public.testimonials for delete to authenticated using (true);


-- ---------- 3) CONTACT SUBMISSIONS (leads inbox) ----------
alter table public.contact_submissions enable row level security;

drop policy if exists "anon insert contacts" on public.contact_submissions;
create policy "anon insert contacts" on public.contact_submissions for insert with check (true);

drop policy if exists "auth read contacts" on public.contact_submissions;
create policy "auth read contacts" on public.contact_submissions for select to authenticated using (true);

drop policy if exists "auth delete contacts" on public.contact_submissions;
create policy "auth delete contacts" on public.contact_submissions for delete to authenticated using (true);


-- ---------- 4) STORAGE: blog image uploads (bucket: blog-images) ----------
drop policy if exists "public read blog-images" on storage.objects;
create policy "public read blog-images" on storage.objects for select using (bucket_id = 'blog-images');

drop policy if exists "auth upload blog-images" on storage.objects;
create policy "auth upload blog-images" on storage.objects for insert to authenticated with check (bucket_id = 'blog-images');

drop policy if exists "auth update blog-images" on storage.objects;
create policy "auth update blog-images" on storage.objects for update to authenticated using (bucket_id = 'blog-images');

drop policy if exists "auth delete blog-images" on storage.objects;
create policy "auth delete blog-images" on storage.objects for delete to authenticated using (bucket_id = 'blog-images');
