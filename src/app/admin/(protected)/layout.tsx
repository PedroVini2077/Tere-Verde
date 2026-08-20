import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";
import { Icon } from "@/components/icon";

const LINKS = [
  { href: "/admin/dashboard", label: "Visão geral", icon: "home" as const },
  { href: "/admin/trilhas", label: "Trilhas", icon: "trail" as const },
  { href: "/admin/cachoeiras", label: "Cachoeiras", icon: "waterfall" as const },
  { href: "/admin/eventos", label: "Eventos", icon: "calendar" as const },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6 md:py-8">
      <aside className="md:w-56 md:shrink-0">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-medium uppercase tracking-wide text-forest-500">
            Painel administrativo
          </p>
          <form action={signOutAction} className="md:hidden">
            <button
              type="submit"
              aria-label="Sair"
              className="rounded-lg p-1.5 text-danger-500 hover:bg-danger-100"
            >
              <Icon name="logout" size={17} />
            </button>
          </form>
        </div>
        <nav className="mt-3 flex gap-1.5 overflow-x-auto md:mt-4 md:flex-col md:overflow-visible">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-forest-50 hover:text-forest-700"
            >
              <Icon name={link.icon} size={17} />
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction} className="mt-4 hidden md:block">
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-danger-500 transition-colors hover:bg-danger-100"
          >
            <Icon name="logout" size={17} />
            Sair
          </button>
        </form>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}
