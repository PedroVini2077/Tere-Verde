import type { Especie } from "@/lib/types";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CategoriaBadge } from "@/components/badge";

export function EspecieCard({ especie }: { especie: Especie }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <MediaPlaceholder
        kind="especie"
        icon={especie.categoria === "fauna" ? "leaf" : "leaf"}
        className="h-32 w-full"
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-forest-900">
              {especie.nome_popular}
            </h3>
            {especie.nome_cientifico && (
              <p className="text-sm italic text-foreground/55">{especie.nome_cientifico}</p>
            )}
          </div>
          <CategoriaBadge value={especie.categoria} />
        </div>
        <p className="mt-2 text-sm text-foreground/65">{especie.descricao}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-foreground/55">
          {especie.unidades_conservacao && <span>{especie.unidades_conservacao.nome}</span>}
          {especie.estado_conservacao && (
            <span className="rounded-full bg-surface-muted px-2 py-0.5">
              {especie.estado_conservacao}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
