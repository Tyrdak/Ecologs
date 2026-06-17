// Temps d'exécution en secondes = nombre de tokens / vitesse de génération (tokens/s)
export function estimateExecutionTime(nbTokens: number, tps: number): number {
    if (tps <= 0) throw new Error(`TPS invalide : ${tps}`);
    return nbTokens / tps;
}
