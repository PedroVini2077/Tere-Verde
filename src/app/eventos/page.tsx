import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getEventos } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { EventoCard } from "@/components/evento-card";

export const metadata: Metadata = { title: "Eventos e temporadas" };

export default async function EventosPage() {
  const supabase = await createClient();
  const eventos = await getEventos(supabase);

  return (
    <div>
      <PageHeader
        eyebrow="Agenda"
        title="Eventos e temporadas"
        description="Datas de visitação recomendadas, mutirões e atividades especiais programadas nas unidades de conservação de Teresópolis."
      />
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-6">
        {eventos.length === 0 ? (
          <p className="text-foreground/60">Nenhum evento cadastrado ainda.</p>
        ) : (
          <div className="space-y-4">
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
