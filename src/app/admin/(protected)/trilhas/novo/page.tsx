import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUnidades } from "@/lib/data";
import { TrilhaForm } from "@/components/admin/trilha-form";

export const metadata: Metadata = { title: "Nova trilha · Painel" };

export default async function NovaTrilhaPage() {
  const supabase = await createClient();
  const unidades = await getUnidades(supabase);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-heading">Nova trilha</h1>
      <div className="mt-6 max-w-2xl">
        <TrilhaForm unidades={unidades} />
      </div>
    </div>
  );
}
