"use server";

import fs from "fs/promises";
import path from "path";

export async function getDataDevise(date?: string) {
	const currentDate = new Date();
	const formattedDate = date ? date : currentDate.toISOString().split("T")[0];

	try {
		const filePath = path.join(
			process.cwd(),
			"data",
			"daily",
			`${formattedDate}.json`
		);

		try {
			await fs.access(filePath);
		} catch {
			return { error: `Pas de données pour le ${formattedDate}` };
		}

		const fileContents = await fs.readFile(filePath, "utf8");

		return JSON.parse(fileContents);
	} catch (error) {
		console.error("Erreur lors de la récupération des données :", error);
		return { error: "Erreur lors de la récupération des données" };
	}
}
