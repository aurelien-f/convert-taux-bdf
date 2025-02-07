"use server";

import fs from "fs/promises";
import path from "path";

export async function updateRates(date: string) {
	try {
		const filePath = path.join(
			process.cwd(),
			"data",
			"daily",
			`${date}.json`
		);
		const fileContents = await fs.readFile(filePath, "utf8");
		return JSON.parse(fileContents);
	} catch (error) {
		console.error("Erreur lors de la mise à jour des taux :", error);
		return { error: `Pas de données pour le ${date}` };
	}
}
