import modelsData from "@/src/data/ia/models.json";
import { ModelSpec } from "@/src/core/ia/types";

interface RawModel {
    type: string;
    provider: string;
    name: string;
    architecture: { type: string; parameters: number };
    deployment: { tps: number | null };
}

const DEFAULT_TPS = 20;

export function resolveModel(provider: string, modelName: string): ModelSpec | null {
    const models = (modelsData as { models: RawModel[] }).models;

    const match = models.find(
        (m) => m.type === "model" && m.provider === provider && m.name === modelName
    );

    if (!match) return null;

    return {
        provider: match.provider,
        name: match.name,
        parametersBillion: match.architecture.parameters,
        type: match.architecture.type === "moe" ? "moe" : "dense",
        tps: match.deployment.tps ?? DEFAULT_TPS,
    };
}
