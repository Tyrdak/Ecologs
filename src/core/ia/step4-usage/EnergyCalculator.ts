import { GpuSpec, ServerSpec } from "@/src/core/ia/types";

// Puissance consommée par le reste du serveur (CPU, réseau, refroidissement…)
const OVERHEAD_SERVEUR_W = 500;

// Consommation électrique en kWh pour la durée d'exécution donnée
// E = (puissance en W / 1000) × (durée en secondes / 3600)
export function calcEnergyKwh(
    executionTimeSec: number,
    server: ServerSpec,
    gpu: GpuSpec
): number {
    const puissanceTotaleW = server.gpuUnits * gpu.tdpW + OVERHEAD_SERVEUR_W;
    return (puissanceTotaleW / 1000) * (executionTimeSec / 3600);
}
