import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getTrilhas } from "@/lib/data";
import { deleteTrilhaAction } from "@/app/admin/actions";
import { DificuldadeBadge, StatusAtracaoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Trilhas · Painel" };

export default async function AdminTrilhasPage() {
  const supabase = await createClient();
  const trilhas = await getTrilhas(supabase);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-forest-900">Trilhas</h1>
        <Link
          href="/admin/trilhas/novo"
          className="flex items-center gap-1.5 rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          <Icon name="plus" size={16} /> Nova trilha
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {trilhas.length === 0 && (
          <p className="text-foreground/60">Nenhuma trilha cadastrada ainda.</p>
        )}
        {trilhas.map((trilha) => (
          <div
            key={trilha.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
          >
            <div>
              <p className="font-medium text-forest-900">{trilha.nome}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <DificuldadeBadge value={trilha.dificuldade} />
                <StatusAtracaoBadge value={trilha.status} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={`/admin/trilhas/${trilha.id}`}
                className="rounded-lg p-2 text-foreground/50 hover:bg-forest-50 hover:text-forest-700"
                aria-label="Editar"
              >
                <Icon name="edit" size={16} />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteTrilhaAction(trilha.id);
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
