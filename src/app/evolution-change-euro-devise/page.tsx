import EvolutionGraphiqueWrapper from "@/components/EvolutionGraphiqueWrapper";

export default async function TauxDeChangeParitesQuotidiennes({
  searchParams,
}: {
  searchParams: { [key: string]: string } | Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  let initialFrom: Date;
  let initialTo: Date;

  const searchParamsStart = params.start;
  const searchParamsEnd = params.end;

  if (searchParamsStart && searchParamsEnd) {
    initialFrom = new Date(searchParamsStart);
    initialTo = new Date(searchParamsEnd);
  } else {
    initialFrom = new Date();
    initialFrom.setDate(initialFrom.getDate() - 7);
    while (initialFrom.getDay() === 0 || initialFrom.getDay() === 6) {
      initialFrom.setDate(initialFrom.getDate() - 1);
    }

    initialTo = new Date();
    initialTo.setDate(initialTo.getDate() - 1);
    while (initialTo.getDay() === 0 || initialTo.getDay() === 6) {
      initialTo.setDate(initialTo.getDate() - 1);
    }
  }

  return <EvolutionGraphiqueWrapper initialFrom={initialFrom} initialTo={initialTo} />;
}
