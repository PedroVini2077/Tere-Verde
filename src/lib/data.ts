import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Cachoeira,
  Especie,
  Evento,
  Novidade,
  Trilha,
  UnidadeConservacao,
} from "@/lib/types";

const UNIDADE_SELECT = "unidades_conservacao(nome, slug)";

export async function getUnidades(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("unidades_conservacao")
    .select("*")
    .order("nome");
  if (error) throw error;
  return data as UnidadeConservacao[];
}

export async function getUnidadeBySlug(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase
    .from("unidades_conservacao")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as UnidadeConservacao | null;
}

export async function getTrilhas(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("trilhas")
    .select(`*, ${UNIDADE_SELECT}`)
    .order("nome");
  if (error) throw error;
  return data as unknown as Trilha[];
}

export async function getTrilhaBySlug(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase
    .from("trilhas")
    .select(`*, ${UNIDADE_SELECT}`)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as Trilha | null;
}

export async function getCachoeiras(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("cachoeiras")
    .select(`*, ${UNIDADE_SELECT}`)
    .order("nome");
  if (error) throw error;
  return data as unknown as Cachoeira[];
}

export async function getCachoeiraBySlug(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase
    .from("cachoeiras")
    .select(`*, ${UNIDADE_SELECT}`)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as Cachoeira | null;
}

export async function getEspecies(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("especies")
    .select(`*, ${UNIDADE_SELECT}`)
    .order("nome_popular");
  if (error) throw error;
  return data as unknown as Especie[];
}

export async function getEventos(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("eventos")
    .select(`*, ${UNIDADE_SELECT}`)
    .order("data_inicio", { ascending: true });
  if (error) throw error;
  return data as unknown as Evento[];
}

export async function getNovidades(supabase: SupabaseClient, limit = 5) {
  const { data, error } = await supabase
    .from("novidades")
    .select("*")
    .order("publicado_em", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as Novidade[];
}
