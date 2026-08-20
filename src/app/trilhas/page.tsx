import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getTrilhas } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { TrilhaCard } from "@/components/trilha-card";

export const metadata: Metadata = { title: "Trilhas" };

export default async function TrilhasPage() {
  const supabase = await createClient();
  const trilhas = await getTrilhas(supabase);

  return (
    <div>
      <PageHeader
        eyebrow="Ecoturismo"
        title="Trilhas"
        description="Do passeio leve em família à travessia de montanha de vários dias: conheça as trilhas das três unidades de conservação de Teresópolis."
      />
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6">
        {trilhas.length === 0 ? (
          <p className="text-foreground/60">Nenhuma trilha cadastrada ainda.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trilhas.map((trilha) => (
              <TrilhaCard key={trilha.id} trilha={trilha} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
