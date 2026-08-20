import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getEspecies } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { EspecieCard } from "@/components/especie-card";

export const metadata: Metadata = { title: "Biodiversidade" };

export default async function BiodiversidadePage() {
  const supabase = await createClient();
  const especies = await getEspecies(supabase);

  const fauna = especies.filter((e) => e.categoria === "fauna");
  const flora = especies.filter((e) => e.categoria === "flora");

  return (
    <div>
      <PageHeader
        eyebrow="Educação ambiental"
        title="Biodiversidade"
        description="Espécies de fauna e flora que ajudam a contar a história ecológica dos parques de Teresópolis e reforçam a importância da conservação."
      />

      <div className="mx-auto max-w-6xl space-y-12 px-5 py-10 md:px-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-heading">Fauna</h2>
          {fauna.length === 0 ? (
            <p className="mt-3 text-foreground/60">Nenhuma espécie cadastrada ainda.</p>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {fauna.map((especie) => (
                <EspecieCard key={especie.id} especie={especie} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-heading">Flora</h2>
          {flora.length === 0 ? (
            <p className="mt-3 text-foreground/60">Nenhuma espécie cadastrada ainda.</p>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {flora.map((especie) => (
                <EspecieCard key={especie.id} especie={especie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
