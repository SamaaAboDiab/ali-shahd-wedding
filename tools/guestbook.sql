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

-- Every reply (attending or not, number of guests, message), kept private: visitors can add a reply but can't read
-- any back. See them in Table Editor > replies; the email through FormSubmit is a second copy.
create table public.replies (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  attending boolean not null,
  guests smallint not null check (guests between 0 and 5),
  message text check (char_length(message) <= 1000)
);

alter table public.replies enable row level security;

create policy "anyone can send a reply" on public.replies
  for insert to anon with check (true);
