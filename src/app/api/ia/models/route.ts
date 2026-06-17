import { NextResponse } from "next/server";
import modelsData from "@/src/data/ia/models.json";
import providersData from "@/src/data/ia/providers.json";

interface RawModel {
    type: string;
    provider: string;
    name: string;
    architecture: { type: string; parameters: number };
    deployment: { tps: number | null };
}

export async function GET() {
    const models = (modelsData as { models: RawModel[] }).models
        .filter((m) => m.type === "model" && m.architecture?.parameters > 0)
        .map((m) => ({
            provider: m.provider,
            name: m.name,
            parametersBillion: m.architecture.parameters,
            type: m.architecture.type,
            tps: m.deployment?.tps ?? null,
        }));

    const providers = Object.keys(providersData);

    return NextResponse.json({ providers, models });
}
