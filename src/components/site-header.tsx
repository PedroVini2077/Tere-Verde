import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { Icon } from "@/components/icon";
import { createClient } from "@/lib/supabase/server";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-900">
            <svg width="20" height="20" viewBox="0 0 64 64" fill="none">
              <path d="M8 46L23 20L31 33L37 24L56 46Z" fill="#3F855E" />
              <path d="M31 33L37 24L47 40H27Z" fill="#63A37B" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold leading-none text-forest-900">
            Terê Verde
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-forest-50 hover:text-forest-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={user ? "/admin/dashboard" : "/admin/login"}
          className="flex items-center gap-1.5 rounded-full border border-forest-700 bg-forest-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-800 md:px-4"
        >
          <Icon name="user" size={16} />
          <span className="hidden sm:inline">{user ? "Painel" : "Entrar"}</span>
        </Link>
      </div>
    </header>
  );
}
