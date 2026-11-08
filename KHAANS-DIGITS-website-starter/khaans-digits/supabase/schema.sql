-- Run this in Supabase SQL Editor.
-- Auth users are managed by Supabase Auth. Never store plaintext passwords.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  service_type text not null check (service_type in ('Wishes Card','3D Website')),
  customer_name text not null,
  whatsapp text not null,
  email text not null,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'New Order' check (status in ('New Order','Under Discussion','Payment Pending','Payment Received','In Progress','Revision Required','Completed','Cancelled')),
  quoted_amount numeric(12,2),
  payment_method text,
  payment_reference text,
  payment_verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;

create policy "Users read own profile" on public.profiles for select
  using (auth.uid() = id);
create policy "Users create own profile" on public.profiles for insert
  with check (auth.uid() = id and role = 'customer');
create policy "Users update own profile" on public.profiles for update
  using (auth.uid() = id) with check (auth.uid() = id and role = 'customer');

create policy "Customers read own orders" on public.orders for select
  using (auth.uid() = user_id);
create policy "Customers create orders" on public.orders for insert
  with check (auth.uid() = user_id or user_id is null);

-- Admin-only policies should be added only after securely assigning your own
-- profile.role='admin' from the SQL editor. Do not allow users to set their own role.
-- Example admin SELECT policy:
create policy "Admins read all orders" on public.orders for select
  using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
create policy "Admins update orders" on public.orders for update
  using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles(id, full_name) values(new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- After creating your account, promote your own user using the SQL editor:
-- update public.profiles set role='admin' where id='YOUR-AUTH-USER-UUID';
