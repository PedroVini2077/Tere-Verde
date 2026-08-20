import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCachoeiraBySlug } from "@/lib/data";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { StatusAtracaoBadge } from "@/components/badge";
import { Icon } from "@/components/icon";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const cachoeira = await getCachoeiraBySlug(supabase, slug);
  return { title: cachoeira?.nome ?? "Cachoeira" };
}

export default async function CachoeiraDetalhePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const cachoeira = await getCachoeiraBySlug(supabase, slug);

  if (!cachoeira) notFound();

  return (
    <article>
      <MediaPlaceholder kind="cachoeira" icon="waterfall" className="h-56 w-full md:h-72" />

      <div className="mx-auto max-w-4xl px-5 py-10 md:px-6">
        <Link
          href="/cachoeiras"
          className="inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700"
        >
          <Icon name="chevronRight" size={14} className="rotate-180" /> Todas as cachoeiras
        </Link>

        {cachoeira.unidades_conservacao && (
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-forest-500">
            {cachoeira.unidades_conservacao.nome}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold text-forest-900 md:text-4xl">
            {cachoeira.nome}
          </h1>
          <StatusAtracaoBadge value={cachoeira.status} />
        </div>

        <p className="mt-5 max-w-2xl text-foreground/70">{cachoeira.descricao}</p>

        <dl className="mt-8 grid grid-cols-2 gap-5 rounded-2xl border border-border bg-surface-muted p-5 sm:grid-cols-2">
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-foreground/55">
              <Icon name="ruler" size={14} /> Altura da queda
            </dt>
            <dd className="mt-1 font-display text-lg font-semibold text-forest-900">
              {cachoeira.altura_m ? `${cachoeira.altura_m} m` : "—"}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-foreground/55">
              <Icon name="mapPin" size={14} /> Acesso
            </dt>
            <dd className="mt-1 text-sm font-medium text-forest-900">
              {cachoeira.acesso ?? "—"}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
