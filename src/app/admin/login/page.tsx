import type { Metadata } from "next";
import { signInAction } from "@/app/admin/actions";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Login administrativo" };

type Props = { searchParams: Promise<{ erro?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const { erro } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5 py-16">
      <div className="mb-8 flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-900">
          <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
            <path d="M8 46L23 20L31 33L37 24L56 46Z" fill="#3F855E" />
            <path d="M31 33L37 24L47 40H27Z" fill="#63A37B" />
          </svg>
        </span>
        <div>
          <p className="font-display text-lg font-semibold text-heading">Terê Verde</p>
          <p className="text-xs text-foreground/55">Área administrativa</p>
        </div>
      </div>

      <h1 className="font-display text-2xl font-semibold text-heading">Entrar</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Acesso restrito aos administradores do Circuito Terê Verde.
      </p>

      {erro && (
        <p className="mt-4 rounded-lg bg-danger-100 px-3.5 py-2.5 text-sm text-danger-500">
          Não foi possível entrar. Verifique suas credenciais.
        </p>
      )}

      <form action={signInAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-foreground/75">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-foreground/75">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
        >
          <Icon name="user" size={16} />
          Entrar
        </button>
      </form>
    </div>
  );
}
