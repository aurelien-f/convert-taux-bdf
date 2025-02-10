import { mondayMessage } from "@/components/MondayMessage";
import SearchBar from "@/components/SearchBar";
import { dayBefore } from "@/utils/DayBefore";
import { getDataDevise } from "@/utils/getDataDevise";
import { getTitles } from "@/utils/getTitles";
import { updateRates } from "@/utils/updateRates";
import Link from "next/link";
export default async function Home() {
  const dayBeforeValue = dayBefore();
  const initialRate = await getDataDevise(dayBeforeValue);
  const titles = await getTitles();

  return (
    <section className="md:min-h-[calc(100vh-5rem)] pt-0 md:pt-12 flex items-center flex-col gap-12 justify-center px-4 md:px-0">
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">Convertisseur de taux de change</h1>
        <div className="flex flex-col gap-2 md:max-w-xl md:mx-auto">
          <p className="text-center text-sm text-gray-500">Les données correspondent au jour précédent et sont mises à jour du lundi au vendredi à 00h00 UTC. Pour plus d’informations, n’hésitez pas à consulter <a target="_blank" href="https://www.banque-france.fr/fr/publications-et-statistiques/statistiques?theme%5B7194%5D=7194&sub_theme%5B7205%5D=7205" className="text-blue-500">le site de la Banque de France</a>.</p>
        </div>
      </div>
      <section>
        {new Date().getDay() === 1 && mondayMessage}
        <article className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <SearchBar initialRate={initialRate} updateRates={updateRates} titles={titles} />
        </article>
      </section>
      <p className="text-black italic text-sm underline text-center"><Link href="/taux-de-change-parites-quotidiennes">Consulter les taux de change parités quotidiens</Link></p>
    </section >
  );
}
