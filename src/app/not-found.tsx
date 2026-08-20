import Link from "next/link";
import { Icon } from "@/components/icon";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
      <Icon name="mapPin" size={40} className="text-forest-400" />
      <h1 className="font-display mt-4 text-2xl font-semibold text-forest-900">
        Trilha não encontrada
      </h1>
      <p className="mt-2 text-foreground/65">
        A página que você procura não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
