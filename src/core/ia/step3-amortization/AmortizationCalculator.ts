import { ServerSpec } from "@/src/core/ia/types";

// Proratise l'impact de fabrication du serveur sur la durée d'une requête
// ΔL = durée de vie totale effective du serveur en secondes
// Ie_request = (ΔT / ΔL) × IE_server
export function amortizeImpact(
    executionTimeSec: number,
    server: ServerSpec,
    serverImpactKgCo2: number
): number {
    const deltaL = server.hoursLifetime * 3600 * server.useTimeRatio;
    return (executionTimeSec / deltaL) * serverImpactKgCo2;
}
