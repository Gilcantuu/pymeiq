import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xl font-bold text-white">PymeIQ</p>
          <p className="mt-2 text-sm text-slate-400">
            AI diagnostic for SMBs in Latin America.
          </p>
          <p className="mt-6 text-xs text-slate-500">
            © {year} Gilberto Cantú Armas — AI-101 course project.
          </p>
        </div>

        <nav
          className="flex flex-col md:items-end gap-2 text-sm"
          aria-label="Footer links"
        >
          <Link href="/core" className="hover:text-white">Core</Link>
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <a
            href="https://github.com/Gilcantuu/pymeiq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
