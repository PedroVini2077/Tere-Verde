import Link from "next/link";
import type { Trilha } from "@/lib/types";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { DificuldadeBadge, StatusAtracaoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { formatDistancia, formatDuracao } from "@/lib/format";

export function TrilhaCard({ trilha }: { trilha: Trilha }) {
  return (
    <Link
      href={`/trilhas/${trilha.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <MediaPlaceholder kind="trilha" icon="trail" className="h-36 w-full" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            {trilha.unidades_conservacao && (
              <p className="text-xs font-medium uppercase tracking-wide text-accent">
                {trilha.unidades_conservacao.nome}
              </p>
            )}
            <h3 className="font-display mt-0.5 text-lg font-semibold text-heading group-hover:text-accent-strong">
              {trilha.nome}
            </h3>
          </div>
          <DificuldadeBadge value={trilha.dificuldade} />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/65">{trilha.descricao}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-foreground/55">
          <span className="flex items-center gap-1">
            <Icon name="ruler" size={14} /> {formatDistancia(trilha.distancia_km)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="clock" size={14} /> {formatDuracao(trilha.duracao_media_min)}
          </span>
          <StatusAtracaoBadge value={trilha.status} />
        </div>
      </div>
    </Link>
  );
}
