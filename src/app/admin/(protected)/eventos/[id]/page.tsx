import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUnidades } from "@/lib/data";
import { EventoForm } from "@/components/admin/evento-form";
import type { Evento } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Editar evento · Painel" };

export default async function EditarEventoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [unidades, { data: evento }] = await Promise.all([
    getUnidades(supabase),
    supabase.from("eventos").select("*").eq("id", id).maybeSingle(),
  ]);

  if (!evento) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">Editar evento</h1>
      <div className="mt-6 max-w-2xl">
        <EventoForm evento={evento as Evento} unidades={unidades} />
      </div>
    </div>
  );
}
