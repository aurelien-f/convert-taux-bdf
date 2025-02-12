import { CardWhite } from "@/app/CardWhite";
import SearchBar from "@/components/SearchBar";
import { H1 } from "@/components/core/H1";
import { dayBefore } from "@/utils/DayBefore";
import { getDataDevise } from "@/utils/getDataDevise";
import { getTitles } from "@/utils/getTitles";
import { updateRates } from "@/utils/updateRates";
export default async function Home() {
  const dayBeforeValue = dayBefore();
  const initialRate = await getDataDevise(dayBeforeValue);
  const titles = await getTitles();

  return (
    <section className="md:min-h-[calc(100vh-5rem)] pt-12 flex items-center flex-col gap-12 justify-center px-4 md:px-0">
      <div>
        <H1>Convertisseur de taux de change</H1>
        <div className="flex flex-col gap-2 md:max-w-xl md:mx-auto">
          <p className="text-center text-sm text-gray-500">Les données correspondent au jour précédent et sont mises à jour du lundi au vendredi à 00h00 UTC. Pour plus d’informations, n’hésitez pas à consulter <a target="_blank" href="https://www.banque-france.fr/fr/publications-et-statistiques/statistiques?theme%5B7194%5D=7194&sub_theme%5B7205%5D=7205" className="text-blue-500">le site de la Banque de France</a>.</p>
        </div>
      </div>
      <section>
        <CardWhite>
          <SearchBar initialRate={initialRate} updateRates={updateRates} titles={titles} />
        </CardWhite>
      </section>
    </section >
  );
}
