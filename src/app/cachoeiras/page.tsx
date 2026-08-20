import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getCachoeiras } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { CachoeiraCard } from "@/components/cachoeira-card";

export const metadata: Metadata = { title: "Cachoeiras" };

export default async function CachoeirasPage() {
  const supabase = await createClient();
  const cachoeiras = await getCachoeiras(supabase);

  return (
    <div>
      <PageHeader
        eyebrow="Ecoturismo"
        title="Cachoeiras"
        description="Quedas d'água e poços naturais em meio à Mata Atlântica preservada, para refrescar depois de uma boa caminhada."
      />
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6">
        {cachoeiras.length === 0 ? (
          <p className="text-foreground/60">Nenhuma cachoeira cadastrada ainda.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cachoeiras.map((cachoeira) => (
              <CachoeiraCard key={cachoeira.id} cachoeira={cachoeira} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
