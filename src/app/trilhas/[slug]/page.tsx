import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTrilhaBySlug } from "@/lib/data";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { DificuldadeBadge, StatusAtracaoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { formatDistancia, formatDuracao } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const trilha = await getTrilhaBySlug(supabase, slug);
  return { title: trilha?.nome ?? "Trilha" };
}

export default async function TrilhaDetalhePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const trilha = await getTrilhaBySlug(supabase, slug);

  if (!trilha) notFound();

  const info = [
    { label: "Distância", value: formatDistancia(trilha.distancia_km), icon: "ruler" as const },
    { label: "Duração média", value: formatDuracao(trilha.duracao_media_min), icon: "clock" as const },
    {
      label: "Ganho de altitude",
      value: trilha.altitude_ganho_m ? `${trilha.altitude_ganho_m} m` : "—",
      icon: "trail" as const,
    },
    { label: "Ponto de partida", value: trilha.ponto_partida ?? "—", icon: "mapPin" as const },
  ];

  return (
    <article>
      <MediaPlaceholder kind="trilha" icon="trail" className="h-56 w-full md:h-72" />

      <div className="mx-auto max-w-4xl px-5 py-10 md:px-6">
        <Link
          href="/trilhas"
          className="inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700"
        >
          <Icon name="chevronRight" size={14} className="rotate-180" /> Todas as trilhas
        </Link>

        {trilha.unidades_conservacao && (
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-forest-500">
            {trilha.unidades_conservacao.nome}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold text-forest-900 md:text-4xl">
            {trilha.nome}
          </h1>
          <DificuldadeBadge value={trilha.dificuldade} />
          <StatusAtracaoBadge value={trilha.status} />
        </div>

        <p className="mt-5 max-w-2xl text-foreground/70">{trilha.descricao}</p>

        <dl className="mt-8 grid grid-cols-2 gap-5 rounded-2xl border border-border bg-surface-muted p-5 sm:grid-cols-4">
          {info.map((item) => (
            <div key={item.label}>
              <dt className="flex items-center gap-1.5 text-xs text-foreground/55">
                <Icon name={item.icon} size={14} /> {item.label}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-forest-900">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-100/60 p-4 text-sm text-clay-600">
          <Icon name="info" size={18} className="mt-0.5 shrink-0" />
          <p>
            Condições climáticas podem alterar o acesso às trilhas. Consulte a
            administração do parque antes de ir e leve água, protetor solar e
            calçado adequado.
          </p>
        </div>
      </div>
    </article>
  );
}
