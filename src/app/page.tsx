import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getEventos, getTrilhas, getUnidades } from "@/lib/data";
import { Icon } from "@/components/icon";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { StatusEventoBadge } from "@/components/badge";
import { TrilhaCard } from "@/components/trilha-card";
import { formatPeriodoEvento } from "@/lib/format";

export default async function HomePage() {
  const supabase = await createClient();
  const [unidades, trilhas, eventos] = await Promise.all([
    getUnidades(supabase),
    getTrilhas(supabase),
    getEventos(supabase),
  ]);

  const destaques = trilhas.slice(0, 3);
  const proximosEventos = eventos.filter((e) => e.status === "ativo").slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 320 Q150 250 300 300 T600 280 T800 300 V400 H0 Z" fill="#3F855E" opacity="0.5" />
          <path d="M0 360 Q200 300 400 340 T800 330 V400 H0 Z" fill="#63A37B" opacity="0.4" />
        </svg>
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-forest-100">
            Teresópolis · RJ
          </p>
          <h1 className="font-display mt-5 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
            Circuito Terê Verde
          </h1>
          <p className="mt-4 max-w-xl text-base text-forest-100/90 md:text-lg">
            Trilhas, cachoeiras e biodiversidade das três unidades de
            conservação de Teresópolis, reunidos em um só lugar para você
            planejar sua próxima aventura com segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/trilhas"
              className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-400"
            >
              <Icon name="trail" size={18} />
              Explorar trilhas
            </Link>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Icon name="calendar" size={18} />
              Ver eventos e temporadas
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 text-left">
            <div>
              <dt className="text-xs text-forest-200/80">Unidades</dt>
              <dd className="font-display text-2xl font-semibold">{unidades.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-forest-200/80">Trilhas</dt>
              <dd className="font-display text-2xl font-semibold">{trilhas.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-forest-200/80">Eventos ativos</dt>
              <dd className="font-display text-2xl font-semibold">{proximosEventos.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6">
        <h2 className="font-display text-2xl font-semibold text-forest-900 md:text-3xl">
          Unidades de conservação
        </h2>
        <p className="mt-2 max-w-2xl text-foreground/65">
          Três territórios protegidos moldam a paisagem de Teresópolis e
          concentram as principais atrações de ecoturismo da região serrana.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {unidades.map((unidade) => (
            <div
              key={unidade.id}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
            >
              <MediaPlaceholder kind="unidade" icon="mapPin" className="h-36 w-full" />
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-forest-500">
                  {unidade.tipo}
                </p>
                <h3 className="font-display mt-1 text-lg font-semibold text-forest-900">
                  {unidade.nome}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-foreground/65">
                  {unidade.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-forest-900 md:text-3xl">
              Trilhas em destaque
            </h2>
            <Link
              href="/trilhas"
              className="hidden items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700 md:inline-flex"
            >
              Ver todas <Icon name="chevronRight" size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {destaques.map((trilha) => (
              <TrilhaCard key={trilha.id} trilha={trilha} />
            ))}
          </div>

          <Link
            href="/trilhas"
            className="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-forest-600 md:hidden"
          >
            Ver todas as trilhas <Icon name="chevronRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6">
        <h2 className="font-display text-2xl font-semibold text-forest-900 md:text-3xl">
          Próximos eventos e temporadas
        </h2>

        <div className="mt-8 space-y-4">
          {proximosEventos.length === 0 && (
            <p className="text-foreground/60">Nenhum evento ativo no momento.</p>
          )}
          {proximosEventos.map((evento) => (
            <div
              key={evento.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-semibold text-forest-900">
                    {evento.titulo}
                  </h3>
                  <StatusEventoBadge value={evento.status} />
                </div>
                <p className="mt-1 text-sm text-foreground/65">{evento.descricao}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-forest-600">
                <Icon name="calendar" size={16} />
                {formatPeriodoEvento(evento.data_inicio, evento.data_fim)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
