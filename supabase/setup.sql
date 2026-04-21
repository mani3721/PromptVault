-- =============================================
-- 1. PROMPTS TABLE
-- =============================================
create table if not exists public.prompts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text not null,
  full_prompt   text not null,
  image_url     text,
  tags          text[] default '{}',
  author_id     uuid references auth.users(id) on delete set null,
  author_name   text,
  author_avatar text,
  likes         integer default 0,
  views         integer default 0,
  copies        integer default 0,
  trending      boolean default false,
  created_at    timestamptz default now()
);

alter table public.prompts enable row level security;

create policy "Public prompts are viewable by everyone"
  on public.prompts for select using (true);

create policy "Authenticated users can insert prompts"
  on public.prompts for insert to authenticated
  with check (auth.uid() = author_id);

create policy "Authors can update their own prompts"
  on public.prompts for update to authenticated
  using (auth.uid() = author_id);


-- =============================================
-- 2. PROMPT LIKES TABLE
-- =============================================
create table if not exists public.prompt_likes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  prompt_id  uuid references public.prompts(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, prompt_id)
);

alter table public.prompt_likes enable row level security;

create policy "Users can see their own likes"
  on public.prompt_likes for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own likes"
  on public.prompt_likes for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete their own likes"
  on public.prompt_likes for delete to authenticated
  using (auth.uid() = user_id);


-- =============================================
-- 3. RPC FUNCTIONS
-- =============================================

-- Toggle like: inserts or deletes from prompt_likes,
-- updates the likes count on prompts.
-- Returns true if now liked, false if unliked.
create or replace function public.toggle_like(p_prompt_id uuid, p_user_id uuid)
returns boolean
language plpgsql
security definer
as $$
declare
  already_liked boolean;
begin
  select exists(
    select 1 from public.prompt_likes
    where prompt_id = p_prompt_id and user_id = p_user_id
  ) into already_liked;

  if already_liked then
    delete from public.prompt_likes
    where prompt_id = p_prompt_id and user_id = p_user_id;
    update public.prompts
    set likes = greatest(0, likes - 1)
    where id = p_prompt_id;
    return false;
  else
    insert into public.prompt_likes (user_id, prompt_id)
    values (p_user_id, p_prompt_id);
    update public.prompts
    set likes = likes + 1
    where id = p_prompt_id;
    return true;
  end if;
end;
$$;

-- Anonymous like/unlike: no user_id needed, SECURITY DEFINER bypasses RLS.
-- p_liked = true  → increment count
-- p_liked = false → decrement count (floor at 0)
create or replace function public.anon_like(p_prompt_id uuid, p_liked boolean)
returns void language sql security definer as $$
  update public.prompts
  set likes = case when p_liked then likes + 1 else greatest(0, likes - 1) end
  where id = p_prompt_id;
$$;

-- Increment views
create or replace function public.increment_views(prompt_id uuid)
returns void language sql security definer as $$
  update public.prompts set views = views + 1 where id = prompt_id;
$$;

-- Increment copies
create or replace function public.increment_copies(prompt_id uuid)
returns void language sql security definer as $$
  update public.prompts set copies = copies + 1 where id = prompt_id;
$$;


-- =============================================
-- 4. STORAGE BUCKET (run once via Dashboard or here)
-- =============================================
insert into storage.buckets (id, name, public)
values ('prompt-images', 'prompt-images', true)
on conflict (id) do nothing;

create policy "Public images are viewable by everyone"
  on storage.objects for select
  using (bucket_id = 'prompt-images');

create policy "Authenticated users can upload images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'prompt-images');
