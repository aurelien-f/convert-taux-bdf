import { getMultipleDataDevise } from "@/utils/GetMultipleDataDevise";
import { format } from "date-fns";
import { DateRangePickerClient } from "./DateRangePickerClient";
import EvolutionGraphique from "./EvolutionGraphique";

// Définition d'un type pour les points de données
interface DataPoint {
  date: string;
  value: number;
}

interface EvolutionGraphiqueWrapperProps {
  initialFrom: Date;
  initialTo: Date;
}

// Fonction utilitaire pour générer un tableau de dates formatées entre deux dates
function getDatesBetween(start: Date, end: Date): string[] {
  const dates: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(format(current, "yyyy-MM-dd"));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

// Ce composant est un composant serveur (donc pas de "use client")
export default async function EvolutionGraphiqueWrapper({
  initialFrom,
  initialTo,
}: EvolutionGraphiqueWrapperProps) {
  // Récupérer le tableau de dates
  const dates = getDatesBetween(initialFrom, initialTo);
  // Appeler directement la fonction serveur pour obtenir les données
  const data: DataPoint[] = await getMultipleDataDevise(dates, "USD");

  return (
    <section className="pt-8 md:pt-16 pb-12 min-h-screen px-4 md:px-0">
      <h1 className="text-4xl font-bold text-center mb-12 md:mb-16">
        Graphique de l&apos;évolution du change.
      </h1>
      <div className="mb-8 flex justify-center">
        <DateRangePickerClient initialFrom={initialFrom} initialTo={initialTo} />
      </div>
      <div className="mx-auto max-w-4xl">
        <EvolutionGraphique data={data} />
      </div>
    </section>
  );
} 