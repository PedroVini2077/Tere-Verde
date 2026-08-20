import { describe, expect, it } from "vitest";
import {
  formatDistancia,
  formatDuracao,
  formatHorario,
  formatPeriodoEvento,
} from "@/lib/format";

describe("formatDuracao", () => {
  it("mostra apenas minutos quando menor que uma hora", () => {
    expect(formatDuracao(45)).toBe("45 min");
  });

  it("mostra apenas horas quando múltiplo exato", () => {
    expect(formatDuracao(120)).toBe("2h");
  });

  it("combina horas e minutos", () => {
    expect(formatDuracao(150)).toBe("2h30");
  });

  it("retorna travessão quando nulo", () => {
    expect(formatDuracao(null)).toBe("—");
  });
});

describe("formatDistancia", () => {
  it("formata a distância em km", () => {
    expect(formatDistancia(9.4)).toBe("9,4 km");
  });

  it("retorna travessão quando nulo", () => {
    expect(formatDistancia(null)).toBe("—");
  });
});

describe("formatHorario", () => {
  it("trunca segundos do horário", () => {
    expect(formatHorario("07:00:00")).toBe("07:00");
  });

  it("retorna vazio quando nulo", () => {
    expect(formatHorario(null)).toBe("");
  });
});

describe("formatPeriodoEvento", () => {
  it("mostra apenas uma data quando início e fim coincidem", () => {
    expect(formatPeriodoEvento("2026-09-12", "2026-09-12")).toBe(
      formatPeriodoEvento("2026-09-12", null)
    );
  });

  it("mostra intervalo quando datas são diferentes", () => {
    const resultado = formatPeriodoEvento("2026-04-01", "2026-10-31");
    expect(resultado).toContain("–");
  });
});
