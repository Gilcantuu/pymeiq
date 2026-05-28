import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "PymeIQ — Diagnóstico AI para tu PYME",
  description:
    "Responde 12 preguntas y recibe un plan de acción concreto comparado contra benchmarks de tu industria. Hecho para PYMES en LATAM.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
