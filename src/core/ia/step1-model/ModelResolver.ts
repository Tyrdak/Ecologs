import modelsData from "@/src/data/ia/models.json";
import { ModelSpec } from "@/src/core/ia/types";

type RawParams = number | { min?: number; max?: number; total?: number } | null;

interface RawModel {
    type: string;
    provider: string;
    name: string;
    architecture: { type: string; parameters: RawParams };
    deployment: { tps: number | null };
}

const DEFAULT_TPS = 20;

function parseParams(p: RawParams): number {
    if (!p) return 0;
    if (typeof p === "number") return p;
    if ("total" in p && p.total) return p.total;
    return p.max ?? p.min ?? 0;
}

export function resolveModel(provider: string, modelName: string): ModelSpec | null {
    const models = (modelsData as { models: RawModel[] }).models;

    const match = models.find(
        (m) => m.type === "model" && m.provider === provider && m.name === modelName
    );

    if (!match) return null;

    return {
        provider: match.provider,
        name: match.name,
        parametersBillion: parseParams(match.architecture.parameters),
        type: match.architecture.type === "moe" ? "moe" : "dense",
        tps: match.deployment.tps ?? DEFAULT_TPS,
    };
}
