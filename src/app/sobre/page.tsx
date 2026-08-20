import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Sobre" };

const ATORES = [
  {
    titulo: "Visitantes",
    descricao:
      "Consultam trilhas, cachoeiras, biodiversidade e eventos das unidades de conservação para planejar suas visitas com segurança.",
  },
  {
    titulo: "Administradores",
    descricao:
      "Mantêm o conteúdo atualizado: disponibilidade de trilhas, horários de eventos e temporadas, e publicam novidades para os visitantes.",
  },
];

export default function SobrePage() {
  return (
    <div>
      <PageHeader
        eyebrow="O projeto"
        title="Sobre o Terê Verde Online"
        description="Uma plataforma pensada para simplificar o acesso a informações sobre as unidades de conservação de Teresópolis."
      />

      <div className="mx-auto max-w-3xl space-y-10 px-5 py-10 md:px-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-heading">
            O Circuito Terê Verde
          </h2>
          <p className="mt-3 text-foreground/70">
            A área urbana de Teresópolis fica cercada por três unidades de
            conservação: o Parque Nacional da Serra dos Órgãos, o Parque
            Estadual dos Três Picos e o Parque Natural Municipal Montanhas
            de Teresópolis. São elas que sustentam o ecoturismo da região,
            mas também limitam o crescimento da cidade. O Terê Verde Online
            junta num só lugar as informações sobre trilhas, cachoeiras,
            biodiversidade e eventos dessas três áreas, pra facilitar a
            visita.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-heading">Atores</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {ATORES.map((ator) => (
              <div key={ator.titulo} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-medium text-heading">{ator.titulo}</h3>
                <p className="mt-2 text-sm text-foreground/65">{ator.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl border border-tint-border bg-tint p-5">
          <Icon name="leaf" size={20} className="mt-0.5 shrink-0 text-accent-strong" />
          <p className="text-sm text-heading">
            Este é um MVP acadêmico desenvolvido para a disciplina de MVP
            Mobile Development, a partir da situação-problema
            &ldquo;Circuito Terê Verde&rdquo;. O conteúdo apresentado tem fins
            educativos e ilustrativos.
          </p>
        </section>
      </div>
    </div>
  );
}
