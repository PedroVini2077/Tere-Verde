import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCachoeiras } from "@/lib/data";
import { deleteCachoeiraAction } from "@/app/admin/actions";
import { StatusAtracaoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Cachoeiras · Painel" };

export default async function AdminCachoeirasPage() {
  const supabase = await createClient();
  const cachoeiras = await getCachoeiras(supabase);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-heading">Cachoeiras</h1>
        <Link
          href="/admin/cachoeiras/novo"
          className="flex items-center gap-1.5 rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          <Icon name="plus" size={16} /> Nova cachoeira
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {cachoeiras.length === 0 && (
          <p className="text-foreground/60">Nenhuma cachoeira cadastrada ainda.</p>
        )}
        {cachoeiras.map((cachoeira) => (
          <div
            key={cachoeira.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
          >
            <div>
              <p className="font-medium text-heading">{cachoeira.nome}</p>
              <div className="mt-1">
                <StatusAtracaoBadge value={cachoeira.status} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={`/admin/cachoeiras/${cachoeira.id}`}
                className="rounded-lg p-2 text-foreground/50 hover:bg-tint hover:text-accent-strong"
                aria-label="Editar"
              >
                <Icon name="edit" size={16} />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteCachoeiraAction(cachoeira.id);
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
