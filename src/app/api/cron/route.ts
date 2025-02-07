import { exec } from "child_process";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
	const headersList = await headers();
	const authHeader = headersList.get("Authorization");

	// Vérification du secret CRON
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new NextResponse("Non autorisé", { status: 401 });
	}

	try {
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
