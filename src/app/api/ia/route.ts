import { NextResponse } from "next/server";
import { AiUsage, AI_USAGE_LABELS } from "@/src/core/ia/AiUsage";
import { AI_EMISSION_FACTORS } from "@/src/data/ia/aiEmissionFactors";

export async function GET() {
    const usages = Object.values(AiUsage).map((usage) => {
        const factor = AI_EMISSION_FACTORS[usage];
        return {
            usage,
            label: AI_USAGE_LABELS[usage],
            kgCo2ePerRequest: factor.valuePerUnit,
            unit: factor.unit,
            source: factor.source,
        };
    });

    return NextResponse.json({ usages });
}
