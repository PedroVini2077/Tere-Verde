import type { IconName } from "@/components/icon";

export const NAV_LINKS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Início", icon: "home" },
  { href: "/trilhas", label: "Trilhas", icon: "trail" },
  { href: "/cachoeiras", label: "Cachoeiras", icon: "waterfall" },
  { href: "/biodiversidade", label: "Biodiversidade", icon: "leaf" },
  { href: "/eventos", label: "Eventos", icon: "calendar" },
];
