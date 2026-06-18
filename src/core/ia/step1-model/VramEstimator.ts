// VRAM nécessaire en GB pour un modèle en précision FP16 (2 octets par paramètre)
export function estimateVram(parametersBillion: number): number {
    return parametersBillion * 2;
}
