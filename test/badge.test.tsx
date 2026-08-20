import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DificuldadeBadge, StatusAtracaoBadge } from "@/components/badge";

describe("DificuldadeBadge", () => {
  it("exibe o rótulo em português para cada dificuldade", () => {
    render(<DificuldadeBadge value="dificil" />);
    expect(screen.getByText("Difícil")).toBeInTheDocument();
  });
});

describe("StatusAtracaoBadge", () => {
  it("exibe 'Em manutenção' para o status manutencao", () => {
    render(<StatusAtracaoBadge value="manutencao" />);
    expect(screen.getByText("Em manutenção")).toBeInTheDocument();
  });

  it("exibe 'Aberta' para o status aberta", () => {
    render(<StatusAtracaoBadge value="aberta" />);
    expect(screen.getByText("Aberta")).toBeInTheDocument();
  });
});
