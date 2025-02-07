import fs from "fs";
import https from "https";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface FormattedData {
	Date: string;
	[key: string]: string | number;
}

const URL =
	"https://webstat.banque-france.fr/export/csv-columns/fr/selection/5385698";
const FILE_PATH = path.join("/tmp", "Webstat_Export_fr_5385698.csv");

const downloadFile = async () => {
	return new Promise((resolve, reject) => {
		// Créer le dossier data s'il n'existe pas
		const dir = path.dirname(FILE_PATH);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const file = fs.createWriteStream(FILE_PATH);
		https
			.get(URL, (response) => {
				response.pipe(file);
				file.on("finish", () => {
					file.close();
					resolve(true);
				});
			})
			.on("error", reject);
	});
};

const convertCSVtoJSON = () => {
	if (!fs.existsSync(FILE_PATH)) {
		console.error("Fichier CSV introuvable :", FILE_PATH);
		return;
	}

	const lines = fs.readFileSync(FILE_PATH, "utf-8").split("\n");
	const currencyHeaders = lines[0].split(";").slice(1);

	const outputDir = path.join("/tmp", "data/daily");
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	for (let i = 6; i < lines.length; i++) {
		const dataRow = lines[i].split(";");
		if (dataRow.length > 1) {
			const date = dataRow[0];
			const rowDate = new Date(date);
			const startDate = new Date("2024-01-01");

			if (rowDate >= startDate) {
				const formattedRow: FormattedData = { Date: date };
				currencyHeaders.forEach((currency, index) => {
					const value = dataRow[index + 1]?.replace(",", ".");
					const currencyCode = currency.match(/\(([^)]+)\)/)?.[1];
					if (currencyCode) {
						formattedRow[currencyCode] =
							value && !isNaN(Number(value))
								? Number(value)
								: value;
					}
				});

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

export async function GET(request: NextRequest) {
	console.log("🚀 Démarrage du cron job:", new Date().toISOString());

	const authHeader = request.headers.get("Authorization");
	console.log("📝 Auth Header:", authHeader ? "Présent" : "Absent");

	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		console.log("❌ Erreur d'authentification");
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	try {
		// Vérifie si on est un jour ouvré (pas weekend)
		const today = new Date();
		if (today.getDay() === 0 || today.getDay() === 6) {
			console.log("Weekend : pas de mise à jour nécessaire");
			return NextResponse.json({
				success: true,
				message: "Weekend : pas de mise à jour nécessaire",
			});
		}

		console.log("📥 Démarrage du téléchargement...");
		await downloadFile();
		console.log("✅ Fichier téléchargé avec succès");

		const result = convertCSVtoJSON();
		console.log("📊 Conversion terminée:", result);

		return NextResponse.json({
			success: true,
			message: "Mise à jour complète avec succès",
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("💥 Erreur lors de l'exécution du cron job:", error);
		return NextResponse.json(
			{
				error: "Erreur lors de l'exécution du cron job",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
