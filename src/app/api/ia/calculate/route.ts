import { NextRequest, NextResponse } from "next/server";
import { calcAiImpact } from "@/src/core/ia/AiImpactCalculator";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { provider, model, nbTokens } = body;

    if (!provider || !model || nbTokens === undefined) {
        return NextResponse.json(
            { error: "Champs manquants : provider, model, nbTokens" },
            { status: 400 }
        );
    }

    if (typeof nbTokens !== "number" || nbTokens <= 0) {
        return NextResponse.json(
            { error: "nbTokens doit être un nombre positif" },
            { status: 400 }
        );
    }

    try {
        const result = calcAiImpact({ provider, model, nbTokens });
        return NextResponse.json(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur de calcul";
        return NextResponse.json({ error: message }, { status: 404 });
    }
}
