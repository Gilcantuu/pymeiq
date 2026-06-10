// /research - Research and Benchmarking Dashboard (Week 2 deliverable).
import IntakeForm from "../../components/research/IntakeForm";
import GlobalExamples from "../../components/research/GlobalExamples";
import MexicoStats from "../../components/research/MexicoStats";
import CompetitorTable from "../../components/research/CompetitorTable";
import RiskMap from "../../components/research/RiskMap";
import SavedList from "../../components/research/SavedList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Research & Benchmarking — PymeIQ",
  description:
    "Evidence that the PymeIQ problem is real, with global examples, Mexican market data, competitors, and a risk map.",
};

export default function ResearchPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 space-y-10">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Week 2 Deliverable
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Market Research and Benchmarking
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Evidence that the PymeIQ problem is real and the opportunity is unmet, with sources you can verify.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <IntakeForm />
        {/* @ts-expect-error Server Component */}
        <SavedList />
      </div>

      <GlobalExamples />

      <MexicoStats />

      <CompetitorTable />

      <RiskMap />
    </section>
  );
}
