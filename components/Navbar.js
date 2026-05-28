import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Navegación principal"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-brand-600"
        >
          PymeIQ
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-brand-600">
            Home
          </Link>
          <Link href="/#roadmap" className="hover:text-brand-600">
            Roadmap
          </Link>
          <Link href="/docs" className="hover:text-brand-600">
            Docs
          </Link>
          <a
            href="#cta"
            className="rounded-lg bg-brand-600 px-4 py-2 text-white shadow-sm transition hover:bg-brand-700"
          >
            Acceso
          </a>
        </div>
      </nav>
    </header>
  );
}
