export default function SiteFooter() {
  return (
    <footer className="hidden border-t border-border bg-forest-950 text-forest-100 md:block">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Terê Verde Online
            </p>
            <p className="mt-2 max-w-xs text-forest-200">
              Guia digital do Circuito Terê Verde para explorar as unidades
              de conservação de Teresópolis com consciência ambiental.
            </p>
          </div>
          <div>
            <p className="font-medium text-white">Unidades de conservação</p>
            <ul className="mt-2 space-y-1 text-forest-200">
              <li>Parque Nacional da Serra dos Órgãos</li>
              <li>Parque Estadual dos Três Picos</li>
              <li>Parque Natural Municipal Montanhas de Teresópolis</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-white">Sobre o projeto</p>
            <p className="mt-2 text-forest-200">
              MVP acadêmico desenvolvido para a situação-problema
              &ldquo;Circuito Terê Verde&rdquo;. Conteúdo com fins
              educativos e ilustrativos.
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-forest-800 pt-6 text-xs text-forest-300">
          © {new Date().getFullYear()} Terê Verde Online — Teresópolis, RJ.
        </p>
      </div>
    </footer>
  );
}
