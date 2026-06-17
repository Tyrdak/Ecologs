import { NextResponse } from "next/server";
import { AiFootPrint, AiUsageCounts } from "@/src/core/ia/AiFootPrint";
import { AiUsage } from "@/src/core/ia/AiUsage";
import { equivalencesFor } from "@/src/data/carbone/equivalences";

function readCounts(input: unknown): AiUsageCounts {
    const source = (input ?? {}) as Record<string, unknown>;
    const counts: AiUsageCounts = {};

    for (const usage of Object.values(AiUsage)) {
        const value = Number(source[usage] ?? 0);
        if (!Number.isFinite(value) || value < 0) {
            throw new Error(`Nombre de requêtes invalide pour "${usage}"`);
        }
        counts[usage] = value;
    }

    return counts;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const footprint = new AiFootPrint(readCounts(body?.usages));
        const total = footprint.total();

        return NextResponse.json({
            totalKgCo2e: total.kilograms,
            details: footprint.details().map((detail) => ({
                usage: detail.usage,
                requests: detail.requests,
                kgCo2e: detail.co2e.kilograms,
                share: detail.share,
            })),
            equivalences: equivalencesFor(total),
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Requête invalide";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
