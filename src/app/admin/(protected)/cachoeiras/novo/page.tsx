import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUnidades } from "@/lib/data";
import { CachoeiraForm } from "@/components/admin/cachoeira-form";

export const metadata: Metadata = { title: "Nova cachoeira · Painel" };

export default async function NovaCachoeiraPage() {
  const supabase = await createClient();
  const unidades = await getUnidades(supabase);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-heading">Nova cachoeira</h1>
      <div className="mt-6 max-w-2xl">
        <CachoeiraForm unidades={unidades} />
      </div>
    </div>
  );
}
