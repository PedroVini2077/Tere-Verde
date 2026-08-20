import { upsertCachoeiraAction } from "@/app/admin/actions";
import { FormField, inputClass } from "@/components/admin/form-field";
import type { Cachoeira, UnidadeConservacao } from "@/lib/types";

export function CachoeiraForm({
  cachoeira,
  unidades,
}: {
  cachoeira?: Cachoeira;
  unidades: UnidadeConservacao[];
}) {
  return (
    <form action={upsertCachoeiraAction} className="space-y-4">
      {cachoeira && <input type="hidden" name="id" value={cachoeira.id} />}

      <FormField label="Nome">
        <input
          name="nome"
          required
          defaultValue={cachoeira?.nome}
          className={inputClass}
        />
      </FormField>

      <FormField label="Descrição">
        <textarea
          name="descricao"
          required
          rows={4}
          defaultValue={cachoeira?.descricao}
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Unidade de conservação">
          <select
            name="unidade_id"
            defaultValue={cachoeira?.unidade_id ?? ""}
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

        <FormField label="Altura da queda (m)">
          <input
            type="number"
            step="0.1"
            name="altura_m"
            defaultValue={cachoeira?.altura_m ?? ""}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Acesso">
          <input
            name="acesso"
            defaultValue={cachoeira?.acesso ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Disponibilidade">
          <select
            name="status"
            defaultValue={cachoeira?.status ?? "aberta"}
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
        {cachoeira ? "Salvar alterações" : "Criar cachoeira"}
      </button>
    </form>
  );
}
