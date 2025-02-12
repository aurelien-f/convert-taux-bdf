"use server";
import { getDataDevise } from "./getDataDevise";

export async function getMultipleDataDevise(dates: string[], devise: string) {
	try {
		const data = await Promise.all(
			dates.map(async (date) => {
				const dataDevise = await getDataDevise(date);
				return { date, value: dataDevise[devise] };
			})
		);

		// Filtrer les données dont la valeur est "-\r" ou "-"
		const filteredData = data.filter(
			(point) => point.value !== "-\r" && point.value !== "-"
		);

		return filteredData;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des données devises :",
			error
		);
		throw error;
	}
}
