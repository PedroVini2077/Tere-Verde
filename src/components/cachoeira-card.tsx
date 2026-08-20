import Link from "next/link";
import type { Cachoeira } from "@/lib/types";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { StatusAtracaoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";

export function CachoeiraCard({ cachoeira }: { cachoeira: Cachoeira }) {
  return (
    <Link
      href={`/cachoeiras/${cachoeira.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <MediaPlaceholder kind="cachoeira" icon="waterfall" className="h-36 w-full" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            {cachoeira.unidades_conservacao && (
              <p className="text-xs font-medium uppercase tracking-wide text-accent">
                {cachoeira.unidades_conservacao.nome}
              </p>
            )}
            <h3 className="font-display mt-0.5 text-lg font-semibold text-heading group-hover:text-accent-strong">
              {cachoeira.nome}
            </h3>
          </div>
          <StatusAtracaoBadge value={cachoeira.status} />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/65">{cachoeira.descricao}</p>
        {cachoeira.altura_m && (
          <div className="mt-4 flex items-center gap-1 text-xs text-foreground/55">
            <Icon name="ruler" size={14} /> Queda de {cachoeira.altura_m} m
          </div>
        )}
      </div>
    </Link>
  );
}
