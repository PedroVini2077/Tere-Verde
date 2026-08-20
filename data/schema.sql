-- Schema do banco de dados do Terê Verde Online
-- Aplicado no Supabase (Postgres) do projeto via migrations.
-- Este arquivo é a referência versionada do schema em produção.

create extension if not exists "pgcrypto";

-- Unidades de conservação (os 3 parques)
create table public.unidades_conservacao (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text not null unique,
  tipo text not null, -- Parque Nacional, Parque Estadual, Parque Natural Municipal
  descricao text not null,
  area_km2 numeric,
  imagem_url text,
  created_at timestamptz not null default now()
);

-- Trilhas
create table public.trilhas (
  id uuid primary key default gen_random_uuid(),
  unidade_id uuid references public.unidades_conservacao(id) on delete set null,
  nome text not null,
  slug text not null unique,
  descricao text not null,
  dificuldade text not null check (dificuldade in ('leve','moderada','dificil','extrema')),
  distancia_km numeric,
  duracao_media_min integer,
  altitude_ganho_m integer,
  ponto_partida text,
  status text not null default 'aberta' check (status in ('aberta','fechada','manutencao')),
  imagem_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Cachoeiras
create table public.cachoeiras (
  id uuid primary key default gen_random_uuid(),
  unidade_id uuid references public.unidades_conservacao(id) on delete set null,
  nome text not null,
  slug text not null unique,
  descricao text not null,
  altura_m numeric,
  acesso text,
  status text not null default 'aberta' check (status in ('aberta','fechada','manutencao')),
  imagem_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Biodiversidade (fauna e flora)
create table public.especies (
  id uuid primary key default gen_random_uuid(),
  unidade_id uuid references public.unidades_conservacao(id) on delete set null,
  nome_popular text not null,
  nome_cientifico text,
  categoria text not null check (categoria in ('fauna','flora')),
  descricao text not null,
  estado_conservacao text,
  imagem_url text,
  created_at timestamptz not null default now()
);

-- Eventos e temporadas
create table public.eventos (
  id uuid primary key default gen_random_uuid(),
  unidade_id uuid references public.unidades_conservacao(id) on delete set null,
  titulo text not null,
  descricao text not null,
  tipo text not null check (tipo in ('evento','temporada')),
  data_inicio date not null,
  data_fim date,
  horario_abertura time,
  horario_fechamento time,
  status text not null default 'ativo' check (status in ('ativo','cancelado','encerrado')),
  imagem_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Novidades / avisos do admin
create table public.novidades (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  conteudo text not null,
  autor_id uuid references auth.users(id) on delete set null,
  publicado_em timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_trilhas_updated_at before update on public.trilhas
  for each row execute function public.set_updated_at();
create trigger trg_cachoeiras_updated_at before update on public.cachoeiras
  for each row execute function public.set_updated_at();
create trigger trg_eventos_updated_at before update on public.eventos
  for each row execute function public.set_updated_at();

-- RLS: leitura pública, escrita restrita a administradores autenticados
alter table public.unidades_conservacao enable row level security;
alter table public.trilhas enable row level security;
alter table public.cachoeiras enable row level security;
alter table public.especies enable row level security;
alter table public.eventos enable row level security;
alter table public.novidades enable row level security;

create policy "public read unidades" on public.unidades_conservacao for select using (true);
create policy "public read trilhas" on public.trilhas for select using (true);
create policy "public read cachoeiras" on public.cachoeiras for select using (true);
create policy "public read especies" on public.especies for select using (true);
create policy "public read eventos" on public.eventos for select using (true);
create policy "public read novidades" on public.novidades for select using (true);

create policy "admin write unidades" on public.unidades_conservacao for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write trilhas" on public.trilhas for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write cachoeiras" on public.cachoeiras for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write especies" on public.especies for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write eventos" on public.eventos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write novidades" on public.novidades for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
