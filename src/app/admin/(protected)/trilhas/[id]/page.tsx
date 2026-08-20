import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUnidades } from "@/lib/data";
import { TrilhaForm } from "@/components/admin/trilha-form";
import type { Trilha } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Editar trilha · Painel" };

export default async function EditarTrilhaPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [unidades, { data: trilha }] = await Promise.all([
    getUnidades(supabase),
    supabase.from("trilhas").select("*").eq("id", id).maybeSingle(),
  ]);

  if (!trilha) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-forest-900">Editar trilha</h1>
      <div className="mt-6 max-w-2xl">
        <TrilhaForm trilha={trilha as Trilha} unidades={unidades} />
      </div>
    </div>
  );
}
