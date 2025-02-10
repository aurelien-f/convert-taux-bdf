import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convertisseur de devises d'après le taux de change de la Banque de France",
  description: "Convertissez vos devises grâce à une interface simple et intuitive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 `}
      >
        <main className="min-h-screen relative pt-12 md:pt-0 flex flex-col justify-between md:block">
          {children}
          <footer className="py-5 px-4 md:px-16 flex flex-col items-center gap-2 md:flex-row md:justify-between h-auto md:h-20">
            <p className="text-center text-sm text-gray-500">Les données utilisées proviennent du site de la <a target="_blank" href="https://www.banque-france.fr/fr/publications-et-statistiques/statistiques?theme%5B7194%5D=7194&sub_theme%5B7205%5D=7205" className="text-blue-500 hover:underline">Banque de France</a>.</p>
            <p className="text-center text-sm text-gray-500">© 2025 - Tous droits réservés - <a target="_blank" href="https://www.aurelien-feuillard.fr" className="text-blue-500 hover:underline">Aurélien Feuillard</a>.</p>
          </footer>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
