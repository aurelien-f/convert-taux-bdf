import ArrayTauxChange from "@/components/ArrayTauxChange";
import { mondayMessage } from "@/components/MondayMessage";
import { dayBefore } from "@/utils/DayBefore";
import { getDataDevise } from "@/utils/getDataDevise";
import { getTitles } from "@/utils/getTitles";
import { updateRates } from "@/utils/updateRates";
export default async function TauxDeChangeParitesQuotidiennes() {
  const dayBeforeValue = dayBefore();
  const initialRate = await getDataDevise(dayBeforeValue);
  const titles = await getTitles();

  return <section className="pt-8 md:pt-16 pb-12 min-h-screen px-4 md:px-0">
    <h1 className="text-4xl font-bold text-center mb-12 md:mb-16">Taux de change (parités quotidiennes)</h1>
    <section className="w-full md:max-w-5xl mx-auto relative">
      {new Date().getDay() === 1 && mondayMessage}
      <ArrayTauxChange initialRate={initialRate} titles={titles} updateRates={updateRates} dayBefore={dayBeforeValue} />
    </section>
  </section>
}
