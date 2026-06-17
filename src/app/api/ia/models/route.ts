import { NextResponse } from "next/server";
import modelsData from "@/src/data/ia/models.json";

type RawParams = number | { min?: number; max?: number; total?: number } | null;

interface RawModel {
    type: string;
    provider: string;
    name: string;
    architecture: { type: string; parameters: RawParams };
    deployment: { tps: number | null };
}

const PROVIDER_LABELS: Record<string, string> = {
    anthropic:       "Anthropic",
    cohere:          "Cohere",
    google_genai:    "Google",
    huggingface_hub: "Hugging Face",
    mistralai:       "Mistral AI",
    openai:          "OpenAI",
};

function parseParams(p: RawParams): number {
    if (!p) return 0;
    if (typeof p === "number") return p;
    // { total, active: {min, max} } — format Anthropic/MoE
    if ("total" in p && p.total) return p.total;
    // { min, max } — format simple
    return p.max ?? p.min ?? 0;
}

export async function GET() {
    const models = (modelsData as { models: RawModel[] }).models
        .filter((m) => m.type === "model" && parseParams(m.architecture?.parameters) > 0)
        .map((m) => ({
            provider: m.provider,
            providerLabel: PROVIDER_LABELS[m.provider] ?? m.provider,
            name: m.name,
            parametersBillion: parseParams(m.architecture.parameters),
            type: m.architecture.type,
            tps: m.deployment?.tps ?? null,
        }));

    const providers = [...new Set(models.map(m => m.provider))].sort().map(id => ({
        id,
        label: PROVIDER_LABELS[id] ?? id,
    }));

    return NextResponse.json({ providers, models });
}
