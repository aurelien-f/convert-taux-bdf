import { exec } from "child_process";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import util from "util";

const execAsync = util.promisify(exec);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function handler(request: NextRequest) {
	const authHeader = request.headers.get("Authorization");

	// Vérification du secret CRON
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	try {
		// Exécute directement votre script
		await execAsync("node scripts/cron_donwload_cvs.js");
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Erreur lors de l'exécution du cron job:", error);
		return NextResponse.json(
			{ error: "Erreur lors de l'exécution du cron job" },
			{ status: 500 }
		);
	}
}
