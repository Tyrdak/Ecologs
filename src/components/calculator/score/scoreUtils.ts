// Score sur 100 : 100 = objectif Accord de Paris, 0 = 2× moyenne française
const MAX_CARBONE_KG = 19800; // 2× moyenne française → score 0
const REF_OBJECTIF_KG = 2000; // objectif 2°C → score 100

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

// IA : 0.01 kgCO2e par requête → score 0 (très gourmand)
const MAX_IA_KG = 0.01;

export function scoreIa(kgCo2e: number): number {
    if (kgCo2e <= 0) return 100;
    return Math.max(0, Math.min(100, Math.round((1 - kgCo2e / MAX_IA_KG) * 100)));
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
