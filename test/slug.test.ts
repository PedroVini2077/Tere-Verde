import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("remove acentos e converte para minúsculas", () => {
    expect(slugify("Cachoeira do Imbuí")).toBe("cachoeira-do-imbui");
  });

  it("substitui espaços e pontuação por hífen", () => {
    expect(slugify("Trilha da Pedra do Sino!")).toBe("trilha-da-pedra-do-sino");
  });

  it("remove hífens nas pontas", () => {
    expect(slugify("  Travessia — Petrópolis a Teresópolis  ")).toBe(
      "travessia-petropolis-a-teresopolis"
    );
  });

  it("lida com múltiplos espaços consecutivos", () => {
    expect(slugify("Parque   Estadual   dos   Três Picos")).toBe(
      "parque-estadual-dos-tres-picos"
    );
  });
});
