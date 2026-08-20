import { upsertEventoAction } from "@/app/admin/actions";
import { FormField, inputClass } from "@/components/admin/form-field";
import type { Evento, UnidadeConservacao } from "@/lib/types";

export function EventoForm({
  evento,
  unidades,
}: {
  evento?: Evento;
  unidades: UnidadeConservacao[];
}) {
  return (
    <form action={upsertEventoAction} className="space-y-4">
      {evento && <input type="hidden" name="id" value={evento.id} />}

      <FormField label="Título">
        <input
          name="titulo"
          required
          defaultValue={evento?.titulo}
          className={inputClass}
        />
      </FormField>

      <FormField label="Descrição">
        <textarea
          name="descricao"
          required
          rows={3}
          defaultValue={evento?.descricao}
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Unidade de conservação">
          <select
            name="unidade_id"
            defaultValue={evento?.unidade_id ?? ""}
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

        <FormField label="Tipo">
          <select name="tipo" defaultValue={evento?.tipo ?? "evento"} className={inputClass}>
            <option value="evento">Evento</option>
            <option value="temporada">Temporada</option>
          </select>
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Data de início">
          <input
            type="date"
            name="data_inicio"
            required
            defaultValue={evento?.data_inicio}
            className={inputClass}
          />
        </FormField>
        <FormField label="Data de término">
          <input
            type="date"
            name="data_fim"
            defaultValue={evento?.data_fim ?? ""}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Horário de abertura">
          <input
            type="time"
            name="horario_abertura"
            defaultValue={evento?.horario_abertura ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Horário de fechamento">
          <input
            type="time"
            name="horario_fechamento"
            defaultValue={evento?.horario_fechamento ?? ""}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Status">
        <select name="status" defaultValue={evento?.status ?? "ativo"} className={inputClass}>
          <option value="ativo">Ativo</option>
          <option value="cancelado">Cancelado</option>
          <option value="encerrado">Encerrado</option>
        </select>
      </FormField>

      <button
        type="submit"
        className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
      >
        {evento ? "Salvar alterações" : "Criar evento"}
      </button>
    </form>
  );
}
