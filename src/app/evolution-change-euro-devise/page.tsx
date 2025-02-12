import EvolutionGraphiqueWrapper from "@/components/EvolutionGraphiqueWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Évolution du taux de change | Suivi des devises Banque de France",
  description: "Obtenez l'historique d'un taux de change avec notre outil de suivi | Sources fiables de la Banque de France.",
};

interface PageProps {
  searchParams: Promise<{
    start?: string;
    end?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  let initialFrom: Date;
  let initialTo: Date;

  const resolvedParams = await Promise.resolve(searchParams);

  if (resolvedParams.start && resolvedParams.end) {
    initialFrom = new Date(resolvedParams.start);
    initialTo = new Date(resolvedParams.end);
  } else {
    // Initialisation de initialTo (hier hors week-end)
    initialTo = new Date();
    initialTo.setDate(initialTo.getDate() - 1);
    while (initialTo.getDay() === 0 || initialTo.getDay() === 6) {
      initialTo.setDate(initialTo.getDate() - 1);
    }

    // Initialisation de initialFrom (7 jours avant initialTo)
    initialFrom = new Date(initialTo);
    initialFrom.setDate(initialFrom.getDate() - 7);
    while (initialFrom.getDay() === 0 || initialFrom.getDay() === 6) {
      initialFrom.setDate(initialFrom.getDate() - 1);
    }
  }

  return <EvolutionGraphiqueWrapper initialFrom={initialFrom} initialTo={initialTo} />;
}
