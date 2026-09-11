-- Supabase SQL Editor 에 붙여넣고 실행하세요. (한 번만)

create table public.applications (
  id          bigint generated always as identity primary key,
  name        text not null,
  org_name    text not null,
  phone       text not null,
  email       text not null,
  track       text not null check (track in ('단년도', '다년도')),
  budget      bigint not null check (budget >= 0),
  summary     text not null,
  plan_url    text not null check (plan_url like 'https://%'),
  created_at  timestamptz not null default now()
);

alter table public.applications enable row level security;

-- 누구나 넣을 수 있다 (지원자는 로그인하지 않는다)
create policy "anyone can apply"
  on public.applications for insert
  to anon
  with check (true);

-- select 정책은 일부러 없습니다. 아무도 못 봅니다.
-- 목록 보기는 v3 어드민에서 별도 정책으로 엽니다.
