import { upsertTrilhaAction } from "@/app/admin/actions";
import { FormField, inputClass } from "@/components/admin/form-field";
import type { Trilha, UnidadeConservacao } from "@/lib/types";

export function TrilhaForm({
  trilha,
  unidades,
}: {
  trilha?: Trilha;
  unidades: UnidadeConservacao[];
}) {
  return (
    <form action={upsertTrilhaAction} className="space-y-4">
      {trilha && <input type="hidden" name="id" value={trilha.id} />}

      <FormField label="Nome">
        <input
          name="nome"
          required
          defaultValue={trilha?.nome}
          className={inputClass}
        />
      </FormField>

      <FormField label="Descrição">
        <textarea
          name="descricao"
          required
          rows={4}
          defaultValue={trilha?.descricao}
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Unidade de conservação">
          <select
            name="unidade_id"
            defaultValue={trilha?.unidade_id ?? ""}
            className={inputClass}
          >
            <option value="">—</option>
            {unidades.map((unidade) => (
              <option key={unidade.id} value={unidade.id}>
                {unidade.nome}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Dificuldade">
          <select
            name="dificuldade"
            defaultValue={trilha?.dificuldade ?? "leve"}
            className={inputClass}
          >
            <option value="leve">Leve</option>
            <option value="moderada">Moderada</option>
            <option value="dificil">Difícil</option>
            <option value="extrema">Extrema</option>
          </select>
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Distância (km)">
          <input
            type="number"
            step="0.1"
            name="distancia_km"
            defaultValue={trilha?.distancia_km ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Duração média (min)">
          <input
            type="number"
            name="duracao_media_min"
            defaultValue={trilha?.duracao_media_min ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Ganho de altitude (m)">
          <input
            type="number"
            name="altitude_ganho_m"
            defaultValue={trilha?.altitude_ganho_m ?? ""}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Ponto de partida">
          <input
            name="ponto_partida"
            defaultValue={trilha?.ponto_partida ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Disponibilidade">
          <select
            name="status"
            defaultValue={trilha?.status ?? "aberta"}
            className={inputClass}
          >
            <option value="aberta">Aberta</option>
            <option value="fechada">Fechada</option>
            <option value="manutencao">Em manutenção</option>
          </select>
        </FormField>
      </div>

      <button
        type="submit"
        className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
      >
        {trilha ? "Salvar alterações" : "Criar trilha"}
      </button>
    </form>
  );
}
