import { CardWhite } from "@/app/CardWhite";
import { getMultipleDataDevise } from "@/utils/GetMultipleDataDevise";
import { format } from "date-fns";
import { DateRangePickerClient } from "./DateRangePickerClient";
import EvolutionGraphique from "./EvolutionGraphique";
import { H1 } from "./core/H1";
import { WrapperPage } from "./core/WrapperPage";
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
    <WrapperPage>
      <div className="mb-12 md:mb-16">
        <H1>
          Graphique de l&apos;évolution du change.
        </H1>
        <p className="text-center text-sm text-gray-500">
          Découvrez l&apos;évolution du taux de change entre deux dates.
        </p>
      </div>
      <CardWhite className="max-w-4xl">
        <div className="flex flex-col justify-center mb-8">
          <p className="text-sm font-bold mb-2">Sélectionner une plage de date : </p>
          <DateRangePickerClient initialFrom={initialFrom} initialTo={initialTo} />
        </div>
        <EvolutionGraphique data={data} />
      </CardWhite>
    </WrapperPage>
  );
} 