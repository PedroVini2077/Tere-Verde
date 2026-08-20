"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/login?erro=${encodeURIComponent(error.message)}`);
  }
  redirect("/admin/dashboard");
}

// ---------- Novidades ----------

export async function createNovidadeAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const conteudo = String(formData.get("conteudo") ?? "").trim();
  if (!titulo || !conteudo) return;

  await supabase.from("novidades").insert({ titulo, conteudo, autor_id: user?.id });
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function deleteNovidadeAction(id: string) {
  const supabase = await createClient();
  await supabase.from("novidades").delete().eq("id", id);
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

// ---------- Trilhas ----------

export async function upsertTrilhaAction(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const nome = String(formData.get("nome") ?? "").trim();

  const payload = {
    nome,
    slug: slugify(nome),
    descricao: String(formData.get("descricao") ?? "").trim(),
    dificuldade: String(formData.get("dificuldade") ?? "leve"),
    distancia_km: formData.get("distancia_km") ? Number(formData.get("distancia_km")) : null,
    duracao_media_min: formData.get("duracao_media_min")
      ? Number(formData.get("duracao_media_min"))
      : null,
    altitude_ganho_m: formData.get("altitude_ganho_m")
      ? Number(formData.get("altitude_ganho_m"))
      : null,
    ponto_partida: String(formData.get("ponto_partida") ?? "").trim() || null,
    status: String(formData.get("status") ?? "aberta"),
    unidade_id: String(formData.get("unidade_id") ?? "") || null,
  };

  if (id) {
    await supabase.from("trilhas").update(payload).eq("id", id);
  } else {
    await supabase.from("trilhas").insert(payload);
  }

  revalidatePath("/admin/trilhas");
  revalidatePath("/trilhas");
  redirect("/admin/trilhas");
}

export async function deleteTrilhaAction(id: string) {
  const supabase = await createClient();
  await supabase.from("trilhas").delete().eq("id", id);
  revalidatePath("/admin/trilhas");
  revalidatePath("/trilhas");
}

// ---------- Cachoeiras ----------

export async function upsertCachoeiraAction(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const nome = String(formData.get("nome") ?? "").trim();

  const payload = {
    nome,
    slug: slugify(nome),
    descricao: String(formData.get("descricao") ?? "").trim(),
    altura_m: formData.get("altura_m") ? Number(formData.get("altura_m")) : null,
    acesso: String(formData.get("acesso") ?? "").trim() || null,
    status: String(formData.get("status") ?? "aberta"),
    unidade_id: String(formData.get("unidade_id") ?? "") || null,
  };

  if (id) {
    await supabase.from("cachoeiras").update(payload).eq("id", id);
  } else {
    await supabase.from("cachoeiras").insert(payload);
  }

  revalidatePath("/admin/cachoeiras");
  revalidatePath("/cachoeiras");
  redirect("/admin/cachoeiras");
}

export async function deleteCachoeiraAction(id: string) {
  const supabase = await createClient();
  await supabase.from("cachoeiras").delete().eq("id", id);
  revalidatePath("/admin/cachoeiras");
  revalidatePath("/cachoeiras");
}

// ---------- Eventos ----------

export async function upsertEventoAction(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");

  const payload = {
    titulo: String(formData.get("titulo") ?? "").trim(),
    descricao: String(formData.get("descricao") ?? "").trim(),
    tipo: String(formData.get("tipo") ?? "evento"),
    data_inicio: String(formData.get("data_inicio") ?? ""),
    data_fim: String(formData.get("data_fim") ?? "") || null,
    horario_abertura: String(formData.get("horario_abertura") ?? "") || null,
    horario_fechamento: String(formData.get("horario_fechamento") ?? "") || null,
    status: String(formData.get("status") ?? "ativo"),
    unidade_id: String(formData.get("unidade_id") ?? "") || null,
  };

  if (id) {
    await supabase.from("eventos").update(payload).eq("id", id);
  } else {
    await supabase.from("eventos").insert(payload);
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  redirect("/admin/eventos");
}

export async function deleteEventoAction(id: string) {
  const supabase = await createClient();
  await supabase.from("eventos").delete().eq("id", id);
  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
}
