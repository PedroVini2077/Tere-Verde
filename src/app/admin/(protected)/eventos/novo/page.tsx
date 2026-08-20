import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUnidades } from "@/lib/data";
import { EventoForm } from "@/components/admin/evento-form";

export const metadata: Metadata = { title: "Novo evento · Painel" };

export default async function NovoEventoPage() {
  const supabase = await createClient();
  const unidades = await getUnidades(supabase);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-heading">Novo evento</h1>
      <div className="mt-6 max-w-2xl">
        <EventoForm unidades={unidades} />
      </div>
    </div>
  );
}
