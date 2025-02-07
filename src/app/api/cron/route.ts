import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get("Authorization");

	// Vérification du secret CRON
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new NextResponse("Non autorisé", { status: 401 });
	}

	try {
		await execAsync("node scripts/cron_donwload_cvs.js");
		console.log("Cron job exécuté avec succès le : " + new Date());
		return NextResponse.json({
			message: "Cron job exécuté avec succès le : " + new Date(),
		});
	} catch (error) {
		console.error("Erreur lors de l'exécution du cron job:", error);
		return NextResponse.json(
			{ error: "Erreur lors de l'exécution du cron job" },
			{ status: 500 }
		);
	}
}
