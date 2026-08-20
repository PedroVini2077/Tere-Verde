import type { Evento } from "@/lib/types";
import { StatusEventoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { formatHorario, formatPeriodoEvento } from "@/lib/format";

export function EventoCard({ evento }: { evento: Evento }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            {evento.tipo === "temporada" ? "Temporada" : "Evento"}
            {evento.unidades_conservacao ? ` · ${evento.unidades_conservacao.nome}` : ""}
          </p>
          <h3 className="font-display mt-0.5 text-lg font-semibold text-heading">
            {evento.titulo}
          </h3>
        </div>
        <StatusEventoBadge value={evento.status} />
      </div>
      <p className="mt-2 text-sm text-foreground/65">{evento.descricao}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-foreground/55">
        <span className="flex items-center gap-1">
          <Icon name="calendar" size={14} />
          {formatPeriodoEvento(evento.data_inicio, evento.data_fim)}
        </span>
        {evento.horario_abertura && (
          <span className="flex items-center gap-1">
            <Icon name="clock" size={14} />
            {formatHorario(evento.horario_abertura)} – {formatHorario(evento.horario_fechamento)}
          </span>
        )}
      </div>
    </div>
  );
}
