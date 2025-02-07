import fs from "fs";
import https from "https";
import cron from "node-cron";
import { convertCSVtoJSON } from "./convertCSVtoJson.js";

const URL =
	"https://webstat.banque-france.fr/export/csv-columns/fr/selection/5385698";
const FILE_PATH = "./data/Webstat_Export_fr_5385698.csv";

// Fonction principale pour télécharger le fichier CSV
const downloadCSV = () => {
	if (!fs.existsSync("./data")) {
		fs.mkdirSync("./data", { recursive: true });
	}
	console.log(
		`[${new Date().toISOString()}] Téléchargement du fichier CSV...`
	);

	// Création d'un flux de fichier pour écrire le contenu du fichier CSV
	const file = fs.createWriteStream(FILE_PATH);

	// Téléchargement du fichier CSV depuis l'URL
	https
		.get(URL, (response) => {
			response.pipe(file); // Pipe le contenu de la réponse vers le flux de fichier
			file.on("finish", () => {
				file.close(); // Fermeture du flux de fichier
				console.log("CSV mis à jour avec succès !"); // Message de succès
				const result = convertCSVtoJSON(); // Conversion du CSV en JSON
				console.log(result); // Affichage du résultat
			});
		})
		.on("error", (error) => {
			console.error("Erreur lors du téléchargement du fichier :", error); // Message d'erreur
		});
};

// Configuration de la tâche cron
// "0 0 * * *" signifie : exécution tous les jours à minuit (00:00)
cron.schedule("0 0 * * *", () => {
	downloadCSV();
});

// Message de confirmation du démarrage de la tâche
console.log(
	"Tâche cron initialisée : mise à jour quotidienne du taux de change."
);

// Exécution immédiate du téléchargement au démarrage du script
downloadCSV();
