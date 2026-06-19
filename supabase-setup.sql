-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)

create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  role text default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now()
);

create table if not exists answers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  country text not null,
  category_id integer not null,
  answer_text text default '',
  updated_at timestamptz default now(),
  unique(user_id, country, category_id)
);

create table if not exists selected_countries (
  user_id uuid references profiles(id) on delete cascade primary key,
  countries text[] not null default '{}'
);

-- Row Level Security
alter table profiles enable row level security;
alter table answers enable row level security;
alter table selected_countries enable row level security;

-- Profiles: users can read/update their own; admins can read all
create policy "own profile" on profiles for all using (auth.uid() = id);
create policy "admin read all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Answers: users own their answers; admins can read all
create policy "own answers" on answers for all using (auth.uid() = user_id);
create policy "admin read answers" on answers for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Selected countries: users own their selection
create policy "own countries" on selected_countries for all using (auth.uid() = user_id);
