import SearchBar from "@/components/SearchBar";
import { getDataDevise } from "@/utils/getDataDevise";
import { getTitles } from "@/utils/getTitles";
import { updateRates } from "@/utils/updateRates";

export default async function Home() {
  const dayBefore = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const initialRate = await getDataDevise(dayBefore);
  const titles = await getTitles();

  return (
    <section className="min-h-screen flex items-center flex-col gap-12 justify-center px-4 md:px-0">
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">Convertisseur de taux de change</h1>
        <div className="flex flex-col gap-2 md:max-w-xl md:mx-auto">
          <p className="text-center text-sm text-gray-500">Les données sont du jour précédent et elles sont actualisées quotidiennement. Pour plus d&apos;informations n&apos;hésitez pas à consulter <a target="_blank" href="https://www.banque-france.fr/fr/publications-et-statistiques/statistiques?theme%5B7194%5D=7194&sub_theme%5B7205%5D=7205" className="text-blue-500">le site de la Banque de France</a>.</p>
        </div>
      </div>
      <article className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <SearchBar initialRate={initialRate} updateRates={updateRates} titles={titles} />
      </article>
    </section >
  );
}
