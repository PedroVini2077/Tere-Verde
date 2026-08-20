# Terê Verde Online

MVP mobile (web app responsivo/PWA) desenvolvido para a disciplina de
**MVP Mobile Development**, a partir da situação-problema **Circuito Terê
Verde**.

Guia digital do ecoturismo de Teresópolis (RJ): trilhas, cachoeiras,
biodiversidade e eventos/temporadas das três unidades de conservação do
município — Parque Nacional da Serra dos Órgãos, Parque Estadual dos
Três Picos e Parque Natural Municipal Montanhas de Teresópolis.

## Equipe

Trabalho individual.

| Nome |
|------|
| Pedro Vinícios |

## Situação-problema escolhida

**#1 — Circuito Terê Verde.** Criar uma solução digital que permita à
população acessar informações sobre as três unidades de conservação de
Teresópolis e seus atrativos (trilhas, cachoeiras, biodiversidade e
eventos) de forma rápida, atualizada e acessível pelo celular, com uma
área administrativa para manter o conteúdo em dia.

## Descrição do MVP

O **Terê Verde Online** é um site responsivo, mobile-first e instalável
como PWA, com dois perfis de uso:

- **Visitante** (sem login): navega pela lista de trilhas e cachoeiras
  com dificuldade, distância, duração e disponibilidade; consulta
  espécies de fauna e flora; confere eventos e temporadas com datas e
  horários de funcionamento.
- **Administrador** (autenticado): gerencia a disponibilidade das
  trilhas e cachoeiras, cadastra/edita/remove eventos e temporadas com
  seus horários, e publica novidades para os visitantes — tudo por um
  painel próprio protegido por login.

Requisitos detalhados (funcionais, não-funcionais e escopo) estão em
[`docs/REQUISITOS.md`](docs/REQUISITOS.md).

## Stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Server Components e
  Server Actions) + TypeScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** com um sistema de
  design próprio (paleta de tons de mata, tipografia serifada +
  humanista, ícones desenhados sob medida)
- **[Supabase](https://supabase.com/)** como backend: Postgres com Row
  Level Security (leitura pública, escrita restrita a administradores
  autenticados) e Supabase Auth para o login administrativo
- **PWA** instalável (manifest + ícones), pensado para uso em
  smartphones
- **[Vitest](https://vitest.dev/)** + Testing Library para os testes
- Deploy contínuo na **[Vercel](https://vercel.com/)**, integrada ao
  GitHub — sem depender de servidor local

## Estrutura do repositório

```
src/
  app/            # rotas (App Router): páginas públicas e área /admin
  components/     # componentes de UI reutilizáveis
  lib/            # acesso a dados, tipos, formatação, clientes Supabase
data/             # schema.sql, seed.sql e documentação da origem dos dados
docs/             # requisitos funcionais/não-funcionais e escopo
test/             # testes automatizados (Vitest)
public/           # ícones, manifest PWA
```

## Rodando localmente

Pré-requisitos: Node.js 20+.

```bash
npm install
cp .env.example .env.local   # preencha com as credenciais do seu projeto Supabase
npm run dev
```

Acesse `http://localhost:3000`.

### Desenvolvendo pelo Termux (Android)

```bash
pkg update && pkg install git nodejs-lts
git clone https://github.com/PedroVini2077/Tere-Verde.git
cd Tere-Verde
git checkout claude/college-mvp-project-w7b89x
npm install
cp .env.example .env.local   # preencha com as credenciais do Supabase
npm run dev -- --hostname 0.0.0.0
```

Abra `http://localhost:3000` no navegador do celular. O deploy em
produção roda na Vercel (veja abaixo), então rodar localmente no Termux
só é necessário durante o desenvolvimento.

Para recriar o banco de dados em um novo projeto Supabase, veja
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

O projeto está pronto para deploy contínuo na Vercel: basta importar
este repositório em [vercel.com/new](https://vercel.com/new) e
configurar as variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e
`NEXT_PUBLIC_SUPABASE_ANON_KEY` (mesmos valores do `.env.local`). Cada
push na branch principal gera um novo deploy automaticamente, sem
depender de um servidor local.

## Acesso administrativo

O login fica em `/admin/login`. Novos administradores são criados pelo
painel do Supabase Auth (Authentication → Users → Add user) do projeto —
as credenciais não são versionadas no repositório por segurança.
