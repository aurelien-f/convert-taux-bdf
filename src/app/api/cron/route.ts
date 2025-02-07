import { exec } from "child_process";
import { NextResponse } from "next/server";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET() {
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
