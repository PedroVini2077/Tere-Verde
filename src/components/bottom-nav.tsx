"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";
import { Icon } from "@/components/icon";

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden"
      aria-label="Navegação principal"
    >
      <ul className="grid grid-cols-5">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  active ? "text-accent-strong" : "text-foreground/50"
                }`}
              >
                <Icon name={link.icon} size={22} strokeWidth={active ? 2 : 1.6} />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
