-- RECYKTRONIX Shop — schemat Supabase
-- Wklej w: Supabase Dashboard → SQL Editor → New query → Run

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_no text not null,
  items jsonb not null,
  total numeric(10,2) not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);
drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

-- Profil tworzony automatycznie przy rejestracji
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Komentarze/opinie (publiczne czytanie, publiczne dodawanie)
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating int not null default 5,
  text text not null,
  created_at timestamptz not null default now()
);
alter table public.comments enable row level security;
drop policy if exists "comments_select_all" on public.comments;
create policy "comments_select_all" on public.comments for select using (true);
drop policy if exists "comments_insert_all" on public.comments;
create policy "comments_insert_all" on public.comments for insert with check (true);

-- Ogłoszenia dodawane przez użytkowników (status: pending -> admin akceptuje)
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  price numeric(10,2) not null,
  category text,
  condition text default 'new',
  description text,
  image text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
alter table public.listings enable row level security;
drop policy if exists "listings_select_public" on public.listings;
create policy "listings_select_public" on public.listings for select using (status = 'approved' or auth.uid() = user_id);
drop policy if exists "listings_insert_own" on public.listings;
create policy "listings_insert_own" on public.listings for insert with check (true);
