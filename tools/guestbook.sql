-- Guestbook table for the invitation's "Wishes for the couple" page.
-- Run once in a free Supabase project: SQL Editor > New query > paste this > Run.
-- Visitors can read wishes and add new ones, but can't edit or delete them.
-- To remove a wish, open Table Editor > wishes in the Supabase dashboard and delete its row.

create table public.wishes (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  message text not null check (char_length(trim(message)) between 1 and 1000)
);

alter table public.wishes enable row level security;

create policy "anyone can read wishes" on public.wishes
  for select to anon using (true);

create policy "anyone can add a wish" on public.wishes
  for insert to anon with check (true);
