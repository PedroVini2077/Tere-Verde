import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getEventos } from "@/lib/data";
import { deleteEventoAction } from "@/app/admin/actions";
import { StatusEventoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { formatPeriodoEvento } from "@/lib/format";

export const metadata: Metadata = { title: "Eventos · Painel" };

export default async function AdminEventosPage() {
  const supabase = await createClient();
  const eventos = await getEventos(supabase);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-heading">Eventos e temporadas</h1>
        <Link
          href="/admin/eventos/novo"
          className="flex items-center gap-1.5 rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          <Icon name="plus" size={16} /> Novo evento
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {eventos.length === 0 && (
          <p className="text-foreground/60">Nenhum evento cadastrado ainda.</p>
        )}
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
          >
            <div>
              <p className="font-medium text-heading">{evento.titulo}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <StatusEventoBadge value={evento.status} />
                <span className="text-xs text-foreground/55">
                  {formatPeriodoEvento(evento.data_inicio, evento.data_fim)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={`/admin/eventos/${evento.id}`}
                className="rounded-lg p-2 text-foreground/50 hover:bg-tint hover:text-accent-strong"
                aria-label="Editar"
              >
                <Icon name="edit" size={16} />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteEventoAction(evento.id);
                }}
              >
                <button
                  type="submit"
                  aria-label="Excluir"
                  className="rounded-lg p-2 text-foreground/50 hover:bg-danger-100 hover:text-danger-500"
                >
                  <Icon name="trash" size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
