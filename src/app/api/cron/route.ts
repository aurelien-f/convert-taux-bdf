import { exec } from "child_process";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import util from "util";

const execAsync = util.promisify(exec);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	console.log("🚀 Démarrage du cron job:", new Date().toISOString());

	const authHeader = request.headers.get("Authorization");
	console.log("📝 Auth Header:", authHeader ? "Présent" : "Absent");

	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		console.log("❌ Erreur d'authentification");
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	try {
		console.log("📥 Tentative d'exécution du script...");
		const { stdout, stderr } = await execAsync(
			"node scripts/cron_donwload_cvs.js"
		);
		console.log("📤 Sortie standard:", stdout);
		if (stderr) console.error("🚨 Erreur standard:", stderr);

		return NextResponse.json({
			success: true,
			message: "Cron exécuté avec succès",
			timestamp: new Date().toISOString(),
			stdout,
			stderr,
		});
	} catch (error) {
		console.error("�� Erreur lors de l'exécution du cron job:", error);
		return NextResponse.json(
			{
				error: "Erreur lors de l'exécution du cron job",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
