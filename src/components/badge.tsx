import type { Dificuldade, StatusAtracao, StatusEvento } from "@/lib/types";
import {
  DIFICULDADE_LABEL,
  STATUS_ATRACAO_LABEL,
  STATUS_EVENTO_LABEL,
} from "@/lib/format";

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "amber" | "red" | "neutral";
}) {
  const tones: Record<string, string> = {
    green: "bg-forest-100 text-forest-700",
    amber: "bg-amber-100 text-clay-600",
    red: "bg-danger-100 text-danger-500",
    neutral: "bg-surface-muted text-foreground/60",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function DificuldadeBadge({ value }: { value: Dificuldade }) {
  const tone = value === "leve" ? "green" : value === "moderada" ? "amber" : "red";
  return <Badge tone={tone}>{DIFICULDADE_LABEL[value]}</Badge>;
}

export function StatusAtracaoBadge({ value }: { value: StatusAtracao }) {
  const tone = value === "aberta" ? "green" : value === "manutencao" ? "amber" : "red";
  return <Badge tone={tone}>{STATUS_ATRACAO_LABEL[value]}</Badge>;
}

export function StatusEventoBadge({ value }: { value: StatusEvento }) {
  const tone = value === "ativo" ? "green" : value === "encerrado" ? "neutral" : "red";
  return <Badge tone={tone}>{STATUS_EVENTO_LABEL[value]}</Badge>;
}

export function CategoriaBadge({ value }: { value: "fauna" | "flora" }) {
  return <Badge tone={value === "fauna" ? "amber" : "green"}>{value === "fauna" ? "Fauna" : "Flora"}</Badge>;
}
