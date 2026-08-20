import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getCachoeiras, getEventos, getNovidades, getTrilhas } from "@/lib/data";
import { createNovidadeAction, deleteNovidadeAction } from "@/app/admin/actions";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Painel administrativo" };

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [trilhas, cachoeiras, eventos, novidades] = await Promise.all([
    getTrilhas(supabase),
    getCachoeiras(supabase),
    getEventos(supabase),
    getNovidades(supabase, 10),
  ]);

  const stats = [
    { label: "Trilhas", value: trilhas.length, icon: "trail" as const },
    { label: "Cachoeiras", value: cachoeiras.length, icon: "waterfall" as const },
    { label: "Eventos ativos", value: eventos.filter((e) => e.status === "ativo").length, icon: "calendar" as const },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">
        Olá, {user?.email?.split("@")[0]}
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        Gerencie a disponibilidade das trilhas, cachoeiras e eventos, e publique novidades para os visitantes.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-surface p-5">
            <Icon name={stat.icon} size={18} className="text-forest-500" />
            <p className="font-display mt-2 text-2xl font-semibold text-forest-900">
              {stat.value}
            </p>
            <p className="text-sm text-foreground/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-display text-lg font-semibold text-forest-900">Publicar novidade</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Avisos rápidos para os visitantes, exibidos no site.
        </p>
        <form action={createNovidadeAction} className="mt-4 space-y-3">
          <input
            name="titulo"
            required
            placeholder="Título"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
          />
          <textarea
            name="conteudo"
            required
            rows={3}
            placeholder="Conteúdo"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
          />
          <button
            type="submit"
            className="rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
          >
            Publicar
          </button>
        </form>

        {novidades.length > 0 && (
          <ul className="mt-6 space-y-3 border-t border-border pt-5">
            {novidades.map((novidade) => (
              <li key={novidade.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-forest-900">{novidade.titulo}</p>
                  <p className="text-sm text-foreground/60">{novidade.conteudo}</p>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await deleteNovidadeAction(novidade.id);
                  }}
                >
                  <button
                    type="submit"
                    aria-label="Excluir novidade"
                    className="rounded-lg p-1.5 text-foreground/40 hover:bg-danger-100 hover:text-danger-500"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
