import { resolveModel } from "./step1-model/ModelResolver";
import { estimateVram } from "./step1-model/VramEstimator";
import { findServer } from "./step1-model/ServerMatcher";
import { findGpu } from "./step2-manufacturing/GpuIeCalculator";
import { calcServerImpact } from "./step2-manufacturing/ServerIeCalculator";
import { amortizeImpact } from "./step3-amortization/AmortizationCalculator";
import { estimateExecutionTime } from "./step4-usage/ExecutionTimeEstimator";
import { calcEnergyKwh } from "./step4-usage/EnergyCalculator";
import { getProviderConfig, getCarbonIntensity, calcUsageImpact } from "./step4-usage/UsageImpactCalculator";
import { AiRequestInput, AiImpactResult } from "./types";

export function calcAiImpact(input: AiRequestInput): AiImpactResult {
    // Étape 1 : résolution du modèle -> VRAM -> serveur 
    const model = resolveModel(input.provider, input.model);
    if (!model) throw new Error(`Modèle inconnu : ${input.provider}/${input.model}`);

    const vramNeeded = estimateVram(model.parametersBillion);
    const server = findServer(vramNeeded);
    if (!server) throw new Error(`Aucun serveur GPU pour ${vramNeeded} GB VRAM`);

    const gpu = findGpu(server.gpuVram);
    if (!gpu) throw new Error(`Aucun GPU trouvé pour ${server.gpuVram} GB VRAM`);

    // Étape 2 : impact de fabrication du serveur
    const serverImpact = calcServerImpact(server, gpu);

    // Étape 3 : amortissement sur la durée de la requête
    const executionTimeSec = estimateExecutionTime(input.nbTokens, model.tps);
    const ieRequest = amortizeImpact(executionTimeSec, server, serverImpact);

    // Étape 4 : impact d'usage (électricité)
    const providerConfig = getProviderConfig(input.provider);
    const carbonIntensity = getCarbonIntensity(providerConfig.country);
    const energyKwh = calcEnergyKwh(executionTimeSec, server, gpu);
    const iuRequest = calcUsageImpact(energyKwh, providerConfig.pue, carbonIntensity);

    return {
        ieRequest,
        iuRequest,
        totalKgCo2e: ieRequest + iuRequest,
        detail: {
            executionTimeSec,
            energyKwh,
            serverCountry: providerConfig.country,
            carbonIntensityGco2kwh: carbonIntensity,
            pue: providerConfig.pue,
            serverId: server.id,
            gpuName: gpu.name,
            tps: model.tps,
            nbTokens: input.nbTokens,
        },
    };
}
