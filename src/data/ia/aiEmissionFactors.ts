import { EmissionFactor } from "@/src/core/shared/EmissionFactor";
import { AiUsage, AI_USAGE_LABELS } from "@/src/core/ia/AiUsage";
import { Source } from "@/src/core/shared/Source";

const ecologits: Source = {
    label: "Empreinte carbone de l'IA générative",
    organisation: "EcoLogits / ADEME",
    year: 2024,
    url: "https://ecologits.ai",
};

function factor(usage: AiUsage, valuePerRequest: number): EmissionFactor {
    return new EmissionFactor(
        `ia.${usage}`,
        AI_USAGE_LABELS[usage],
        valuePerRequest,
        "kgCO2e/requête",
        ecologits,
        0.5,
    );
}

export const AI_EMISSION_FACTORS: Record<AiUsage, EmissionFactor> = {
    [AiUsage.TexteSimple]: factor(AiUsage.TexteSimple, 0.002),
    [AiUsage.TexteAvance]: factor(AiUsage.TexteAvance, 0.008),
    [AiUsage.Image]: factor(AiUsage.Image, 0.022),
    [AiUsage.Agent]: factor(AiUsage.Agent, 0.035),
    [AiUsage.Video]: factor(AiUsage.Video, 0.45),
};
