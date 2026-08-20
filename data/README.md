# Dados

Este diretório documenta a origem dos dados usados pelo Terê Verde Online.
Os dados vivem no banco Postgres do Supabase (não em arquivos estáticos no
repositório); os arquivos aqui servem como referência versionada e permitem
recriar o banco do zero em outro projeto Supabase.

- `schema.sql` — schema completo (tabelas, triggers e políticas de RLS).
- `seed.sql` — dados iniciais de demonstração: as 3 unidades de
  conservação de Teresópolis, trilhas, cachoeiras, espécies de fauna/flora
  e eventos/temporadas.

## Como recriar em um novo projeto Supabase

1. Crie um projeto no [Supabase](https://supabase.com).
2. Rode `schema.sql` no SQL Editor do projeto.
3. Rode `seed.sql` para popular os dados de demonstração.
4. Copie a URL do projeto e a `anon key` para `.env.local` (veja
   `.env.example` na raiz do repositório).

## Conteúdo

Os textos sobre trilhas, cachoeiras e espécies têm caráter ilustrativo e
educativo, com base em informações públicas sobre o Parque Nacional da
Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural
Municipal Montanhas de Teresópolis. Em um cenário real de produção, esse
conteúdo seria mantido pelos administradores das unidades de conservação
através do painel administrativo do site.
