import ArrayTauxChange from "@/components/ArrayTauxChange";
import { mondayMessage } from "@/components/MondayMessage";
import { H1 } from "@/components/core/H1";
import { WrapperPage } from "@/components/core/WrapperPage";
import { dayBefore } from "@/utils/DayBefore";
import { getDataDevise } from "@/utils/getDataDevise";
import { getTitles } from "@/utils/getTitles";
import { updateRates } from "@/utils/updateRates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taux de change du jour | Parités officielles Banque de France",
  description: "Besoin des derniers taux de change ? Consultez les parités quotidiennes officielles issues de la Banque de France.",
};

export default async function TauxDeChangeParitesQuotidiennes() {
  const dayBeforeValue = dayBefore();
  const initialRate = await getDataDevise(dayBeforeValue);
  const titles = await getTitles();

  return <WrapperPage>
    <div className="mb-12 md:mb-16">
      <H1>Taux de change (parités quotidiennes)</H1>
      <p className="text-center text-sm text-gray-500">Découvrez les taux de change en fonction de la date pour toutes les devises par rapport à la devise Euro.</p>
    </div>
    <section className="w-full md:max-w-5xl mx-auto relative">
      {new Date().getDay() === 1 && mondayMessage}
      <ArrayTauxChange initialRate={initialRate} titles={titles} updateRates={updateRates} dayBefore={dayBeforeValue} />
    </section>
  </WrapperPage>
}
