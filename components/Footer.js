import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xl font-bold text-white">PymeIQ</p>
          <p className="mt-2 text-sm text-slate-400">
            Diagnóstico AI para PYMES en Latinoamérica.
          </p>
          <p className="mt-6 text-xs text-slate-500">
            © {year} Gilberto Cantú Armas — Proyecto AI-101 (Negocios Inteligentes).
          </p>
        </div>

        <nav
          className="flex flex-col md:items-end gap-2 text-sm"
          aria-label="Enlaces del pie de página"
        >
          <Link href="/docs" className="hover:text-white">
            Documentación
          </Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub ↗
          </a>
          <a
            href="mailto:gilcantuarmas1@gmail.com"
            className="hover:text-white"
          >
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
}
