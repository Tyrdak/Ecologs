// Score sur 100 : 100 = objectif Accord de Paris, 0 = 2× moyenne française
const MAX_CARBONE_KG = 19800; // 2× moyenne française → score 0

export function scoreCarbone(kgCo2e: number): number {
    return Math.max(0, Math.min(100, Math.round((1 - kgCo2e / MAX_CARBONE_KG) * 100)));
}

// Seuils par catégorie (kg/an pour score 0)
const MAX_TRANSPORT = 7000;
const MAX_ALIMENTATION = 4000;
const MAX_LOGEMENT = 5000;

export function scoreTransport(kgCo2e: number): number {
    return Math.max(0, Math.min(100, Math.round((1 - kgCo2e / MAX_TRANSPORT) * 100)));
}

export function scoreAlimentation(kgCo2e: number): number {
    return Math.max(0, Math.min(100, Math.round((1 - kgCo2e / MAX_ALIMENTATION) * 100)));
}

export function scoreLogement(kgCo2e: number): number {
    return Math.max(0, Math.min(100, Math.round((1 - kgCo2e / MAX_LOGEMENT) * 100)));
}

// IA annuel : log de 0.1 kg/an (score 100) à 500 kg/an (score 0)
export function scoreIa(kgCo2e: number): number {
    if (kgCo2e <= 0) return 100;
    const MIN_LOG = Math.log10(0.1);
    const MAX_LOG = Math.log10(500);
    const val = Math.log10(kgCo2e);
    return Math.max(0, Math.min(100, Math.round((1 - (val - MIN_LOG) / (MAX_LOG - MIN_LOG)) * 100)));
}

// Formate un impact IA en unité lisible
export function formatIaKg(kgCo2e: number): string {
    if (kgCo2e >= 1) return `${kgCo2e.toFixed(2)} kg`;
    if (kgCo2e >= 0.001) return `${(kgCo2e * 1000).toFixed(1)} g`;
    return `${(kgCo2e * 1_000_000).toFixed(0)} µg`;
}

export function scoreGlobal(carboneKg: number, iaKg: number): number {
    const sc = scoreCarbone(carboneKg);
    const si = scoreIa(iaKg);
    return iaKg > 0 ? Math.round(sc * 0.85 + si * 0.15) : sc;
}

export function scoreColor(score: number): string {
    if (score >= 70) return "var(--green-mid)";
    if (score >= 40) return "var(--gold)";
    return "#c0392b";
}
