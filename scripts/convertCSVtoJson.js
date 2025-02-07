// Importation des modules nécessaires pour la manipulation de fichiers
import fs from "fs";
import path from "path";

// Définition du chemin vers le fichier CSV source
const CSV_FILE_PATH = path.resolve("./data/Webstat_Export_fr_5385698.csv");

const convertCSVtoJSON = () => {
	// Vérification de l'existence du fichier CSV
	if (!fs.existsSync(CSV_FILE_PATH)) {
		console.error("Fichier CSV introuvable :", CSV_FILE_PATH);
		return;
	}

	// Lecture du fichier CSV et séparation en lignes
	const lines = fs.readFileSync(CSV_FILE_PATH, "utf-8").split("\n");
	// Extraction des en-têtes de devises (sans le premier élément qui est la date)
	const currencyHeaders = lines[0].split(";").slice(1);

	// Création du dossier de sortie pour les fichiers JSON
	const outputDir = path.resolve("public/data/daily");
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Parcours des lignes de données (à partir de la ligne 6)
	for (let i = 6; i < lines.length; i++) {
		const dataRow = lines[i].split(";");
		if (dataRow.length > 1) {
			const date = dataRow[0];

			// Filtrage des données pour ne garder que celles après le 01-01-2024
			const rowDate = new Date(date);
			const startDate = new Date("2024-01-01");

			if (rowDate >= startDate) {
				// Création d'un objet avec la date comme première propriété
				const formattedRow = { Date: date };

				// Traitement de chaque devise
				currencyHeaders.forEach((currency, index) => {
					// Remplacement de la virgule par un point pour les nombres décimaux
					let value = dataRow[index + 1]?.replace(",", ".");
					// Extraction du code de devise entre parenthèses
					const currencyCode = currency.match(/\(([^)]+)\)/)?.[1];
					if (currencyCode) {
						// Conversion en nombre si possible, sinon garde la valeur telle quelle
						formattedRow[currencyCode] =
							value && !isNaN(value) ? parseFloat(value) : value;
					}
				});

				// Création du fichier JSON pour chaque date
				const fileName = `${date}.json`;
				const filePath = path.join(outputDir, fileName);
				fs.writeFileSync(
					filePath,
					JSON.stringify(formattedRow, null, 2),
					"utf-8"
				);
			}
		}
	}

	return "Fichiers JSON journaliers créés avec succès !";
};

export { convertCSVtoJSON };
