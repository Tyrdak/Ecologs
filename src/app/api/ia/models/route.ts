import { NextResponse } from "next/server";
import modelsData from "@/src/data/ia/models.json";

interface RawModel {
    type: string;
    provider: string;
    name: string;
    architecture: { type: string; parameters: number };
    deployment: { tps: number | null };
}

// Noms affichables pour les providers présents dans models.json
const PROVIDER_LABELS: Record<string, string> = {
    cohere:          "Cohere",
    google_genai:    "Google",
    huggingface_hub: "Hugging Face",
    mistralai:       "Mistral AI",
};

export async function GET() {
    const models = (modelsData as { models: RawModel[] }).models
        .filter((m) => m.type === "model" && m.architecture?.parameters > 0)
        .map((m) => ({
            provider: m.provider,
            providerLabel: PROVIDER_LABELS[m.provider] ?? m.provider,
            name: m.name,
            parametersBillion: m.architecture.parameters,
            type: m.architecture.type,
            tps: m.deployment?.tps ?? null,
        }));

    const providers = [...new Set(models.map(m => m.provider))].sort().map(id => ({
        id,
        label: PROVIDER_LABELS[id] ?? id,
    }));

    return NextResponse.json({ providers, models });
}
