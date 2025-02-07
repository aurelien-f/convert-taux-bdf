import fs from "fs";
import path from "path";

const CSV_FILE_PATH = path.resolve("./data/Webstat_Export_fr_5385698.csv");
const TITLE_FILE_PATH = path.resolve("./data/title.json");

const extractTitles = () => {
	if (!fs.existsSync(CSV_FILE_PATH)) {
		console.error("Fichier CSV introuvable :", CSV_FILE_PATH);
		return;
	}

	const lines = fs.readFileSync(CSV_FILE_PATH, "utf-8").split("\n");
	const firstDataLine = lines[0];
	const [, ...values] = firstDataLine.split(";");
	const titles = values.reduce((acc, value) => {
		const match = value.trim().match(/\(([^)]+)\)/);
		if (match) {
			const currencyCode = match[1];
			acc[currencyCode] = value.trim();
		}
		return acc;
	}, {});

	fs.writeFileSync(TITLE_FILE_PATH, JSON.stringify(titles, null, 2), "utf-8");
	console.log("Titres extraits avec succès !");
};

extractTitles();
