import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Convertisseur de devises fiable | Données Banque de France",
  description: "Convertissez vos devises en un clic. Taux de change mis à jour chaque jour avec les données officielles de la Banque de France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-background `}
      >
        <NavBar items={[{ label: "Accueil", href: "/" }, { label: "Tableau des taux de change", href: "/taux-de-change-parites-quotidiennes" }, { label: "Évolution taux de change", href: "/evolution-change-euro-devise" }]} />
        <main className="min-h-screen relative pt-12 md:pt-0 flex flex-col justify-between md:block">
          {children}
          <footer className="py-5 px-4 md:px-16 flex flex-col items-center gap-2 md:flex-row md:justify-between h-auto md:h-20">
            <p className="text-center text-sm">Les données utilisées proviennent du site de la <a target="_blank" href="https://www.banque-france.fr/fr/publications-et-statistiques/statistiques?theme%5B7194%5D=7194&sub_theme%5B7205%5D=7205" className="text-primary hover:underline">Banque de France</a>.</p>
            <p className="text-center text-sm">© 2025 - Tous droits réservés - <a target="_blank" href="https://www.aurelien-feuillard.fr" className="text-primary hover:underline">Aurélien Feuillard</a>.</p>
          </footer>
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
