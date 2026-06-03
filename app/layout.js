// Layout root with optimized SEO metadata
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "PymeIQ — AI Diagnostic for SMBs in LATAM",
  description:
    "Answer 5 short questions and get a structured SWOT diagnostic with 3 prioritized actions. Built for SMB owners in Latin America.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
