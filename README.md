# Terê Verde Online

MVP mobile desenvolvido para a disciplina de MVP Mobile Development, a
partir da situação-problema **Circuito Terê Verde**.

## Equipe

Trabalho individual.

| Nome |
|------|
| Pedro Vinícios |

## Situação-problema escolhida

**#1 — Circuito Terê Verde.** Criar uma solução digital que permita à
população acessar informações sobre as três unidades de conservação de
Teresópolis (trilhas, cachoeiras, biodiversidade e eventos) de forma
rápida e atualizada pelo celular, com uma área administrativa para
manter o conteúdo em dia.

## O que é o MVP

O Terê Verde Online é um site responsivo, pensado antes de tudo pro uso
no celular, e que pode ser instalado como PWA. Tem duas formas de uso:
quem visita o site (sem precisar de cadastro) navega pelas trilhas e
cachoeiras vendo dificuldade, distância, duração e se estão abertas no
momento, consulta espécies de fauna e flora, e confere eventos e
temporadas com data e horário. Já o administrador entra com login e
tem um painel próprio pra atualizar disponibilidade de trilhas e
cachoeiras, cadastrar eventos e temporadas e publicar avisos pros
visitantes.

Os requisitos funcionais, não-funcionais e o que ficou fora do escopo
estão detalhados em [`docs/REQUISITOS.md`](docs/REQUISITOS.md).

## Stack

Next.js 16 (App Router, Server Components, Server Actions) com
TypeScript no front, Tailwind CSS v4 pra estilização com identidade
visual própria (sem usar biblioteca de componentes pronta), e Supabase
como backend: Postgres com Row Level Security e Supabase Auth pro
login administrativo. É instalável como PWA e os testes usam Vitest
com Testing Library. O deploy roda direto na Vercel, integrado ao
GitHub, então não depende de nenhum servidor local pra ficar no ar.

## Estrutura do repositório

```
src/
  app/            rotas (App Router): páginas públicas e área /admin
  components/     componentes de UI reutilizáveis
  lib/            acesso a dados, tipos, formatação, clientes Supabase
data/             schema.sql, seed.sql e documentação da origem dos dados
docs/             requisitos funcionais/não-funcionais e escopo
test/             testes automatizados (Vitest)
public/           ícones e manifest do PWA
```

## Rodando localmente

Pré-requisito: Node.js 20 ou mais recente.

```bash
npm install
cp .env.example .env.local   # preencha com as credenciais do seu projeto Supabase
npm run dev
```

Acesse `http://localhost:3000`.

### Pelo Termux (Android)

```bash
pkg update && pkg install git nodejs-lts
git clone https://github.com/PedroVini2077/Tere-Verde.git
cd Tere-Verde
npm install
cp .env.example .env.local   # preencha com as credenciais do Supabase
npm run dev -- --hostname 0.0.0.0
```

Abre `http://localhost:3000` no navegador do celular. O script `dev`
já roda com o Webpack em vez do Turbopack, porque o Turbopack ainda não
tem binário nativo pra Android/arm64. Como a produção roda na Vercel,
esse passo local só é necessário mesmo durante o desenvolvimento.

Pra recriar o banco em um projeto Supabase novo, veja
[`data/README.md`](data/README.md).

### Testes

```bash
npm test
```

### Build de produção

```bash
npm run build
npm start
```

## Deploy

O projeto já está publicado e conectado à Vercel: cada push na branch
principal gera um novo deploy automaticamente. Pra publicar em outro
lugar, basta importar o repositório em vercel.com/new e configurar as
variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
com os mesmos valores do `.env.local`.

## Acesso administrativo

O login fica em `/admin/login`. Novos administradores são criados pelo
painel do Supabase (Authentication → Users → Add user); as credenciais
não ficam versionadas no repositório.
