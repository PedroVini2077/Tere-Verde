import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUnidades } from "@/lib/data";
import { CachoeiraForm } from "@/components/admin/cachoeira-form";
import type { Cachoeira } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Editar cachoeira · Painel" };

export default async function EditarCachoeiraPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [unidades, { data: cachoeira }] = await Promise.all([
    getUnidades(supabase),
    supabase.from("cachoeiras").select("*").eq("id", id).maybeSingle(),
  ]);

  if (!cachoeira) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-heading">Editar cachoeira</h1>
      <div className="mt-6 max-w-2xl">
        <CachoeiraForm cachoeira={cachoeira as Cachoeira} unidades={unidades} />
      </div>
    </div>
  );
}
