"use server";

import fs from "fs/promises";
import path from "path";

export async function getTitles() {
	try {
		const filePath = path.join(process.cwd(), "data", "title.json");
		const fileContents = await fs.readFile(filePath, "utf8");
		return JSON.parse(fileContents);
	} catch (error) {
		console.error("Erreur lors de la récupération des titres :", error);
		return { error: "Erreur lors de la récupération des titres" };
	}
}
