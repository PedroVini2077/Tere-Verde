import type { Dificuldade, StatusAtracao, StatusEvento } from "@/lib/types";

export const DIFICULDADE_LABEL: Record<Dificuldade, string> = {
  leve: "Leve",
  moderada: "Moderada",
  dificil: "Difícil",
  extrema: "Extrema",
};

export const STATUS_ATRACAO_LABEL: Record<StatusAtracao, string> = {
  aberta: "Aberta",
  fechada: "Fechada",
  manutencao: "Em manutenção",
};

export const STATUS_EVENTO_LABEL: Record<StatusEvento, string> = {
  ativo: "Ativo",
  cancelado: "Cancelado",
  encerrado: "Encerrado",
};

export function formatDuracao(minutos: number | null): string {
  if (!minutos) return "—";
  const horas = Math.floor(minutos / 60);
  const min = minutos % 60;
  if (horas === 0) return `${min} min`;
  if (min === 0) return `${horas}h`;
  return `${horas}h${min.toString().padStart(2, "0")}`;
}

export function formatDistancia(km: number | null): string {
  if (km === null || km === undefined) return "—";
  return `${km.toLocaleString("pt-BR")} km`;
}

export function formatDataCurta(data: string | null): string {
  if (!data) return "";
  const d = new Date(`${data}T00:00:00`);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function formatPeriodoEvento(inicio: string, fim: string | null): string {
  if (!fim || fim === inicio) return formatDataCurta(inicio);
  return `${formatDataCurta(inicio)} – ${formatDataCurta(fim)}`;
}

export function formatHorario(hora: string | null): string {
  if (!hora) return "";
  return hora.slice(0, 5);
}
