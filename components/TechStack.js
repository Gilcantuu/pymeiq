const tech = ["Next.js", "Tailwind CSS", "Vercel", "Supabase", "Claude Code"];

export default function TechStack() {
  return (
    <section className="bg-white py-16 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
          Built with
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
